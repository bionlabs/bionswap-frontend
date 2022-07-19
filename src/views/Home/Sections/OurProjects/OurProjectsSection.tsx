/* eslint-disable @next/next/no-img-element */
import React from 'react'
import {
    Box,
    Container
} from '@mui/material'
import styled from '@emotion/styled'
import { MobileProp } from 'configs/Type/Mobile/type'
import { ourProjectsConfig } from './config'

const OurProjectsSection = ({ isMobile }: MobileProp) => {
    const Wrapper = styled(Box)`
        width: 100%;
        background: url('images/home/Ou_Projects_bg.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: center;
        padding-top: ${isMobile ? '50px' : '100px'};
        padding-bottom: ${isMobile ? '80px' : '150px'};
        display: flex;
        flex-direction: column;
        gap: ${isMobile ? '50px' : '86px'};
`
    const HeadTitle = styled(Box)`
        color: #0C1116;
        font-weight: 700;
        font-size: ${isMobile ? '32px' : '42px'};
        line-height: 150%;
        text-align: center;
        margin-bottom: 16px;
    `
    const Subcontent = styled(Box)`
        color: #25273D;
        font-weight: 400;
        font-size: ${isMobile ? '14px' : '20px'};
        line-height: 180%;
        max-width: 887px;
        margin: auto;
        text-align: center;
    `
    const WrapItems = styled(Box)`
        display: flex;
        gap: 16px;
        flex-wrap: wrap;
        overflow: hidden;
    `
    const BoxLine = styled(Box)`
        display: flex;
        alignItems: center;
        gap: 24px;
    `
    const Item = styled(Box)`
        background: #FAFAFA;
        border: 1px solid #D6DADE;
        border-radius: 999999px;
        padding: 10px 16px;
    `
    const ItemName = styled(Box)`
        font-weight: 600;
        font-size: ${isMobile ? '13px' : '16px'};
        line-height: 160%;
        color: #000000;
        white-space: nowrap;
    `
    const ItemSymbol = styled(Box)`
        color: #787A9B;
        font-weight: 400;
        font-size: ${isMobile ? '12px' : '14px'};
        line-height: 160%;
    `

    return (
        <Wrapper>
            <Container maxWidth='lg'>
                <HeadTitle className='specialFont'>Our projects</HeadTitle>
                <Subcontent>
                    BionDex globally distributed node infrastructure allows us to build the best possible multi chain tools as a foundational layer for Web3, DeFi, and the digital economy.
                </Subcontent>
            </Container>
            <WrapItems>
                <Box display='flex' gap='24px' alignItems="center">
                    <BoxLine sx={{
                        animation: 'animatedRightToLeftTransaction 25s infinite linear 0.5s both',
                    }}>
                        {
                            ourProjectsConfig.map((item, index) => (
                                index < 8
                                    ?
                                    <Item display='flex' gap="10px" alignItems="center" justifyContent="center" >
                                        <Box component='img' src={item.logo} alt={item.name} />
                                        <ItemName>{item.name}</ItemName>
                                        <ItemSymbol>{item.symbol}</ItemSymbol>
                                    </Item>
                                    :
                                    null
                            ))
                        }
                    </BoxLine>
                    <BoxLine sx={{
                        animation: 'animatedRightToLeftTransaction 25s infinite linear 0.5s both',
                    }}>
                        {
                            ourProjectsConfig.map((item, index) => (
                                index < 8
                                    ?
                                    <Item display='flex' gap="10px" alignItems="center" justifyContent="center" >
                                        <Box component='img' src={item.logo} alt={item.name} />
                                        <ItemName>{item.name}</ItemName>
                                        <ItemSymbol>{item.symbol}</ItemSymbol>
                                    </Item>
                                    :
                                    null
                            ))
                        }
                    </BoxLine>
                </Box>
                <Box display='flex' gap='24px' alignItems="center">
                    <BoxLine sx={{
                        animation: 'animatedLeftToRightTransaction 25s infinite linear 0.5s both',
                    }}>
                        {
                            ourProjectsConfig.map((item, index) => (
                                (index >= 8 && index < 15) || index === 7
                                    ?
                                    <Item display='flex' gap="10px" alignItems="center" justifyContent="center" >
                                        <Box component='img' src={item.logo} alt={item.name} />
                                        <ItemName>{item.name}</ItemName>
                                        <ItemSymbol>{item.symbol}</ItemSymbol>
                                    </Item>
                                    :
                                    null
                            ))
                        }
                    </BoxLine>
                    <BoxLine sx={{
                        animation: 'animatedLeftToRightTransaction 25s infinite linear 0.5s both',
                    }}>
                        {
                            ourProjectsConfig.map((item, index) => (
                                (index >= 8 && index < 15) || index === 7
                                    ?
                                    <Item display='flex' gap="10px" alignItems="center" justifyContent="center" >
                                        <Box component='img' src={item.logo} alt={item.name} />
                                        <ItemName>{item.name}</ItemName>
                                        <ItemSymbol>{item.symbol}</ItemSymbol>
                                    </Item>
                                    :
                                    null
                            ))
                        }
                    </BoxLine>
                </Box>
                <Box display='flex' gap='24px' alignItems="center">
                    <BoxLine sx={{
                        animation: 'animatedRightToLeftTransaction 25s infinite linear 0.5s both',
                    }}>
                        {
                            ourProjectsConfig.map((item, index) => (
                                index >= 15 || index === 1
                                    ?
                                    <Item display='flex' gap="10px" alignItems="center" justifyContent="center" >
                                        <Box component='img' src={item.logo} alt={item.name} />
                                        <ItemName>{item.name}</ItemName>
                                        <ItemSymbol>{item.symbol}</ItemSymbol>
                                    </Item>
                                    :
                                    null
                            ))
                        }
                    </BoxLine>
                    <BoxLine sx={{
                        animation: 'animatedRightToLeftTransaction 25s infinite linear 0.5s both',
                    }}>
                        {
                            ourProjectsConfig.map((item, index) => (
                                index >= 15 || index === 1
                                    ?
                                    <Item display='flex' gap="10px" alignItems="center" justifyContent="center" >
                                        <Box component='img' src={item.logo} alt={item.name} />
                                        <ItemName>{item.name}</ItemName>
                                        <ItemSymbol>{item.symbol}</ItemSymbol>
                                    </Item>
                                    :
                                    null
                            ))
                        }
                    </BoxLine>
                </Box>
            </WrapItems>
        </Wrapper>
    )
}

export default OurProjectsSection