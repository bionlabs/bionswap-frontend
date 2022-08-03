export type { CallStateResult } from "@uniswap/redux-multicall"; // re-export for convenience
export { NEVER_RELOAD } from "@uniswap/redux-multicall"; // re-export for convenience

import { createMulticall } from "@uniswap/redux-multicall";

export const multicall = createMulticall();

export default multicall;
