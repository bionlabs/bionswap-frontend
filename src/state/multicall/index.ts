import { createMulticall } from "@uniswap/redux-multicall";

const multicall = createMulticall();
export const multicallReducer = multicall.reducer;

export default multicall;
