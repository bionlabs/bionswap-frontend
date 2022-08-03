import { useAccount, useNetwork, useSigner } from "hooks";
import { useMemo } from "react";
import { useAppSelector } from "state";
import { useClient } from "wagmi";

export function useChain() {
  const selfManagedChainId = useAppSelector((state) => state.chains.chainId);
  const { chain: { id: chainId } = { id: selfManagedChainId } } = useNetwork();
  // const chainId = useAppSelector((state) => state.chains.chainId);

  const { data: signer } = useSigner();
  const client = useClient();
  // const provider = useProvider({ chainId });
  const provider = useMemo(() => {
    if (chainId && typeof client.config.provider === "function")
      return client.config.provider({ chainId });
    return client.provider;
  }, [chainId, client.config, client.provider]);

  // const provider = useMemo(() => {
  //   return new providers.JsonRpcProvider(RPC[chainId as keyof typeof RPC]);
  // }, [chainId]);

  const { address: account, isConnected } = useAccount();

  return { chainId, signer, provider, account, isConnected };
}
