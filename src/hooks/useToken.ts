import { Token } from "@bionswap/core-sdk";
import {
  useAllTokens,
  useBytes32TokenContract,
  useChain,
  useSingleCallResult,
  useTokenContract,
} from "hooks";
import { useMemo } from "react";
import { NEVER_RELOAD } from "state/multicall";
import { parseStringOrBytes32 } from "utils/parse";
import { isAddress } from "utils/validate";

export function useToken(
  tokenAddress?: string | null
): Token | undefined | null {
  const { chainId } = useChain();

  const tokens = useAllTokens();

  const address = !!tokenAddress && isAddress(tokenAddress);

  const tokenContract = useTokenContract(address ? address : undefined, false);
  const tokenContractBytes32 = useBytes32TokenContract(
    address ? address : undefined,
    false
  );
  const token: Token | undefined = address ? tokens[address] : undefined;

  const tokenName = useSingleCallResult(
    token ? undefined : tokenContract,
    "name",
    undefined,
    NEVER_RELOAD
  );
  const tokenNameBytes32 = useSingleCallResult(
    token ? undefined : tokenContractBytes32,
    "name",
    undefined,
    NEVER_RELOAD
  );
  const symbol = useSingleCallResult(
    token ? undefined : tokenContract,
    "symbol",
    undefined,
    NEVER_RELOAD
  );
  const symbolBytes32 = useSingleCallResult(
    token ? undefined : tokenContractBytes32,
    "symbol",
    undefined,
    NEVER_RELOAD
  );
  const decimals = useSingleCallResult(
    token ? undefined : tokenContract,
    "decimals",
    undefined,
    NEVER_RELOAD
  );

  return useMemo(() => {
    if (token) return token;
    if (tokenAddress === null) return null;
    if (!chainId || !address) return undefined;
    if (decimals.loading || symbol.loading || tokenName.loading) return null;
    if (decimals.result) {
      return new Token(
        chainId,
        address,
        decimals.result[0],
        parseStringOrBytes32(
          symbol.result?.[0],
          symbolBytes32.result?.[0],
          "UNKNOWN"
        ),
        parseStringOrBytes32(
          tokenName.result?.[0],
          tokenNameBytes32.result?.[0],
          "Unknown Token"
        )
      );
    }
    return undefined;
  }, [
    address,
    chainId,
    decimals.loading,
    decimals.result,
    symbol.loading,
    symbol.result,
    symbolBytes32.result,
    token,
    tokenAddress,
    tokenName.loading,
    tokenName.result,
    tokenNameBytes32.result,
  ]);
}
