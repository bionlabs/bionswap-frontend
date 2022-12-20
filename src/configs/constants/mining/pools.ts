import { poolConfig } from '../types'
import { ChainId } from '@bionswap/core-sdk'
import tokens from '../tokens'

const pools: poolConfig[] = [
  {
    pid: 0,
    lpSymbol: 'TRT-ADT',
    address: {
      [ChainId.BSC_TESTNET] : '0x972B8c192561cF6D2AF36880a95D28647E2141Ac',
    },
    token: tokens.trt,
    quoteToken: tokens.adt,
  },
]

export default pools
