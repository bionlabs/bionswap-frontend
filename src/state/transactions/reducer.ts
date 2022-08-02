import { createReducer } from "@reduxjs/toolkit";

import { addTransaction, SerializableTransactionReceipt } from "./actions";

const now = () => new Date().getTime();

export interface TransactionDetails {
  hash: string;
  receipt?: SerializableTransactionReceipt;
  lastCheckedBlockNumber?: number;
  addedTime: number;
  confirmedTime?: number;
  from: string;
  summary?: string;
  claim?: { recipient: string };
  approval?: { tokenAddress: string; spender: string };
}

export interface TransactionState {
  [chainId: number]: {
    [txHash: string]: TransactionDetails;
  };
  lastRouteInfo?: any;
}

export const initialState: TransactionState = {};

export default createReducer(initialState, (builder) =>
  builder.addCase(
    addTransaction,
    (
      transactions,
      { payload: { chainId, from, hash, summary, privateTx = false } }
    ) => {
      if (transactions[chainId]?.[hash]) {
        throw Error("Attempted to add existing transaction.");
      }
      const txs = transactions[chainId] ?? {};
      txs[hash] = {
        hash,
        summary,
        from,
        addedTime: now(),
      };
      transactions[chainId] = txs;
    }
  )
);
