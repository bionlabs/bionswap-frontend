import { AddressMap, ChainId } from '@bionswap/core-sdk';

export const TOKEN_CREATION_FEE: AddressMap = {
  [ChainId.ETHEREUM]: '0.1',
  [ChainId.BSC]: '0.1',
  [ChainId.BSC_TESTNET]: '0.1',
  [ChainId.OKEX]: '0.1',
  [ChainId.OKEX_TESTNET]: '0',
  [ChainId.MATIC]: '0.1',
  [ChainId.MATIC_TESTNET]: '0',
};
