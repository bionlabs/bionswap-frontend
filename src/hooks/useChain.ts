import { ChainId } from "@bionswap/core-sdk";
import { useAccount, useNetwork, useProvider, useSigner } from "hooks";

export function useChain() {
  const { chain: { id: chainId } = { id: ChainId.BSC } } = useNetwork();
  const { data: signer } = useSigner();
  const provider = useProvider({ chainId });
  const { address: account } = useAccount();

  return { chainId, signer, provider, account };
}
