import { poolConfig } from '../types'
import { ChainId } from '@bionswap/core-sdk'
import tokens from '../tokens'

const pools: poolConfig[] = [
  {
    pid: 0,
    lpSymbol: 'TRT-ADT',
    address: {
      [ChainId.BSC_TESTNET] : '0x6Ddc3219Ec5061decf9eB7AD70bE9B0a8044a448',
    },
    token: tokens.adt,
    quoteToken: tokens.trt,
  },
]

export default pools
