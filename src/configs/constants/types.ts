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
  type: string;
  chainId: number;
  address: string;
  token: Token;
  quoteToken?: Token;
  rewardToken: Token;
  multiplier?: string;
  isCommunity?: boolean;
  dual?: {
    rewardPerBlock: number;
    earnLabel: string;
    endBlock: number;
  };
}
