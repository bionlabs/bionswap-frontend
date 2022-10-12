/* eslint-disable @next/next/no-img-element */
import React from 'react'
import {
    Box,
    styled,
    Typography
} from '@mui/material'
import { MobileProp } from 'configs/Type/Mobile/type'

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
        <Wrapper padding={isTablet ? '8rem 16px' : '8rem'}>
            <FlexBox flexDirection='column' alignItems='end'>
                <Box maxWidth='512px'>
                    <Typography variant='h2' sx={{color:'primary.dark'}}>
                        BionSwap Partner Network
                    </Typography>
                    <Box>Support you whenever you need!</Box>
                </Box>
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
    background-image: url('/images/home/partner-bg.png');
    color: #000;
    display: flex;
    flex-direction: column;
    gap: 60px;
    min-height: 782px;
    background-repeat: no-repeat;
    background-size: cover;
`

export default PartnersSection