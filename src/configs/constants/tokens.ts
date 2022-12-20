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
      [ChainId.BSC]: '0xDF51a4273bA5d4AB8cb834993f5202BAa01A37c4',
      [ChainId.BSC_TESTNET]: '0xA6d33056d46eE54505fD75460B9A4E4BA0D985E7',
    },
    decimals: 18,
  },
};

export default tokens;
