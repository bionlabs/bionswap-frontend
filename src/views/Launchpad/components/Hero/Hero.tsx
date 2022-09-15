import React from 'react'
import {
  Box,
  Container,
  styled,
  Typography,
  useMediaQuery
} from '@mui/material'
import { MobileProp } from 'configs/Type/Mobile/type'
import Image from 'next/image'


const Hero = () => {
  return (
    <Banner>
      <Container maxWidth='xl'>
        <Flex justifyContent='space-between' alignItems='center'>
          <Flex gap='10px' flexDirection='column'>
            <Typography variant='h3Samsung' color='text.primary'>
              Early access to the future
            </Typography>
            <Typography variant='body2Poppins' sx={{ color: 'gray.400' }}>
              Supported by industry-leading creators and funds
            </Typography>
            <Flex pt='30px' alignItems='center' flexWrap='wrap' sx={{
              gap: { xs: '12px', md: '15px' },
              flexDirection: { xs: 'column', sm: 'row' }
            }}>
              <StyledBox>
                Create
              </StyledBox>
              <ImageArrow>
                <Image src='/images/launchpad/arrow.svg' alt='' width='35px' height='20px' />
              </ImageArrow>
              <StyledBox>
                Subcription
              </StyledBox>
              <ImageArrow>
                <Image src='/images/launchpad/arrow.svg' alt='' width='35px' height='20px' />
              </ImageArrow>
              <StyledBox>
                Distribution
              </StyledBox>
            </Flex>
          </Flex>
          <WrapImage>
            <img src="/images/launchpad/hero-illus.png" alt="" width='508px' />
          </WrapImage>
        </Flex>
      </Container>
    </Banner>
  )
}

const Banner = styled(Box)`
  background-image: url('/images/launchpad/hero-bg.png');
  background-color: ${props => props.theme.palette.background.default};
  background-repeat: no-repeat;
  background-size: 100% 100%;
  object-fit: cover;

  ${props => props.theme.breakpoints.down("lg")} {
    min-height: 300px;
    height: auto;
    display: flex;
    align-items: center;
  }

  ${props => props.theme.breakpoints.down("sm")} {
    padding: 40px 0;
  }
`
const ImageArrow = styled(Box)`
  ${props => props.theme.breakpoints.down("sm")} {
    transform: rotate(90deg)
  }
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
const WrapImage = styled(Box)`
  ${props => props.theme.breakpoints.down("lg")} {
    display: none;
  } 
`

export default Hero