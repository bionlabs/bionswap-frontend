import { Call } from "@uniswap/redux-multicall";

export function parseKeyToCall(key: string): Call {
  const parssed = key.split("-");
  return {
    address: parssed[0],
    callData: parssed[1],
  };
}
