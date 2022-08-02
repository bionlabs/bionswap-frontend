import { Percent, Token } from "@bionswap/core-sdk";
import { useChain, useNetwork } from "hooks";
import { useMemo, useCallback } from "react";
import { AppState, useAppDispatch, useAppSelector } from "state";
import { SerializedToken, updateUserExpertMode } from "./actions";

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
    return Object.values(serializedTokensMap?.[chainId] ?? {}).map(
      deserializeToken
    );
  }, [serializedTokensMap, chainId]);
}

const parseSlippageInput = (input: string): number =>
  Math.floor(Number.parseFloat(input) * 100);
const inputToPercent = (input: string) =>
  new Percent(parseSlippageInput(input), 10_000);
export function useUserSlippageTolerance() {
  return inputToPercent(
    useAppSelector<AppState["user"]["userSlippageTolerance"]>((state) => {
      return state.user.userSlippageTolerance;
    })
  );
}
