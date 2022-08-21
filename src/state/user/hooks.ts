import { Percent, Token } from "@bionswap/core-sdk";
import { useChain } from "hooks";
import { useCallback, useMemo } from "react";
import { AppState, useAppDispatch, useAppSelector } from "state";
import {
  addSerializedToken,
  removeSerializedToken,
  SerializedToken,
  updateUserDeadline,
  updateUserExpertMode,
  updateUserSlippageTolerance,
} from "./actions";
import { V2_SWAP_DEFAULT_SLIPPAGE } from "./reducer";

export enum SlippageError {
  TOO_LOW = "TOO_LOW",
  TOO_HIGH = "TOO_HIGH",
  INVALID_INPUT = "INVALID_INPUT",
}

export const GLOBAL_DEFAULT_SLIPPAGE_PERCENT = new Percent(50, 10_000); // .5%

function deserializeToken(serializedToken: SerializedToken): Token {
  return new Token(
    serializedToken.chainId,
    serializedToken.address,
    serializedToken.decimals,
    serializedToken.symbol,
    serializedToken.name
  );
}

export function useIsExpertMode(): boolean {
  return useAppSelector((state) => state.user.userExpertMode);
}

export function useExpertModeManager(): [boolean, () => void] {
  const dispatch = useAppDispatch();
  const expertMode = useIsExpertMode();

  const toggleSetExpertMode = useCallback(() => {
    dispatch(updateUserExpertMode({ userExpertMode: !expertMode }));
  }, [expertMode, dispatch]);

  return [expertMode, toggleSetExpertMode];
}

export function useUserAddedTokens(): Token[] {
  const { chainId } = useChain();
  const serializedTokensMap = useAppSelector(({ user: { tokens } }) => tokens);

  return useMemo(() => {
    if (!chainId) return [];
    // @ts-ignore TYPE NEEDS FIXING
    return Object.values(serializedTokensMap?.[chainId] ?? {}).map(deserializeToken);
  }, [serializedTokensMap, chainId]);
}

const parseSlippageInput = (input: string): number => Math.floor(Number.parseFloat(input) * 100);
const inputToPercent = (input: string) => new Percent(parseSlippageInput(input), 10_000);

export function useUserSlippageTolerance(): [Percent, (slippage: string) => void, SlippageError | false] {
  const dispatch = useAppDispatch();
  const userSlippageToleranceInput = useAppSelector<AppState["user"]["userSlippageToleranceInput"]>((state) => {
    return state.user.userSlippageToleranceInput;
  });
  const isExpertMode = useIsExpertMode();

  const slippageError = useMemo(() => {
    try {
      const parsedInput = parseSlippageInput(userSlippageToleranceInput);
      return !Number.isInteger(parsedInput) || parsedInput < 1 || (!isExpertMode && parsedInput > 5000)
        ? SlippageError.INVALID_INPUT
        : inputToPercent(userSlippageToleranceInput).lessThan(new Percent(5, 10_000))
        ? SlippageError.TOO_LOW
        : inputToPercent(userSlippageToleranceInput).greaterThan(new Percent(1, 100))
        ? SlippageError.TOO_HIGH
        : false;
    } catch (e) {
      return SlippageError.INVALID_INPUT;
    }
  }, [isExpertMode, userSlippageToleranceInput]);

  const userSlippageTolerance = useMemo(() => {
    if (slippageError) return V2_SWAP_DEFAULT_SLIPPAGE;
    return inputToPercent(userSlippageToleranceInput);
  }, [slippageError, userSlippageToleranceInput]);

  const setUserSlippageTolerance = useCallback(
    (slippage: string) => {
      dispatch(updateUserSlippageTolerance({ userSlippageTolerance: slippage }));
    },
    [dispatch]
  );

  return [userSlippageTolerance, setUserSlippageTolerance, slippageError];
}

export function useRemoveUserAddedToken(): (chainId: number, address: string) => void {
  const dispatch = useAppDispatch();
  return useCallback(
    (chainId: number, address: string) => {
      dispatch(removeSerializedToken({ chainId, address }));
    },
    [dispatch]
  );
}

function serializeToken(token: Token): SerializedToken {
  return {
    chainId: token.chainId,
    address: token.address,
    decimals: token.decimals,
    symbol: token.symbol,
    name: token.name,
  };
}

export function useAddUserToken(): (token: Token) => void {
  const dispatch = useAppDispatch();
  return useCallback(
    (token: Token) => {
      dispatch(addSerializedToken({ serializedToken: serializeToken(token) }));
    },
    [dispatch]
  );
}

export function useUserTransactionTTL(): [number, (slippage: number) => void] {
  const dispatch = useAppDispatch();
  const userDeadline = useAppSelector<AppState["user"]["userDeadline"]>((state) => {
    return state.user.userDeadline;
  });

  const setUserDeadline = useCallback(
    (deadline: number) => {
      dispatch(updateUserDeadline({ userDeadline: deadline }));
    },
    [dispatch]
  );

  return [userDeadline, setUserDeadline];
}
