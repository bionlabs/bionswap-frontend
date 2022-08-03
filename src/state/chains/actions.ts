import { createAction } from "@reduxjs/toolkit";

export const switchChain = createAction<{ chainId: number }>(
  "chains/switchChain"
);
