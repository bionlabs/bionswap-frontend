import { Token , ChainId } from '@bionswap/core-sdk';

const tokens = {
  adt: {
    symbol: 'ADT',
    address: {
      [ChainId.BSC]: '0xc008debbb1f33d9453ffd2104feb1fe7e9663524',
      [ChainId.BSC_TESTNET]: '0x834ec3a7aef670c10b255a95b0912f0023d739c0',
    },
    decimals: 18,
  },
  trt: {
    symbol: 'TRT',
    address: {
      [ChainId.BSC]: '0xc008debbb1f33d9453ffd2104feb1fe7e9663524',
      [ChainId.BSC_TESTNET]: '0x834ec3a7aef670c10b255a95b0912f0023d739c0',
    },
    decimals: 18,
  },
};

export default tokens;
