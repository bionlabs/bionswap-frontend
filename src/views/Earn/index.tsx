import Page from 'components/Page'
import React from 'react'
import { useChain, useContract, useToken } from 'hooks'
import NotSupportSection from 'components/NotSupportSection'
import { ChainId } from '@bionswap/core-sdk'
import EarnSection from './EarnSection'

const Earn = () => {
  const { chainId } = useChain();

  return (
    <Page>
        {/* {ChainId.BSC_TESTNET === chainId ? (
          <EarnSection chainId={chainId} />
        ) : (
          <NotSupportSection />
        )} */}
        <EarnSection chainId={chainId} />
    </Page>
  )
}

export default Earn