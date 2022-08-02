import {
  Currency,
  CurrencyAmount,
  Percent,
  TradeType,
  Trade as V2Trade,
  SUSHI_ADDRESS,
  ChainId,
  WNATIVE_ADDRESS,
} from "@bionswap/core-sdk";
import {
  useAccount,
  useChain,
  useCurrency,
  useCurrencyBalances,
  useEnsAddress,
  useNetwork,
  useParsedQueryString,
} from "hooks";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { AppState, useAppDispatch, useAppSelector } from "state";
import { tryParseAmount } from "utils/parse";
import {
  Field,
  replaceSwapState,
  selectCurrency,
  switchCurrencies,
  typeInput,
} from "./actions";
import {
  useV2TradeExactIn as useTradeExactIn,
  useV2TradeExactOut as useTradeExactOut,
} from "hooks";
import {
  useExpertModeManager,
  useUserSlippageTolerance,
} from "state/user/hooks";
import { ParsedQs } from "qs";
import { SwapState } from "./reducer";
import { isAddress } from "utils/validate";
import { getCurrencyId } from "utils/currencies";

export function useSwapState(): AppState["swap"] {
  return useAppSelector((state) => state.swap);
}

/**
 * Returns true if any of the pairs or tokens in a trade have the given checksummed address
 * @param trade to check for the given address
 * @param checksummedAddress address to check in the pairs and tokens
 */
function involvesAddress(
  trade: V2Trade<Currency, Currency, TradeType>,
  checksummedAddress: string
): boolean {
  const path = trade.route.path;
  return (
    path.some((token) => token.address === checksummedAddress) ||
    (trade instanceof V2Trade
      ? trade.route.pairs.some(
          (pair) => pair.liquidityToken.address === checksummedAddress
        )
      : false)
  );
}

function parseTokenAmountURLParameter(urlParam: any): string {
  return typeof urlParam === "string" && !isNaN(parseFloat(urlParam))
    ? urlParam
    : "";
}

function parseIndependentFieldURLParameter(urlParam: any): Field {
  return typeof urlParam === "string" && urlParam.toLowerCase() === "output"
    ? Field.OUTPUT
    : Field.INPUT;
}

function parseCurrencyFromURLParameter(urlParam: any): string {
  if (typeof urlParam === "string") {
    const valid = isAddress(urlParam);
    if (valid) return valid;
    if (urlParam.toUpperCase() === "ETH") return "ETH";
  }
  return "";
}

const ENS_NAME_REGEX =
  /^[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)?$/;
const ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;
function validatedRecipient(recipient: any): string | undefined {
  if (typeof recipient !== "string") return undefined;
  const address = isAddress(recipient);
  if (address) return address;
  if (ENS_NAME_REGEX.test(recipient)) return recipient;
  if (ADDRESS_REGEX.test(recipient)) return recipient;
  return undefined;
}

export function useSwapActionHandlers(): {
  onCurrencySelection: (field: Field, currency: Currency) => void;
  onSwitchTokens: () => void;
  onUserInput: (field: Field, typedValue: string) => void;
} {
  const dispatch = useAppDispatch();
  const { chainId } = useChain();

  const router = useRouter();

  const inputCurrencyId = router.query.inputCurrency || "ETH";
  const outputCurrencyId =
    router.query.outputCurrency ||
    (chainId && chainId in SUSHI_ADDRESS ? SUSHI_ADDRESS[chainId] : undefined);

  // adjust query parameters when user manually selects another currency
  const onCurrencySelection = useCallback(
    (field: Field, currency: Currency) => {
      if (field === Field.INPUT) {
        const inputCurrency = currency;
        const newInputCurrencyId = getCurrencyId(inputCurrency);
        if (outputCurrencyId === newInputCurrencyId) {
          // if new chosen currency is the same as the other
          if (outputCurrencyId) {
            router.replace({
              pathname: window.location.pathname,
              query: {
                ...router.query,
                inputCurrency: newInputCurrencyId,
                outputCurrency: inputCurrencyId,
              },
            });
          } else {
            router.replace({
              pathname: window.location.pathname,
              query: { ...router.query, inputCurrency: "ETH" },
            });
          }
        } else {
          if (outputCurrencyId) {
            router.replace({
              pathname: window.location.pathname,
              query: {
                ...router.query,
                inputCurrency: newInputCurrencyId,
                outputCurrency: outputCurrencyId,
              },
            });
          } else {
            router.replace({
              pathname: window.location.pathname,
              query: { ...router.query, inputCurrency: newInputCurrencyId },
            });
          }
        }
      }

      if (field === Field.OUTPUT) {
        const outputCurrency = currency;
        const newOutputCurrencyId = getCurrencyId(outputCurrency);
        if (inputCurrencyId === newOutputCurrencyId) {
          if (outputCurrencyId) {
            router.replace({
              pathname: window.location.pathname,
              query: {
                ...router.query,
                inputCurrency: outputCurrencyId,
                outputCurrency: newOutputCurrencyId,
              },
            });
          } else {
            router.replace({
              pathname: window.location.pathname,
              query: {
                ...router.query,
                inputCurrency: "ETH",
                outputCurrency: newOutputCurrencyId,
              },
            });
          }
        } else {
          if (inputCurrencyId) {
            router.replace({
              pathname: window.location.pathname,
              query: {
                ...router.query,
                inputCurrency: inputCurrencyId,
                outputCurrency: newOutputCurrencyId,
              },
            });
          } else {
            router.replace({
              pathname: window.location.pathname,
              query: {
                ...router.query,
                inputCurrency: "ETH",
                outputCurrency: newOutputCurrencyId,
              },
            });
          }
        }
      }

      dispatch(
        selectCurrency({
          field,
          currencyId: currency.isToken
            ? currency.address
            : currency.isNative && currency.chainId !== ChainId.CELO
            ? "ETH"
            : "",
        })
      );
    },
    [dispatch, inputCurrencyId, outputCurrencyId, router]
  );

  const onSwitchTokens = useCallback(() => {
    router.replace({
      pathname: window.location.pathname,
      query: {
        ...router.query,
        inputCurrency: outputCurrencyId,
        outputCurrency: inputCurrencyId,
      },
    });
    dispatch(switchCurrencies());
  }, [dispatch, inputCurrencyId, outputCurrencyId, router]);

  const onUserInput = useCallback(
    (field: Field, typedValue: string) => {
      dispatch(typeInput({ field, typedValue }));
    },
    [dispatch]
  );

  return {
    onSwitchTokens,
    onCurrencySelection,
    onUserInput,
  };
}

const BAD_RECIPIENT_ADDRESSES: {
  [chainId: string]: { [address: string]: true };
} = {
  [ChainId.ETHEREUM]: {
    "0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac": true, // v2 factory
    "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F": true, // v2 router 02
  },
};

// from the current swap inputs, compute the best trade and return it.
export function useDerivedSwapInfo(): {
  to?: string;
  currencies: { [field in Field]?: Currency };
  currencyBalances: { [field in Field]?: CurrencyAmount<Currency> };
  parsedAmount: CurrencyAmount<Currency> | undefined;
  inputError?: string;
  v2Trade: V2Trade<Currency, Currency, TradeType> | undefined;
  allowedSlippage: Percent;
} {
  const { chainId, account } = useChain();

  // const [singleHopOnly] = useUserSingleHopOnly();

  const {
    independentField,
    typedValue,
    [Field.INPUT]: { currencyId: inputCurrencyId },
    [Field.OUTPUT]: { currencyId: outputCurrencyId },
    recipient,
  } = useSwapState();
  const inputCurrency = useCurrency(inputCurrencyId);
  const outputCurrency = useCurrency(outputCurrencyId);
  // const recipientLookup = useENS(recipient ?? undefined);
  const { data: recipientLookup } = useEnsAddress({
    name: recipient ?? undefined,
  });

  const to = (recipient === undefined ? account : recipientLookup) ?? undefined;

  const relevantTokenBalances = useCurrencyBalances(account ?? undefined, [
    inputCurrency ?? undefined,
    outputCurrency ?? undefined,
  ]);

  const isExactIn: boolean = independentField === Field.INPUT;

  const parsedAmount = tryParseAmount(
    typedValue,
    (isExactIn ? inputCurrency : outputCurrency) ?? undefined
  );

  const bestTradeExactIn = useTradeExactIn(
    isExactIn ? parsedAmount : undefined,
    outputCurrency ?? undefined,
    {
      // maxHops: singleHopOnly ? 1 : undefined,
      maxHops: undefined,
    }
  );

  const bestTradeExactOut = useTradeExactOut(
    inputCurrency ?? undefined,
    !isExactIn ? parsedAmount : undefined,
    {
      // maxHops: singleHopOnly ? 1 : undefined,
      maxHops: undefined,
    }
  );

  const v2Trade = isExactIn ? bestTradeExactIn : bestTradeExactOut;

  const currencyBalances = {
    [Field.INPUT]: relevantTokenBalances[0],
    [Field.OUTPUT]: relevantTokenBalances[1],
  };

  const currencies: { [field in Field]?: Currency } = {
    [Field.INPUT]: inputCurrency ?? undefined,
    [Field.OUTPUT]: outputCurrency ?? undefined,
  };

  let inputError: string | undefined;

  if (!account) {
    inputError = "Connect Wallet";
  }

  if (!parsedAmount) {
    // inputError = inputError ?? i18n._(t`Enter an amount`);
    inputError = inputError ?? `Enter an amount`;
  }

  if (!currencies[Field.INPUT] || !currencies[Field.OUTPUT]) {
    // inputError = inputError ?? i18n._(t`Select a token`);
    inputError = inputError ?? `Select a token`;
  }

  const formattedTo = isAddress(to);
  if (!to || !formattedTo) {
    // inputError = inputError ?? i18n._(t`Enter a recipient`);
    inputError = inputError ?? `Enter a recipient`;
  } else {
    if (
      BAD_RECIPIENT_ADDRESSES?.[chainId]?.[formattedTo] ||
      (bestTradeExactIn && involvesAddress(bestTradeExactIn, formattedTo)) ||
      (bestTradeExactOut && involvesAddress(bestTradeExactOut, formattedTo))
    ) {
      // inputError = inputError ?? i18n._(t`Invalid recipient`);
      inputError = inputError ?? `Invalid recipient`;
    }
  }

  const allowedSlippage = useUserSlippageTolerance();

  // compare input balance to max input based on version
  const [balanceIn, amountIn] = [
    currencyBalances[Field.INPUT],
    v2Trade?.maximumAmountIn(allowedSlippage),
  ];

  if (balanceIn && amountIn && balanceIn.lessThan(amountIn)) {
    // inputError = i18n._(t`Insufficient Balance`);
    inputError = `Insufficient Balance`;
  }

  return {
    to,
    currencies,
    currencyBalances,
    parsedAmount,
    inputError,
    v2Trade: v2Trade ?? undefined,
    allowedSlippage,
  };
}

export function queryParametersToSwapState(
  parsedQs: ParsedQs,
  chainId: ChainId = ChainId.ETHEREUM
): SwapState {
  let inputCurrency = parseCurrencyFromURLParameter(parsedQs.inputCurrency);
  let outputCurrency = parseCurrencyFromURLParameter(parsedQs.outputCurrency);
  const eth = chainId === ChainId.CELO ? WNATIVE_ADDRESS[chainId] : "ETH";
  const sushi = SUSHI_ADDRESS[chainId];
  if (inputCurrency === "" && outputCurrency === "") {
    inputCurrency = eth;
    outputCurrency = sushi;
  } else if (inputCurrency === "") {
    inputCurrency = outputCurrency === eth ? sushi : eth;
  } else if (outputCurrency === "" || inputCurrency === outputCurrency) {
    outputCurrency = inputCurrency === eth ? sushi : eth;
  }

  const recipient = validatedRecipient(parsedQs.recipient);

  return {
    [Field.INPUT]: {
      currencyId: inputCurrency,
    },
    [Field.OUTPUT]: {
      currencyId: outputCurrency,
    },
    typedValue: parseTokenAmountURLParameter(parsedQs.exactAmount),
    independentField: parseIndependentFieldURLParameter(parsedQs.exactField),
    recipient,
  };
}

export function useDefaultsFromURLSearch():
  | {
      inputCurrencyId: string | undefined;
      outputCurrencyId: string | undefined;
    }
  | undefined {
  const { chainId } = useChain();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const parsedQs = useParsedQueryString();
  const [expertMode] = useExpertModeManager();
  const [result, setResult] = useState<
    | {
        inputCurrencyId: string | undefined;
        outputCurrencyId: string | undefined;
      }
    | undefined
  >();

  useEffect(() => {
    if (!chainId) return;
    const parsed = queryParametersToSwapState(parsedQs, chainId);

    dispatch(
      replaceSwapState({
        typedValue: parsed.typedValue,
        field: parsed.independentField,
        inputCurrencyId: parsed[Field.INPUT].currencyId,
        outputCurrencyId: parsed[Field.OUTPUT].currencyId,
        recipient: expertMode ? parsed.recipient : undefined,
      })
    );

    setResult({
      inputCurrencyId: parsed[Field.INPUT].currencyId,
      outputCurrencyId: parsed[Field.OUTPUT].currencyId,
    });

    router.replace(
      `?inputCurrency=${parsed[Field.INPUT].currencyId}&outputCurrency=${
        parsed[Field.OUTPUT].currencyId
      }`,
      undefined,
      {
        shallow: true,
      }
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, chainId]);

  return result;
}
