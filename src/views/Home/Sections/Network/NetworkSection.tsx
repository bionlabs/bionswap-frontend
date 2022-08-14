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
            <FlexBox flexDirection={isMobile ? 'column' : 'row'} justifyContent='center' gap='24px'>
                <FlexBox flexDirection='column' gap='24px' p={isMobile ? '3rem 16px' : '8rem'}>
                    <FlexBox gap='20px'>
                        <Image src="/icons/home/network_symbol.svg" alt="network_symbol" width={37} height={25} />
                        <Typography variant='subtitle1' sx={{ color: 'extra.text.subtitle' }}>
                            network
                        </Typography>
                    </FlexBox>
                    <WrapNetworkHead>
                        <Typography variant='h2' sx={{color: 'text.secondary',fontSize: isMobile ? '48px' : null}}>
                            All activities on multi-chain <Box sx={{color:'extra.text.highlight'}}>Multi-powers!</Box>
                        </Typography>
                    </WrapNetworkHead>
                    <ExploreButton
                        variant='contained'
                    >
                        Explore now !
                    </ExploreButton>
                </FlexBox>
                <FlexBox alignItems='end'>
                    <img src="/images/home/computer.png" alt="" width={isMobile ? '100%' : '600px'} />
                </FlexBox>
            </FlexBox>
        </Wrapper>
    )
}

const FlexBox = styled(Box)`
    display: flex;
`
const Wrapper = styled(Box)`
    width: 100%;
    background-color: ${(props) => props.theme.palette.background.paper};
    display: flex;
    flex-direction: column;
    gap: 60px;
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