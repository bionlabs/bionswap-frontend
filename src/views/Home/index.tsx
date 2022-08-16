import React from 'react'
import {
    Box,
    Container,
    styled,
    useMediaQuery
} from '@mui/material'
import HeroSection from './Sections/Hero/HeroSection'
import UpcommingProjectSection from './Sections/UpcommingProject/UpcommingProjectSection'
import OurProjectsSection from './Sections/OurProjects/OurProjectsSection'
import LaunchSection from './Sections/Launch/LaunchSection'
import NetworkSection from './Sections/Network/NetworkSection'
import MissionSection from './Sections/Mission/MissionSection'
import PartnersSection from './Sections/Partners/PartnersSection'

const Homepage = () => {
  const isMobile = useMediaQuery('(max-width:700px)');
  const isTablet = useMediaQuery('(max-width:1050px)');

  return (
    <Page>
        <HeroSection isMobile={isMobile} isTablet={isTablet}/>
        <NetworkSection isMobile={isMobile} isTablet={isTablet}/>
        <MissionSection />
        <UpcommingProjectSection/>
        <PartnersSection />
        {/* <OurProjectsSection isMobile={isMobile}/>
        <LaunchSection isMobile={isMobile} /> */}
    </Page>
  )
}

const Page = styled(Box)`
    min-height: 100vh;
    background-color: ${prop => prop.theme.palette.background.default};
    color: ${prop => prop.theme.palette.text.primary}
`


export default Homepage