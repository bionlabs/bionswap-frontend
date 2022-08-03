import { useBlockNumberContext } from "components/BlockNumberProvider";

/** Requires that BlockUpdater be installed in the DOM tree. */
export function useBlockNumber(): number | undefined {
  return useBlockNumberContext().value;
}

export function useFastForwardBlockNumber(): (block: number) => void {
  return useBlockNumberContext().fastForward;
}
