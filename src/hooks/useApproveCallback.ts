import { MaxUint256 } from "@ethersproject/constants";
import { TransactionResponse } from "@ethersproject/providers";
import { Currency, CurrencyAmount, Percent, ROUTER_ADDRESS, Trade as V2Trade, TradeType } from "@bionswap/core-sdk";
import { useAccount, useChain, useNetwork, useTokenAllowance, useTokenContract } from "hooks";
import { useCallback, useMemo } from "react";
import { useHasPendingApproval, useTransactionAdder } from "state/transactions/hooks";
import { calculateGasMargin } from "utils/trade";

export enum ApprovalState {
  UNKNOWN = "UNKNOWN",
  NOT_APPROVED = "NOT_APPROVED",
  PENDING = "PENDING",
  APPROVED = "APPROVED",
}

// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
export function useApproveCallback(
  amountToApprove?: CurrencyAmount<Currency>,
  spender?: string
): [ApprovalState, () => Promise<void>] {
  const { address: account } = useAccount();
  const token = amountToApprove?.currency?.isToken ? amountToApprove.currency : undefined;
  const currentAllowance = useTokenAllowance(token, account ?? undefined, spender);
  const pendingApproval = useHasPendingApproval(token?.address, spender);

  // check the current approval status
  const approvalState: ApprovalState = useMemo(() => {
    if (!amountToApprove || !spender) return ApprovalState.UNKNOWN;
    if (amountToApprove.currency.isNative) return ApprovalState.APPROVED;
    // we might not have enough data to know whether or not we need to approve
    if (!currentAllowance) return ApprovalState.UNKNOWN;

    // amountToApprove will be defined if currentAllowance is
    return currentAllowance.lessThan(amountToApprove)
      ? pendingApproval
        ? ApprovalState.PENDING
        : ApprovalState.NOT_APPROVED
      : ApprovalState.APPROVED;
  }, [amountToApprove, currentAllowance, pendingApproval, spender]);

  const tokenContract = useTokenContract(token?.address);
  const addTransaction = useTransactionAdder();

  const approve = useCallback(async (): Promise<void> => {
    if (approvalState !== ApprovalState.NOT_APPROVED) {
      return;
    }
    if (!token) {
      return;
    }

    if (!tokenContract) {
      return;
    }

    if (!amountToApprove) {
      return;
    }

    if (!spender) {
      return;
    }

    let useExact = false;
    const estimatedGas = await tokenContract.estimateGas.approve(spender, MaxUint256).catch(() => {
      // general fallback for tokens who restrict approval amounts
      useExact = true;
      return tokenContract.estimateGas.approve(spender, amountToApprove.quotient.toString());
    });

    return tokenContract
      .approve(spender, useExact ? amountToApprove.quotient.toString() : MaxUint256, {
        gasLimit: calculateGasMargin(estimatedGas),
      })
      .then((response: TransactionResponse) => {
        addTransaction(response, {
          summary: "Approve " + amountToApprove.currency.symbol,
          approval: { tokenAddress: token.address, spender: spender },
        });
      })
      .catch((error: Error) => {
        throw error;
      });
  }, [approvalState, token, tokenContract, amountToApprove, spender, addTransaction]);

  return [approvalState, approve];
}

// wraps useApproveCallback in the context of a swap
export function useApproveCallbackFromTrade(
  trade: V2Trade<Currency, Currency, TradeType> | undefined,
  allowedSlippage: Percent
) {
  const { chainId } = useChain();
  const amountToApprove = useMemo(
    () => (trade && trade.inputAmount.currency.isToken ? trade.maximumAmountIn(allowedSlippage) : undefined),
    [trade, allowedSlippage]
  );
  return useApproveCallback(
    amountToApprove,
    chainId ? (trade instanceof V2Trade ? ROUTER_ADDRESS[chainId] : undefined) : undefined
  );
}
