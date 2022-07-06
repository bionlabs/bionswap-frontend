import React from 'react'
import {
    Box,
    Container,
    useMediaQuery
} from '@mui/material'
import styled from '@emotion/styled'
import HeroSection from './Sections/Hero/HeroSection'

const Homepage = () => {
  const isMobile = useMediaQuery('(max-width:700px)');
  return (
    <Page>
        <HeroSection isMobile={isMobile}/>
    </Page>
  )
}

const Page = styled(Box)`
    min-height: 100vh;
`


export default Homepage