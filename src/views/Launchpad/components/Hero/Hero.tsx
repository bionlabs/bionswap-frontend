import React from 'react'
import { 
    Box,
    styled,
    Typography,
    useMediaQuery
  } from '@mui/material'
import { MobileProp } from 'configs/Type/Mobile/type'
import Image from 'next/image'


const Hero = ({isMobile , isTablet}:MobileProp) => {
  return (
    <Banner padding={isTablet ? '5rem 16px' : '2rem 8rem 0 8rem'}>
    <Flex justifyContent='space-between' alignItems='center'>
        <Box>
            <Box>
                <Typography variant='h2Samsung'>
                Early access to the future
                </Typography>
            </Box>
            <Box>
                <Typography variant='body2Poppins' sx={{color: 'gray.200'}}>
                Supported by industry-leading creators and funds
                </Typography>
            </Box>
            <Flex pt='36px' gap='15px' alignItems='center' flexWrap='wrap'>
                <StyledBox>
                    Create
                </StyledBox>
                <Image src='/images/launchpad/arrow.svg' alt='' width='35px' height='20px' />
                <StyledBox>
                    Subcription
                </StyledBox>
                <Image src='/images/launchpad/arrow.svg' alt='' width='35px' height='20px' />
                <StyledBox>
                    Distribution
                </StyledBox>
            </Flex>
        </Box>
        {
        !isTablet &&
        <img src="/images/launchpad/hero-illus.png" alt="" width={isTablet ? '100%' : '508px'} />
        }
    </Flex>
    </Banner>
  )
}

const Banner = styled(Box)`
  background-image: url('/images/launchpad/hero-bg.png');
  background-color: ${props => props.theme.palette.background.default};
  background-repeat: no-repeat;
  background-size: 100% 100%;
  object-fit: cover;
`

const Flex = styled(Box)`
  display: flex;
`
const StyledBox = styled(Box)`
    border: 1px solid ${props => props.theme.palette.primary.main};
    color: ${props => props.theme.palette.primary.main};
    border-radius: 4px;
    background-color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 13px 30px;
    font-weight: 600;
`

export default Hero