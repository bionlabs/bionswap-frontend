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

const PartnersSection = ({ isMobile, isTablet }: MobileProp) => {
    return (
        <Wrapper>
            <Container maxWidth='lg'>
                <FlexBox flexDirection={isTablet ? 'column' : 'row'} justifyContent='space-between'>
                    <FlexBox alignItems='end' width='50%' sx={{ display: { xs: 'none', md: 'block' } }}>
                        <WrapImage>
                            <img src="/images/home/Group481768.png" alt="Group481768" width='290px' height='auto' />
                        </WrapImage>
                    </FlexBox>
                    <FlexBox flexDirection='column' gap='24px' justifyContent='center' alignItems='center' sx={{ width: {xs: '100%', md: '50%'} }}>
                        <FlexBox flexDirection='column' gap='24px' justifyContent='center'>
                            <FlexBox gap='20px'>
                                <Image src="/icons/home/partner.svg" alt="partner" width={37} height={25} />
                                <Typography variant='subtitle1' sx={{ color: 'extra.text.primary' }}>
                                    For partners
                                </Typography>
                            </FlexBox>
                            <WrapNetworkHead>
                                <Typography variant='h3Samsung' fontWeight='700'>
                                    Want to launch your
                                    project on BionSwap ?
                                </Typography>
                            </WrapNetworkHead>
                            <Box maxWidth='218px' width='100%'>
                                <PrimaryButton label="Create now" />
                            </Box>
                        </FlexBox>
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
    text-align: center;
`
const Wrapper = styled(Box)`
    width: 100%;
    background-color: ${(props) => props.theme.palette.background.default};
    background-image: url('/images/home/Vector.png');
    display: flex;
    flex-direction: column;
    gap: 60px;
    justify-content: center;
    position: relative;
    background-repeat: no-repeat;
    background-size: 100%;
    padding: 35px 0 70px;
`
const WrapNetworkHead = styled(Box)`
    max-width: 352px;
    width: 100%;
`

export default PartnersSection