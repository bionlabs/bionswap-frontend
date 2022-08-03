import { useBlockNumber, useChain, useMulticallContract } from "hooks";
import multicall from ".";

export function MulticallUpdater() {
  const { chainId } = useChain();
  const latestBlockNumber = useBlockNumber();

  const contract = useMulticallContract();

  return (
    <multicall.Updater
      chainId={chainId}
      latestBlockNumber={latestBlockNumber}
      contract={contract}
      // listenerOptions={{ blocksPerFetch: 3 }}
    />
  );
}
