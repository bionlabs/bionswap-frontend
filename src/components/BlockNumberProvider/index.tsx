import { useChain, useIsWindowVisible } from "hooks";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const MISSING_PROVIDER = Symbol();
const BlockNumberContext = createContext<
  | {
      value?: number;
      fastForward(block: number): void;
    }
  | typeof MISSING_PROVIDER
>(MISSING_PROVIDER);

export function useBlockNumberContext() {
  const blockNumber = useContext(BlockNumberContext);
  if (blockNumber === MISSING_PROVIDER) {
    throw new Error(
      "BlockNumber hooks must be wrapped in a <BlockNumberProvider>"
    );
  }
  return blockNumber;
}

export default function BlockNumberProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { chainId: activeChainId, provider: library } = useChain();
  const [{ chainId, block }, setChainBlock] = useState<{
    chainId?: number;
    block?: number;
  }>({ chainId: activeChainId });

  const onBlock = useCallback(
    (block: number) => {
      setChainBlock((chainBlock) => {
        if (chainBlock.chainId === activeChainId) {
          if (!chainBlock.block || chainBlock.block < block) {
            return { chainId: activeChainId, block };
          }
        }
        return chainBlock;
      });
    },
    [activeChainId, setChainBlock]
  );

  const windowVisible = useIsWindowVisible();
  useEffect(() => {
    if (library && activeChainId && windowVisible) {
      // If chainId hasn't changed, don't clear the block. This prevents re-fetching still valid data.
      setChainBlock((chainBlock) =>
        chainBlock.chainId === activeChainId
          ? chainBlock
          : { chainId: activeChainId }
      );

      library
        .getBlockNumber()
        .then(onBlock)
        .catch((error: any) => {
          console.error(
            `Failed to get block number for chainId ${activeChainId}`,
            error
          );
        });

      library.on("block", onBlock);
      return () => {
        library.removeListener("block", onBlock);
      };
    }
    return undefined;
  }, [activeChainId, library, onBlock, setChainBlock, windowVisible]);

  const value = useMemo(
    () => ({
      value: chainId === activeChainId ? block : undefined,
      fastForward: (block: number) =>
        setChainBlock({ chainId: activeChainId, block }),
    }),
    [activeChainId, block, chainId]
  );
  return (
    <BlockNumberContext.Provider value={value}>
      {children}
    </BlockNumberContext.Provider>
  );
}
