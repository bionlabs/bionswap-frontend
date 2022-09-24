import Page from 'components/Page'
import { useChain } from 'hooks';
import React from 'react'
import Contact from './components/Contact/Contact';
import Hero from './components/Hero/Hero';
import LaunchPadSection from './LaunchPadSection';

const Launchpad = () => {
  const { chainId } = useChain();

  return (
    <Page>
      <Hero />
      <LaunchPadSection chainId={chainId} />
      <Contact />
    </Page>
  )
}

export default Launchpad