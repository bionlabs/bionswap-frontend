import { Token } from '@bionswap/core-sdk';

export type Order = 'asc' | 'desc';

export interface LaunchpadTableProps {
  order: Order;
  orderBy: any;
  rowCount: number;
}

export interface TableProps {
  chainId: any;
  view: string | null;
}

export interface Data {
  name: string;
  TVL: number;
  staked: number;
  earned: number;
  APR: number;
}

export function createData(name: string, TVL: number, staked: number, earned: number, APR: number): Data {
  return {
    name,
    TVL,
    staked,
    earned,
    APR,
  };
}

export interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}
