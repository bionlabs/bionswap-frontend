import React from 'react'
import {
    Box,
    Container,
    styled,
    useMediaQuery
} from '@mui/material'
import HeroSection from './Sections/Hero/HeroSection';
import LaunchSection from './Sections/Launch/LaunchSection';
import CommunitySection from './Sections/Community/CommunitySection';
import Roadmap from './Sections/Roadmap/Roadmap';
import PartnersSection from './Sections/Partners/PartnersSection';

const Launch = () => {
  const isMobile = useMediaQuery('(max-width:700px)');
  const isTablet = useMediaQuery('(max-width:1050px)');

  return (
    <Page>
        <HeroSection isMobile={isMobile} isTablet={isTablet} />
        {/* <LaunchSection isMobile={isMobile} isTablet={isTablet}/>
        <CommunitySection isMobile={isMobile} isTablet={isTablet}/>
        <PartnersSection isMobile={isMobile} isTablet={isTablet}/>
        <Roadmap isMobile={isMobile} isTablet={isTablet}/> */}
    </Page>
  )
}

const Page = styled(Box)`
    min-height: 100vh;
    background-color: ${prop => prop.theme.palette.background.default};
    color: ${prop => prop.theme.palette.text.primary}
`


export default Launch