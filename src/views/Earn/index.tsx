import Page from 'components/Page'
import React from 'react'
import { useChain, useContract, useToken } from 'hooks'
import NotSupportSection from 'components/NotSupportSection'
import { ChainId } from '@bionswap/core-sdk'
import EarnSection from './EarnSection'

const Earn = () => {
  const { chainId } = useChain();

  return (
    <Page sx={{backgroundColor: theme => (theme.palette as any).extra.background.alt}}>
        {ChainId.BSC_TESTNET === chainId ? (
          <EarnSection chainId={chainId} />
        ) : (
          <NotSupportSection />
        )}
    </Page>
  )
}

export default Earn