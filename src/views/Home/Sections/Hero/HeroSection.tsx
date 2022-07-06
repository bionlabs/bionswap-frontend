/* eslint-disable @next/next/no-img-element */
import React from 'react'
import {
    Box,
    Button,
    Container
} from '@mui/material'
import styled from '@emotion/styled'
import { MobileProp } from 'configs/Type/Mobile/type'

const HeroSection = ({isMobile}:MobileProp) => {
  return (
    <Wrapper>
        <StyledContained maxWidth='lg' sx={{
            gridTemplateColumns: isMobile ? '100%' :'60% 40%'
        }}>
            <FlexBox flexDirection='column' gap='20px'>
                <Box className='specialFont' sx={{
                    fontSize: isMobile ? '40px' : '60px'
                }}>
                    Own new token with <br/>low risk entrance
                </Box>
                <Box maxWidth='500px' className='subtitle' fontSize='20px' lineHeight='36px'>
                    Earn a yield, Multiply your exposure or Borrow against your crypto. ETH, BTC and 30 more cryptos available to put to work.
                </Box>
                <CTAButton variant='contained'>
                    Explore Projects
                </CTAButton>
            </FlexBox>
            <Box>
                <img src="images/home/herocard.png" alt="" width='100%' />
            </Box>
        </StyledContained>
        <ConstructSection maxWidth='xl'>
            <Box color='#787A9B' fontSize='20px' mb='40px'>
                Who is constructing with BionSwap?
            </Box>
            <Container sx={{
                display: 'flex', alignItems:'center',
                flexWrap: 'wrap',
                width: '100%',
                justifyContent: 'space-between',
                gap: '10px'
            }}>
                <img src="images/home/construct1.png" alt="" width='120px' />
                <img src="images/home/construct2.png" alt="" width='120px' />
                <img src="images/home/construct3.png" alt="" width='120px' />
                <img src="images/home/construct4.png" alt="" width='120px' />
                <img src="images/home/construct5.png" alt="" width='120px' />
                <img src="images/home/construct6.png" alt="" width='120px' />
                <img src="images/home/construct7.png" alt="" width='120px' />
            </Container>
        </ConstructSection>
        
    </Wrapper>
  )
}

const Wrapper = styled(Box)`
    width: 100%;
    background: url('images/home/section01.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
    min-height: 100vh;
    padding-top: calc(78px + 8vh);
    padding-bottom: 8vh;
`
const StyledContained = styled(Container)`
    display: grid;
    align-items: center;
    justify-content: center;
`
const FlexBox = styled(Box)`
    display: flex;
`
const CTAButton = styled(Button)`
    background-color: #25273D;
    border-radius: 31px;
    padding: 12.5px 70px;
    width: fit-content;
    color: #fff;
    text-transform: none;
    box-shadow: none;
    transition: .15s ease-in;
    :hover {
        background-color: #25273D;
        opacity: .9;
    }
`
const ConstructSection = styled(Container)`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export default HeroSection