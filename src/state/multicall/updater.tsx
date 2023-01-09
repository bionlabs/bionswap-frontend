import { useDynamicBlockNumber } from 'hooks/useBlockNumber';
import { useMulticallDynamicContract } from 'hooks/useContract';
import multicall from '.';

interface Props {
  chain: number;
}

export function MulticallUpdater({ chain }: Props) {
  // const { chainId } = useChain();
  // const latestBlockNumber = useBlockNumber();
  // const contract = useMulticallContract();

  return (
    <>
      {/* <multicall.Updater
        chainId={chainId}
        latestBlockNumber={latestBlockNumber}
        contract={contract}
        // listenerOptions={{ blocksPerFetch: 10 }}
      /> */}
      <multicall.Updater
        chainId={chain}
        latestBlockNumber={useDynamicBlockNumber(chain)}
        contract={useMulticallDynamicContract(chain)}
        // listenerOptions={{ blocksPerFetch: 10 }}
      />
    </>
  );
}
