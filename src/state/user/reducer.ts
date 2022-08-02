import { createReducer } from "@reduxjs/toolkit";
import { Percent } from "@bionswap/core-sdk";
import { DEFAULT_DEADLINE_FROM_NOW } from "constants/common";
import {
  addSerializedPair,
  addSerializedToken,
  removeSerializedPair,
  removeSerializedToken,
  SerializedPair,
  SerializedToken,
  toggleURLWarning,
  updateUserDeadline,
  updateUserExpertMode,
} from "./actions";

const V2_SWAP_DEFAULT_SLIPPAGE = new Percent(50, 10_000);
const currentTimestamp = () => new Date().getTime();
function pairKey(token0Address: string, token1Address: string) {
  return `${token0Address};${token1Address}`;
}
export interface UserState {
  // the timestamp of the last updateVersion action
  lastUpdateVersionTimestamp?: number;

  userExpertMode: boolean;

  userSingleHopOnly: boolean; // only allow swaps on direct pairs

  // deadline set by user in minutes, used in all txns
  userDeadline: number;

  tokens: {
    [chainId: number]: {
      [address: string]: SerializedToken;
    };
  };

  pairs: {
    [chainId: number]: {
      // keyed by token0Address:token1Address
      [key: string]: SerializedPair;
    };
  };

  timestamp: number;
  URLWarningVisible: boolean;
  // user defined slippage tolerance in bips, used in all txns
  userSlippageTolerance: string;
}

export const initialState: UserState = {
  userExpertMode: true,
  userSingleHopOnly: false,
  userDeadline: DEFAULT_DEADLINE_FROM_NOW,
  tokens: {},
  pairs: {},
  timestamp: currentTimestamp(),
  URLWarningVisible: true,
  userSlippageTolerance: V2_SWAP_DEFAULT_SLIPPAGE.toFixed(),
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(updateUserExpertMode, (state, action) => {
      state.userExpertMode = action.payload.userExpertMode;
      state.timestamp = currentTimestamp();
    })
    .addCase(updateUserDeadline, (state, action) => {
      state.userDeadline = action.payload.userDeadline;
      state.timestamp = currentTimestamp();
    })
    .addCase(addSerializedToken, (state, { payload: { serializedToken } }) => {
      state.tokens[serializedToken.chainId] =
        state.tokens[serializedToken.chainId] || {};
      state.tokens[serializedToken.chainId][serializedToken.address] =
        serializedToken;
      state.timestamp = currentTimestamp();
    })
    .addCase(
      removeSerializedToken,
      (state, { payload: { address, chainId } }) => {
        state.tokens[chainId] = state.tokens[chainId] || {};
        delete state.tokens[chainId][address];
        state.timestamp = currentTimestamp();
      }
    )
    .addCase(addSerializedPair, (state, { payload: { serializedPair } }) => {
      if (
        serializedPair.token0.chainId === serializedPair.token1.chainId &&
        serializedPair.token0.address !== serializedPair.token1.address
      ) {
        const chainId = serializedPair.token0.chainId;
        state.pairs[chainId] = state.pairs[chainId] || {};
        state.pairs[chainId][
          pairKey(serializedPair.token0.address, serializedPair.token1.address)
        ] = serializedPair;
      }
      state.timestamp = currentTimestamp();
    })
    .addCase(
      removeSerializedPair,
      (state, { payload: { chainId, tokenAAddress, tokenBAddress } }) => {
        if (state.pairs[chainId]) {
          // just delete both keys if either exists
          delete state.pairs[chainId][pairKey(tokenAAddress, tokenBAddress)];
          delete state.pairs[chainId][pairKey(tokenBAddress, tokenAAddress)];
        }
        state.timestamp = currentTimestamp();
      }
    )
    .addCase(toggleURLWarning, (state) => {
      state.URLWarningVisible = !state.URLWarningVisible;
    })
);
