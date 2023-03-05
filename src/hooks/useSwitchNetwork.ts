import { ChainId } from "@bionswap/core-sdk";
import { SwitchNetworkArgs } from "@wagmi/core";
import { useChain } from "hooks";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "state";
import { switchChain } from "state/chains/actions";
import { useSwitchNetwork as useWagmiSwitchNetwork } from "wagmi";

export function useSwitchNetwork({
  ...args
}): ReturnType<
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
