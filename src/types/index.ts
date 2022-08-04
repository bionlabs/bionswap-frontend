import { Currency, Trade as V2Trade, TradeType } from "@bionswap/core-sdk";

export type Trade = V2Trade<
  Currency,
  Currency,
  TradeType.EXACT_INPUT | TradeType.EXACT_OUTPUT
>;
