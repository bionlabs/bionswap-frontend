import { CurrencyAmount, Token } from "@bionswap/core-sdk";
import {
  useAccount,
  useAllTokens,
  useTokenBalances,
  useTokenBalancesWithLoadingIndicator,
} from "hooks";
import { useMemo } from "react";

// mimics useAllBalances
export function useAllTokenBalances(): {
  [tokenAddress: string]: CurrencyAmount<Token> | undefined;
} {
  const { address: account } = useAccount();
  const allTokens = useAllTokens();
  const tokens = useMemo(() => Object.values(allTokens ?? {}), [allTokens]);
  const balances = useTokenBalances(account ?? undefined, tokens);
  return balances ?? {};
}

export function useAllTokenBalancesWithLoadingIndicator(account: string) {
  const allTokens = useAllTokens();
  const tokens = useMemo(() => Object.values(allTokens ?? {}), [allTokens]);
  return useTokenBalancesWithLoadingIndicator(account, tokens);
}
