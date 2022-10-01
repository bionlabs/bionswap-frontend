import Page from 'components/Page';
import { ChainId } from '@bionswap/core-sdk';
import { useChain, useSwitchNetwork } from 'hooks';
import React from 'react';
import Contact from './components/Contact/Contact';
import Hero from './components/Hero/Hero';
import LaunchPadSection from './LaunchPadSection';
import NotSupportSection from 'components/NotSupportSection';

const Launchpad = () => {
  const { chainId } = useChain();
  console.log("🚀 ~ file: index.tsx ~ line 10 ~ Launchpad ~ chainId", chainId)

  return (
    <Page>
      <Hero />
      {ChainId.BSC_TESTNET === chainId ? (
        <LaunchPadSection chainId={chainId} />
      ) : (
        <NotSupportSection />
      )}
      <Contact />
    </Page>
  );
};

export default Launchpad;
