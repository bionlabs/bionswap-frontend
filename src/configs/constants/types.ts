import { AddressMap } from '@bionswap/core-sdk';


export interface Token {
  symbol: string;
  address?: AddressMap;
  decimals?: number;
  projectLink?: string;
  busdPrice?: string;
}

export interface poolConfig {
  pid: number;
  lpSymbol: string;
  address: AddressMap;
  token: Token;
  quoteToken: Token;
  multiplier?: string;
  isCommunity?: boolean;
  dual?: {
    rewardPerBlock: number;
    earnLabel: string;
    endBlock: number;
  };
}
