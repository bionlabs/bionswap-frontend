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

const config = [
    {
        label: 'All-Time Volume',
        value: '$78.07B'
    },
    {
        label: 'Total Transactions',
        value: '14.64M'
    },
    {
        label: 'Users',
        value: '1,530,450'
    },
    {
        label: 'All-Time Volumers',
        value: '$78.07B'
    },
]

const NetworkSection = ({ isMobile, isTablet }: MobileProp) => {
    return (
        <Wrapper>
            <Container maxWidth='lg'>
                <WrapConfig>
                    {
                        config.map((item, index) => (
                            <>
                                <ConfigItem key={item.label}>
                                    <Typography variant='h4' sx={{ color: 'text.secondary' }}>
                                        {item.value}
                                    </Typography>
                                    <Typography variant='body1' sx={{ color:'text.secondary' }}>
                                        {item.label}
                                    </Typography>
                                </ConfigItem>
                                {
                                    index !== config.length - 1 && <Line sx={{ display: {xs: 'none', md: 'block'} }} />
                                } 
                            </>
                        ))
                    }
                </WrapConfig>
            </Container>
            <Container maxWidth='lg'>
                <FlexBox flexDirection={isTablet ? 'column' : 'row'} justifyContent='space-between'>
                    <FlexBox flexDirection='column' gap='24px'>
                        <FlexBox gap='20px'>
                            <Image src="/icons/home/network_symbol.svg" alt="network_symbol" width={37} height={25} />
                            <Typography variant='subtitle1' sx={{ color: 'extra.text.subtitle' }}>
                                network
                            </Typography>
                        </FlexBox>
                        <WrapNetworkHead>
                            <Typography variant='h2' sx={{ color: 'text.secondary', fontSize: isMobile ? '48px' : null }}>
                                All activities on multi-chain <Box sx={{ color: 'extra.text.highlight' }}>Multi-powers!</Box>
                            </Typography>
                        </WrapNetworkHead>
                        <ExploreButton
                            variant='contained'
                        >
                            Explore now !
                        </ExploreButton>
                    </FlexBox>
                    <FlexBox alignItems='end' width='50%' sx={{display: {xs: 'none', md: 'block'}}}>
                        <WrapImage>
                            <img src="/images/home/computer.png" alt="" width='100%' height='auto' />
                        </WrapImage>
                    </FlexBox>
                </FlexBox>
            </Container>
        </Wrapper>
    )
}

const FlexBox = styled(Box)`
    display: flex;
`
const WrapImage = styled(Box)`
    position: absolute;
    bottom: -7px;
    max-width: 40%;
    width: 100%;
`
const Wrapper = styled(Box)`
    width: 100%;
    background-color: ${(props) => props.theme.palette.background.paper};
    display: flex;
    flex-direction: column;
    gap: 60px;
    min-height: 100vh;
    justify-content: center;
    position: relative;
    z-index: 10;

    ${props => props.theme.breakpoints.down("sm")} {
        padding-bottom: 8vh;
    }
`
const Line = styled(Box)`
    width: 1px;
    height: 89px;
    background-color: ${(props) => (props.theme.palette as any).extra.divider.background};
`
const ConfigItem = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 2px;
    align-items: center;
`
const WrapConfig = styled(Box)`
    background-color: ${(props) => props.theme.palette.background.paper};;
    border: 1px solid #000000;
    padding: 37px 72px;
    display: flex;
    gap: 71px;
    margin-top: -33vh;
    justify-content: space-between;

    ${props => props.theme.breakpoints.down("sm")} {
        flex-direction: column;
        padding: 30px;
        gap: 30px;
        margin-top: 50px;
    }
`
const WrapNetworkHead = styled(Box)`
    max-width: 445px;
    width: 100%;
`
const ExploreButton = styled(Button)`
    width: fit-content;
    padding: 12px 70px;
    background: ${prop => prop.theme.palette.background.default};
    color: ${prop => prop.theme.palette.text.primary}
`

export default NetworkSection