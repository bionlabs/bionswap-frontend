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
            gridTemplateColumns: isMobile ? '100%' :'60% 40%',
            rowGap: '10px'
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
        <Container>
            <NumberSection sx={{
                marginTop:'40px',
                flexDirection: isMobile ? 'column' : 'row',
                gap: isMobile ? '24px' : null
            }}
            >
                <NumberBox>
                    <Box className='specialFont' fontSize='34px'>30+</Box>
                    <Box>Projects and Investors</Box>
                </NumberBox>
                {isMobile ? <Divider/> : <DividerVertical/>}
                <NumberBox>
                    <Box className='specialFont' fontSize='34px'>$600+</Box>
                    <Box>Funds Raised</Box>
                </NumberBox>
                {isMobile ? <Divider/> : <DividerVertical/>}
                <NumberBox>
                    <Box className='specialFont' fontSize='34px'>400+</Box>
                    <Box>AMAs</Box>
                </NumberBox>
                {isMobile ? <Divider/> : <DividerVertical/>}
                <NumberBox>
                    <Box className='specialFont' fontSize='34px'>1M+</Box>
                    <Box>Media Coverage</Box>
                </NumberBox>
            </NumberSection>
        </Container>
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
    padding-top: 8vh;
    padding-bottom: 8vh;
    display: flex;
    flex-direction: column;
    gap: 60px;
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
    background-color: #0b0b0b;
    border-radius: 31px;
    padding: 12.5px 70px;
    width: fit-content;
    color: #fff;
    text-transform: none;
    box-shadow: none;
    transition: .15s ease-in;
    :hover {
        background-color: #0b0b0b;
        opacity: .9;
    }
`
const ConstructSection = styled(Container)`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const NumberSection = styled(Box)`
    border-radius: 10px;
    border: 1px solid rgba(101, 84, 169, 0.2);
    background: #fff;
    padding: 24px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const NumberBox = styled(Box)`
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 10px;
`
const Divider = styled.div`
    width: 100%;
    height: 1px;
    background: rgba(101, 84, 169, 0.2);
`
const DividerVertical = styled.div`
    width: 1px;
    min-height: 80px;
    background: rgba(101, 84, 169, 0.2);
`

export default HeroSection