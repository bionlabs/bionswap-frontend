import { TransactionRequest } from '@ethersproject/abstract-provider';
import { Currency, Percent, Router, SwapParameters, Trade, TradeType } from '@bionswap/core-sdk';
import { USER_REJECTED_TX } from 'constants/transactions';
import { BigNumber, Contract } from 'ethers';
import {
  useAccount,
  useChain,
  useEnsAddress,
  useNetwork,
  useProvider,
  useRouterContract,
  useSigner,
  useTransactionDeadline,
} from 'hooks';
import { useMemo } from 'react';
import { shortenAddress } from 'utils/format';
import { calculateGasMargin } from 'utils/trade';
import { isAddress, isZero } from 'utils/validate';
import { swapLog } from 'api/log';

export enum SwapCallbackState {
  INVALID,
  LOADING,
  VALID,
}

export interface TransactionResponseLight {
  hash: string;
}

interface SwapCall {
  contract: Contract;
  parameters: SwapParameters;
}

interface SwapCallEstimate {
  call: SwapCall;
}

export interface SuccessfulCall extends SwapCallEstimate {
  call: SwapCall;
  gasEstimate: BigNumber;
}

interface FailedCall extends SwapCallEstimate {
  call: SwapCall;
  error: Error;
}

export type EstimatedSwapCall = SuccessfulCall | FailedCall;

/**
 * Returns the swap calls that can be used to make the trade
 * @param trade trade to execute
 * @param allowedSlippage user allowed slippage
 * @param recipientAddressOrName the ENS name or address of the recipient of the swap output
 */
export function useSwapCallArguments(
  trade: Trade<Currency, Currency, TradeType> | undefined, // trade to execute, required
  allowedSlippage: Percent, // in bips
  recipientAddressOrName: string | undefined, // the ENS name or address of the recipient of the trade, or null if swap should be returned to sender
) {
  const { chainId, account, provider } = useChain();

  const { data: recipientAddress } = useEnsAddress({
    name: recipientAddressOrName,
  });
  const recipient = recipientAddressOrName === null ? account : recipientAddress;
  const deadline = useTransactionDeadline();

  const routerContract = useRouterContract();

  return useMemo<SwapCall[]>(() => {
    let result: SwapCall[] = [];
    if (
      // @ts-ignore TYPE NEEDS FIXING
      !trade ||
      !recipient ||
      !provider ||
      !account ||
      !chainId
    )
      return result;

    if (!routerContract || !deadline) return result;

    const swapMethods: SwapParameters[] = [];
    swapMethods.push(
      Router.swapCallParameters(trade, {
        feeOnTransfer: false,
        allowedSlippage,
        recipient,
        deadline: deadline.toNumber(),
      }),
    );

    if (trade.tradeType === TradeType.EXACT_INPUT) {
      swapMethods.push(
        Router.swapCallParameters(trade, {
          feeOnTransfer: true,
          allowedSlippage,
          recipient,
          deadline: deadline.toNumber(),
        }),
      );
    }

    return swapMethods.map((parameters) => ({
      parameters,
      contract: routerContract,
    }));
  }, [chainId, trade, recipient, provider, account, routerContract, deadline, allowedSlippage]);
}

/**
 * This is hacking out the revert reason from the ethers provider thrown error however it can.
 * This object seems to be undocumented by ethers.
 * @param error an error from the ethers provider
 */
export function swapErrorToUserReadableMessage(error: any): string {
  let reason: string | undefined;

  while (Boolean(error)) {
    reason = error.reason ?? error.message ?? reason;
    error = error.error ?? error.data?.originalError;
  }

  if (reason?.indexOf('execution reverted: ') === 0) reason = reason.substr('execution reverted: '.length);

  switch (reason) {
    case 'UniswapV2Router: EXPIRED':
      return `The transaction could not be sent because the deadline has passed. Please check that your transaction deadline is not too low.`;
    case 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT':
    case 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT':
      return `This transaction will not succeed either due to price movement or fee on transfer. Try increasing your slippage tolerance.`;
    case 'TransferHelper: TRANSFER_FROM_FAILED':
      return `The input token cannot be transferred. There may be an issue with the input token.`;
    case 'UniswapV2: TRANSFER_FAILED':
      return `The output token cannot be transferred. There may be an issue with the output token.`;
    case 'UniswapV2: K':
      return `The Uniswap invariant x*y=k was not satisfied by the swap. This usually means one of the tokens you are swapping incorporates custom behavior on transfer.`;
    case 'Too little received':
    case 'Too much requested':
    case 'STF':
      return `This transaction will not succeed due to price movement. Try increasing your slippage tolerance.`;
    case 'TF':
      return `The output token cannot be transferred. There may be an issue with the output token.`;
    case 'SushiGuard: FAILED_GAS_PRICE_ESTIMATION':
      return `Your wallet provider has failed to obtain an accurate gas price estimation. Try again as it may be a transient error, or disable the SushiGuard feature.`;
    case 'SushiGuard: FAILED_EIP1559_FEE_GAS_ESTIMATION':
      return `Your wallet provider has failed to obtain an accurate gas fee estimation. Try again as it may be a transient error, or disable the SushiGuard feature.`;
    case 'SushiGuard: FAILED_NONCE_RETRIEVAL':
      return `Your wallet provider has failed to obtain a valid nonce from your wallet. Try again as it may be a transient error, or disable the SushiGuard feature.`;
    case 'SushiGuard: UNSUPPORTED_PROVIDER_REQUEST':
      return `Swap failed: Your wallet provider doesn't support the custom signature features necessary to sign your TX. Disable the SushiGuard feature or try with another wallet provider.`;
    case 'SushiGuard: RELAY_URL_NOT_AVAILABLE':
      return `SushiGuard is not available for the selected network. Disable the SushiGuard feature or switch to a supported network.`;
    default:
      if (reason?.indexOf('undefined is not an object') !== -1) {
        console.error(error, reason);
        return `An error occurred when trying to execute this swap. You may need to increase your slippage tolerance. If that does not work, there may be an incompatibility with the token you are trading. Note fee on transfer and rebase tokens are incompatible with Uniswap V3.`;
      }
      return `Unknown error${reason ? `: "${reason}"` : ''}. Try increasing your slippage tolerance.`;
  }
}

// returns a function that will execute a swap, if the parameters are all valid
// and the user has approved the slippage adjusted input amount for the trade
export function useSwapCallback(
  trade: Trade<Currency, Currency, TradeType> | undefined, // trade to execute, required
  allowedSlippage: Percent, // in bips
  recipientAddressOrName: string | undefined, // the ENS name or address of the recipient of the trade, or null if swap should be returned to sender
): {
  state: SwapCallbackState;
  callback: null | (() => Promise<string>);
  error: string | null;
} {
  const { chainId, account, provider, signer } = useChain();

  const { data: recipientAddress } = useEnsAddress({
    name: recipientAddressOrName,
  });

  const recipient = recipientAddressOrName ? recipientAddress ?? undefined : account ?? undefined;

  const swapCalls = useSwapCallArguments(trade, allowedSlippage, recipient);

  // const addTransaction = useTransactionAdder();

  return useMemo(() => {
    if (!trade || !provider || !account || !chainId || !signer) {
      return {
        state: SwapCallbackState.INVALID,
        callback: null,
        error: 'Missing dependencies',
      };
    }
    if (!recipient) {
      if (recipientAddressOrName !== null) {
        return {
          state: SwapCallbackState.INVALID,
          callback: null,
          error: 'Invalid recipient',
        };
      } else {
        return {
          state: SwapCallbackState.LOADING,
          callback: null,
          error: null,
        };
      }
    }

    return {
      state: SwapCallbackState.VALID,
      callback: async function onSwap(): Promise<string> {
        console.log('onSwap callback');
        const estimatedCalls: SwapCallEstimate[] = await Promise.all(
          swapCalls.map((call) => {
            const {
              parameters: { methodName, args, value },
              contract,
            } = call;
            const options = !value || isZero(value) ? {} : { value };

            return contract.estimateGas[methodName](...args, options)
              .then((gasEstimate) => {
                return {
                  call,
                  gasEstimate,
                };
              })
              .catch((gasError) => {
                console.error('Gas estimate failed, trying eth_call to extract error', call);

                return contract.callStatic[methodName](...args, options)
                  .then((result) => {
                    console.error('Unexpected successful call after failed estimate gas', call, gasError, result);
                    return {
                      call,
                      error: 'Unexpected issue with estimating the gas. Please try again.',
                    };
                  })
                  .catch((callError) => {
                    console.error('Call threw error', call, callError);

                    return {
                      call,
                      error: swapErrorToUserReadableMessage(callError),
                    };
                  });
              });
          }),
        );

        // a successful estimation is a bignumber gas estimate and the next call is also a bignumber gas estimate
        let bestCallOption: SuccessfulCall | SwapCallEstimate | undefined = estimatedCalls.find(
          (el, ix, list): el is SuccessfulCall =>
            'gasEstimate' in el && (ix === list.length - 1 || 'gasEstimate' in list[ix + 1]),
        );

        // check if any calls errored with a recognizable error
        if (!bestCallOption) {
          const errorCalls = estimatedCalls.filter((call): call is FailedCall => 'error' in call);
          if (errorCalls.length > 0) throw errorCalls[errorCalls.length - 1].error;
          const firstNoErrorCall = estimatedCalls.find<SwapCallEstimate>(
            (call): call is SwapCallEstimate => !('error' in call),
          );
          if (!firstNoErrorCall) throw new Error('Unexpected error. Could not estimate gas for the swap.');
          bestCallOption = firstNoErrorCall;
        }

        const {
          call: {
            contract,
            parameters: { methodName, args, value },
          },
        } = bestCallOption;

        console.log(
          'gasEstimate' in bestCallOption ? { gasLimit: calculateGasMargin(bestCallOption.gasEstimate) } : {},
        );

        return contract[methodName](...args, {
          ...(value && !isZero(value) ? { value, from: account } : { from: account }),
          ...('gasEstimate' in bestCallOption ? { gasLimit: calculateGasMargin(bestCallOption.gasEstimate) } : {}),
          // gasPrice: !eip1559 && chainId === ChainId.HARMONY ? BigNumber.from('2000000000') : undefined,
        })
          .then((response: any) => {
            const inputSymbol = trade.inputAmount.currency.symbol;
            const outputSymbol = trade.outputAmount.currency.symbol;
            const inputAmount = trade.inputAmount.toSignificant(3);
            const outputAmount = trade.outputAmount.toSignificant(3);

            // const base = `Swap ${inputAmount} ${inputSymbol} for ${outputAmount} ${outputSymbol}`;
            // const withRecipient =
            //   recipient === account
            //     ? base
            //     : `${base} to ${
            //         recipientAddress && isAddress(recipientAddress)
            //           ? shortenAddress(recipientAddress)
            //           : recipientAddress
            //       }`;

            // addTransaction(response, {
            //   summary: withRecipient,
            //   type: "swap",
            // });

            swapLog({
              chainId,
              account,
              txHash: response.hash,
              inputSymbol,
              outputSymbol,
              inputAmount,
              outputAmount,
            });

            return response.hash;
          })
          .catch((error: any) => {
            // if the user rejected the tx, pass this along
            if (error?.code === USER_REJECTED_TX) {
              throw new Error('Transaction rejected.');
            } else {
              // otherwise, the error was unexpected and we need to convey that
              console.error(`Swap failed`, error, methodName, args, value);
              throw new Error(`Swap failed: ${swapErrorToUserReadableMessage(error)}`);
            }
          });
      },
      error: null,
    };
  }, [trade, provider, account, chainId, signer, recipient, recipientAddressOrName, swapCalls]);
}
