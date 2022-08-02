import {
  ChainId,
  Currency,
  NATIVE,
  WNATIVE,
  WNATIVE_ADDRESS,
} from "@bionswap/core-sdk";
import { useChain, useNetwork, useToken } from "hooks";
import { useMemo } from "react";

export function useCurrency(
  currencyId: string | undefined
): Currency | null | undefined {
  const { chainId } = useChain();

  // Since this is used throughout the app, cant change this to NATIVE[chainId]?.symbol
  const isETH = currencyId?.toUpperCase() === "ETH";

  const isDual = [ChainId.CELO].includes(chainId);

  const useNative = isETH && !isDual;

  if (isETH && isDual) {
    currencyId = WNATIVE_ADDRESS[chainId];
  }

  const token = useToken(useNative ? undefined : currencyId);

  const { native, wnative } = useMemo(
    () => ({
      native:
        chainId && chainId in NATIVE
          ? NATIVE[chainId as keyof typeof NATIVE]
          : undefined,
      wnative: chainId && chainId in WNATIVE ? WNATIVE[chainId] : undefined,
    }),
    [chainId]
  );

  if (wnative?.address?.toLowerCase() === currencyId?.toLowerCase())
    return wnative;

  return useNative ? native : token;
}
