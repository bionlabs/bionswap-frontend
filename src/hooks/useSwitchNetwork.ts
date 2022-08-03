import { ChainId } from "@bionswap/core-sdk";
import { useChain } from "hooks";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "state";
import { switchChain } from "state/chains/actions";
import { useSwitchNetwork as useWagmiSwitchNetwork } from "wagmi";
import {
  UseSwitchNetworkArgs,
  UseSwitchNetworkConfig,
} from "wagmi/dist/declarations/src/hooks/accounts/useSwitchNetwork";

export function useSwitchNetwork({
  ...args
}: UseSwitchNetworkArgs & UseSwitchNetworkConfig): ReturnType<
  typeof useWagmiSwitchNetwork
> {
  const { switchNetwork: wagmiSwitchNetwork, ...returns } =
    useWagmiSwitchNetwork({ ...args });
  const { chainId, account } = useChain();
  const dispatch = useAppDispatch();

  const switchNetwork = useCallback(
    (switchToChainId: number = ChainId.BSC) => {
      if (chainId === switchToChainId) return;

      if (account) {
        wagmiSwitchNetwork?.(switchToChainId);
      }

      dispatch(switchChain({ chainId: switchToChainId }));
    },
    [account, chainId, dispatch, wagmiSwitchNetwork]
  );
  return { switchNetwork, ...returns };
}
