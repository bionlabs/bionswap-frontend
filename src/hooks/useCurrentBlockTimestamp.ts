import { BigNumber } from "@ethersproject/bignumber";
import { useMulticallContract, useSingleCallResult } from "hooks";

// gets the current timestamp from the blockchain
export default function useCurrentBlockTimestamp(): BigNumber | undefined {
  const multicall = useMulticallContract();
  return useSingleCallResult(multicall, "getCurrentBlockTimestamp")
    ?.result?.[0];
}
