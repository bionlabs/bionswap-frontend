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
import Link from 'next/link';
import { text } from 'stream/consumers';

const config = [
    {
        label: 'Telegram',
        icon: '/images/socials/telegram.png',
        link: '/',
        color: '#2A73C8'
    },
    {
        label: 'Twitter',
        icon: '/images/socials/twitter.png',
        link: '/',
        color: '#006EB2'
    },
    {
        label: 'Discord',
        icon: '/images/socials/discord.png',
        link: '/',
        color: '#6803B8'
    },
]

const CommunitySection = ({ isMobile, isTablet }: MobileProp) => {
    return (
        <Wrapper>
            <Container maxWidth='lg'>
                <FlexBox flexDirection={isTablet ? 'column' : 'row'} justifyContent='space-between'>
                    <FlexBox flexDirection='column' gap='24px' justifyContent='center' alignItems='center'>
                        <FlexBox flexDirection='column' gap='22px' justifyContent='center'>
                            <FlexBox gap='20px'>
                                <Image src="/icons/home/community.svg" alt="partner" width={37} height={25} />
                                <Typography variant='subtitle1' sx={{ color: 'gray.700' }}>
                                    Community
                                </Typography>
                            </FlexBox>
                            <WrapNetworkHead flexDirection='column'>
                                <Typography variant='h3Samsung' color='#000000' fontWeight='700'>
                                    Join the Bionswap community today
                                </Typography>
                                <Typography variant='body3Poppins' color='primary.dark' fontWeight='400'>
                                    Support you whenever you need !
                                </Typography>
                            </WrapNetworkHead>
                            <FlexBox width='100%' gap='17px' sx={{
                                flexWrap: {xs: 'wrap', md: 'inherit'}
                            }}>
                                {
                                    config.map((item: any) => (
                                        <Link key={item.label} href={item.link}>
                                            <ButtonSocial component='a' sx={{
                                                borderColor: item.color,
                                                backgroundColor: item.color,
                                                color: '#ffffff',

                                                '&:hover': {
                                                    backgroundColor: '#ffffff',

                                                    'span': {
                                                        color: item.color,
                                                    }
                                                }
                                            }}>
                                                <img src={item.icon} alt={item.label} />
                                                <Typography variant='body3Poppins' fontWeight='600'>
                                                    {item.label}
                                                </Typography>
                                            </ButtonSocial>
                                        </Link>
                                    ))
                                }
                            </FlexBox>
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
const Wrapper = styled(Box)`
    width: 100%;
    background-color: ${(props) => (props.theme.palette as any).extra.background.gray};
    background-image: url('/images/global.png');
    background-size: contain;
    background-position: right bottom;
    display: flex;
    flex-direction: column;
    gap: 60px;
    justify-content: center;
    position: relative;
    background-repeat: no-repeat;
    background-size: 100%;
    padding: 105px 0 145px;
    background-size: contain;
    background-position: right;
`
const WrapNetworkHead = styled(Box)`
    max-width: 582px;
    width: 100%;
    display: flex;
`
const ButtonSocial = styled(Box)`
    max-width: 202px;
    height: 50px;
    display: flex;
    align-items: center;
    gap: 15px;
    border: 1px solid;
    border-radius: 4px;
    justify-content: center;
    cursor: pointer;
    width: 100%;
`

export default CommunitySection