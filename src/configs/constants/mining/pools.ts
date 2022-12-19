import { poolConfig } from '../types'
import { ChainId } from '@bionswap/core-sdk'
import tokens from '../tokens'

const pools: poolConfig[] = [
  {
    pid: 0,
    lpSymbol: 'TRT-ADT',
    address: {
      [ChainId.BSC_TESTNET] : '0xC7A7164d7F5aa9DCECCe743eFcc1C9746E35DC4D',
    },
    token: tokens.trt,
    quoteToken: tokens.adt,
  },
]

export default pools
