/* eslint-disable @next/next/no-img-element */
import React from 'react'
import {
    Box,
    Button,
    Container
} from '@mui/material'
import styled from '@emotion/styled'
import { MobileProp } from 'configs/Type/Mobile/type'

const LaunchSection = ({ isMobile }: MobileProp) => {
    const Wrapper = styled(Box)`
        width: 100%;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: center;
        padding-top: ${isMobile ? '50px' : '70px'};
        padding-bottom: ${isMobile ? '80px' : '70px'};
        display: flex;
        flex-direction: column;
        gap: ${isMobile ? '50px' : '86px'};
`
    const HeadTitle = styled(Box)`
        color: #0C1116;
        font-weight: 700;
        font-size: ${isMobile ? '32px' : '42px'};
        line-height: 150%;
        text-align: ${isMobile ? 'center' : 'left'}
    `
    const Subcontent = styled(Box)`
        color: #25273D;
        font-weight: 400;
        font-size: ${isMobile ? '14px' : '20px'};
        line-height: 180%;
        max-width: 887px;
        margin: auto;
        text-align: ${isMobile ? 'center' : 'left'}
    `
    const ButtonStyle = styled(Button)`
        font-weight: 600;
        font-size: 16px;
        line-height: 27px;
        color: #0b0b0b;
        padding: 12px;
        max-width: 230px;
        width: 100%;
        border: 1px solid #0b0b0b;
        border-radius: 9999px;
        text-align: center;
        cursor: pointer;
        transition: all .5s ease;
        font-family: 'Inter', sans-serif;
        text-transform: inherit;
        display: block;
        ${isMobile ? 'margin: auto' : ''}

        // &:hover {
        //     background: #0b0b0b;
        //     color: #ffffff;
        //     transition: all .5s ease;
        // }
    `

    return (
        <Wrapper>
            <Container maxWidth='lg'>
                <Box display="flex" gap={3} justifyContent="space-between">
                    <Box sx={{
                        maxWidth: '450px',
                        width: '100%',
                        display: 'flex',
                        gap: '24px',
                        flexDirection: 'column'
                    }}>
                        <HeadTitle>Want to launch your project on BionSwap ?</HeadTitle>
                        <Subcontent>
                            Ideas that launch on BionSwap are not only highly-vetted by our team of expert analysts, but also by industry-leading expertise.
                        </Subcontent>
                        <ButtonStyle>Get started</ButtonStyle>
                    </Box>
                    <Box display={isMobile ? 'none' : 'block'}>
                        <Box marginTop="-225px" component='img' src='/images/Launch.png' alt='Launch' />
                    </Box>
                </Box>
            </Container>
        </Wrapper>
    )
}

export default LaunchSection