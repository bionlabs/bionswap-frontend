import { useBlockNumberContext, useGetCurrentBlock } from "components/BlockNumberProvider";

/** Requires that BlockUpdater be installed in the DOM tree. */
export function useBlockNumber(): number | undefined {
  return useBlockNumberContext().value;
}

export function useFastForwardBlockNumber(): (block: number) => void {
  return useBlockNumberContext().fastForward;
}

export function useDynamicBlockNumber(chainId:number): number | undefined {
  return useGetCurrentBlock(chainId).value;
}

export function useDynamicFastForwardBlockNumber(chainId:number): (block: number) => void {
  return useGetCurrentBlock(chainId).fastForward;
}