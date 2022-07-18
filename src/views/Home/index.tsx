import React from 'react'
import {
    Box,
    Container,
    useMediaQuery
} from '@mui/material'
import styled from '@emotion/styled'
import HeroSection from './Sections/Hero/HeroSection'
import UpcommingProjectSection from './Sections/UpcommingProject/UpcommingProjectSection'
import OurProjectsSection from './Sections/OurProjects/OurProjectsSection'
import LaunchSection from './Sections/Launch/LaunchSection'

const Homepage = () => {
  const isMobile = useMediaQuery('(max-width:700px)');
  return (
    <Page>
        <HeroSection isMobile={isMobile}/>
        <UpcommingProjectSection isMobile={isMobile}/>
        <OurProjectsSection isMobile={isMobile}/>
        <LaunchSection isMobile={isMobile} />
    </Page>
  )
}

const Page = styled(Box)`
    min-height: 100vh;
`


export default Homepage