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

const NetworkSection = ({ isMobile }: MobileProp) => {
    return (
        <Wrapper>
            <Container maxWidth='xl'>
                <FlexBox flexDirection='column'>
                    <FlexBox gap='20px'>
                        <Image src="/icons/home/network_symbol.svg" alt="network_symbol" width={37} height={25} />
                        <Typography variant='subtitle1' sx={{ color: 'extra.text.secondary' }}>
                            network
                        </Typography>
                    </FlexBox>
                    <WrapNetworkHead>
                        <Typography variant='h2' sx={{color: 'text.secondary'}}>
                            All activities on multi-chain <Box sx={{color:'secondary.   '}}>Multi-powers!</Box>
                        </Typography>
                    </WrapNetworkHead>
                </FlexBox>
            </Container>
        </Wrapper>
    )
}

const FlexBox = styled(Box)`
    display: flex;
`
const Wrapper = styled(Box)`
    width: 100%;
    background-color: ${(props) => props.theme.palette.background.paper};
    min-height: 100vh;
    // padding-top: 8vh;
    // padding-bottom: 8vh;
    display: flex;
    flex-direction: column;
    gap: 60px;
`
const WrapNetworkHead = styled(Box)`
    max-width: 445px;
    width: 100%;
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

export default NetworkSection