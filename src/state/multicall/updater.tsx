import {
  useBlockNumber,
  useChain,
  useMulticallContract,
  useNetwork,
} from "hooks";
import multicall from ".";

export function MulticallUpdater() {
  const { data: latestBlockNumber } = useBlockNumber({ watch: true });
  const { chainId } = useChain();

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
