import Page from 'components/Page'
import React from 'react'
import Contact from './components/Contact/Contact';
import Hero from './components/Hero/Hero';
import LaunchPadSection from './LaunchPadSection';

const Launchpad = () => {

  return (
    <Page>
      <Hero />
      <LaunchPadSection />
      <Contact />
    </Page>
  )
}

export default Launchpad