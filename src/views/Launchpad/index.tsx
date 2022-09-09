import { 
  Box,
  styled,
  Typography,
  useMediaQuery
} from '@mui/material'
import Page from 'components/Page'
import React from 'react'
import Contact from './components/Contact/Contact';
import Hero from './components/Hero/Hero';
import LaunchPadSection from './LaunchPadSection';

const Launchpad = () => {
  const isMobile = useMediaQuery('(max-width:700px)');
  const isTablet = useMediaQuery('(max-width:1050px)');
  const isDesktop = useMediaQuery('(max-width:1380px)');

  return (
    <Page>
      <Hero isMobile={isMobile} isTablet={isTablet} />
      <LaunchPadSection
        isMobile={isMobile}
        isTablet={isTablet}
        isDesktop={isDesktop}
      />
      <Contact isMobile={isMobile} isTablet={isTablet}/>
    </Page>
  )
}


const Flex = styled(Box)`
  display: flex;
`

export default Launchpad