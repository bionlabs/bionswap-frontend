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
                    <FlexBox flexDirection='column' gap='24px' justifyContent='center'>
                        <FlexBox gap='20px'>
                            <Image src="/icons/home/launchpad_icon.svg" alt="launchpad_icon" width={37} height={25} />
                            <Typography variant='subtitle1' sx={{ color: 'extra.text.primary' }}>
                                For partners
                            </Typography>
                        </FlexBox>
                        <WrapNetworkHead>
                            <Typography variant='h3Poppins' fontWeight='700'>
                                Want to launch your
                                project on BionSwap ?
                            </Typography>
                        </WrapNetworkHead>
                        <Box maxWidth='218px' width='100%'>
                            <PrimaryButton label="Create  now +" />
                        </Box>
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
    background-color: ${(props) => props.theme.palette.text.secondary};
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
    margin-top: -28%;
    justify-content: space-between;

    ${props => props.theme.breakpoints.down("sm")} {
        flex-direction: column;
        padding: 30px;
        gap: 30px;
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

export default PartnersSection