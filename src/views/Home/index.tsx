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

const Homepage = () => {
  const isMobile = useMediaQuery('(max-width:700px)');
  return (
    <Page>
        <HeroSection isMobile={isMobile}/>
        <NetworkSection isMobile={isMobile}/>
        <UpcommingProjectSection isMobile={isMobile}/>
        <OurProjectsSection isMobile={isMobile}/>
        <LaunchSection isMobile={isMobile} />
    </Page>
  )
}

const Page = styled(Box)`
    min-height: 100vh;
    background-color: ${prop => prop.theme.palette.background.default};
    color: ${prop => prop.theme.palette.text.primary}
`


export default Homepage