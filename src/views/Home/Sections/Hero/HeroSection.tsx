/* eslint-disable @next/next/no-img-element */
import React from 'react'
import {
    Box,
    Button,
    Container,
    styled,
    Typography,
    Stack
} from '@mui/material'
import { MobileProp } from 'configs/Type/Mobile/type'
import Image from "next/image";
import PrimaryButton from 'components/PrimaryButton';

const HeroSection = ({ isMobile }: MobileProp) => {
    return (
        <Wrapper>
            <FlexBox>
                <Box display='flex' width='50%'>
                    <WrapContentArea>
                        <FlexBox gap='20px'>
                            <Image src="/icons/home/code_symbol.svg" alt="code_symbol" width={37} height={25} />
                            <Typography variant='subtitle1' sx={{ color: 'extra.text.secondary' }}>
                                the next-gen decentralize
                            </Typography>
                        </FlexBox>
                        <WrapHeroHead>
                            <Typography variant='h1'>
                                Own new token with low risk entrance
                            </Typography>
                        </WrapHeroHead>
                        <WrapHeroContent>
                            <Typography variant='h6' sx={{ color: 'extra.text.primary' }}>
                                Bionswap is a decentralized exchange native to BNB Chain and other chains
                            </Typography>
                        </WrapHeroContent>
                        <FlexBox gap='28px'>
                            <Box maxWidth='218px' width='100%'>
                                <PrimaryButton label="Trade now" />
                            </Box>
                            <Box maxWidth='218px' width='100%'>
                                <PrimaryButton label="Get in touch ->" />
                            </Box>
                        </FlexBox>
                    </WrapContentArea>
                </Box>
                <WrapGlassArea>
                    {/* <img src="images/home/herocard.png" alt="" width='100%' /> */}
                </WrapGlassArea>
            </FlexBox>
            {/* <ConstructSection maxWidth='xl'>
                <Box color='#787A9B' fontSize='20px' mb='40px'>
                    Who is constructing with BionSwap?
                </Box>
                <Container sx={{
                    display: 'flex', alignItems: 'center',
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
                    marginTop: '40px',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: isMobile ? '24px' : null
                }}
                >
                    <NumberBox>
                        <Box className='specialFont' fontSize='34px'>30+</Box>
                        <Box>Projects and Investors</Box>
                    </NumberBox>
                    {isMobile ? <Divider /> : <DividerVertical />}
                    <NumberBox>
                        <Box className='specialFont' fontSize='34px'>$600+</Box>
                        <Box>Funds Raised</Box>
                    </NumberBox>
                    {isMobile ? <Divider /> : <DividerVertical />}
                    <NumberBox>
                        <Box className='specialFont' fontSize='34px'>400+</Box>
                        <Box>AMAs</Box>
                    </NumberBox>
                    {isMobile ? <Divider /> : <DividerVertical />}
                    <NumberBox>
                        <Box className='specialFont' fontSize='34px'>1M+</Box>
                        <Box>Media Coverage</Box>
                    </NumberBox>
                </NumberSection>
            </Container> */}
        </Wrapper>
    )
}

const FlexBox = styled(Box)`
    display: flex;
`
const WrapHeroHead = styled(Box)`
    max-width: 600px;
    width: 100%;
`
const WrapHeroContent = styled(Box)`
    max-width: 460px;
    width: 100%;
`
const Wrapper = styled(Box)`
    width: 100%;
    background: url('/images/home/hero_bg.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: right -75px;
    min-height: 100vh;
    // padding-top: 8vh;
    // padding-bottom: 8vh;
    display: flex;
    flex-direction: column;
    gap: 60px;
`
const WrapContentArea = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 560px;
    width: 100%;
    margin: auto;
`
const WrapGlassArea = styled(Box)`
    background: url('/images/home/glag.png');
    background-repeat: no-repeat;
    background-size: 120%;
    background-position: center;
    max-width: 700px;
    width: 100%;
    height: 723px;
`

export default HeroSection