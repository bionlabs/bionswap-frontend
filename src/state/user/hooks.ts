import { Percent, Token } from "@bionswap/core-sdk";
import { useChain } from "hooks";
import { useCallback, useMemo } from "react";
import { AppState, useAppDispatch, useAppSelector } from "state";
import { addSerializedToken, removeSerializedToken, SerializedToken, updateUserExpertMode } from "./actions";

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
export function useUserSlippageTolerance() {
  return inputToPercent(
    useAppSelector<AppState["user"]["userSlippageTolerance"]>((state) => {
      return state.user.userSlippageTolerance;
    })
  );
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
