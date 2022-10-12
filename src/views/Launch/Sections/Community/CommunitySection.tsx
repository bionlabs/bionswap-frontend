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
        icon: '/images/home/telegram.svg',
        number: '100K',
        link: '/',
        color: ''
    },
    {
        label: 'Twitter',
        icon: '/images/home/twitter.svg',
        number: '100K',
        link: '/',
        color: ''
    },
    {
        label: 'Discord',
        icon: '/images/home/discord.svg',
        number: '100K',
        link: '/',
        color: ''
    },
    {
        label: 'Community',
        icon: '/images/home/community.svg',
        number: '100K',
        link: '/',
        color: ''
    },
]

const config2 = [
    {
        label: 'Incubating program',
        icon: '/images/home/icon1.svg',
        content: 'Smart contracts support and stragegies advice.',
        color: '#2AC89F'
    },
    {
        label: 'All automative',
        icon: '/images/home/icon2.svg',
        content: 'Launch your projects on Bionswap with a single click!',
        link: '/',
        color: '#07E0E0'
    },
    {
        label: 'Payout',
        icon: '/images/home/icon3.svg',
        content: 'Helping early-born projects with a reasonable price.',
        link: '/',
        color: '#9A6AFF'
    },
]

const CommunitySection = ({ isMobile, isTablet }: MobileProp) => {
    return (
        <Wrapper padding={isTablet ? '8rem 16px' : '8rem'}>
            <FlexBox gap='42px' alignItems='center' justifyContent='space-between' width='100%' flexDirection={isMobile ? 'column' : 'row'}>
                <Box maxWidth='591px'>
                    <Typography variant='h2' sx={{color: '#9A6AFF'}}>
                        Our Strong Community
                    </Typography>
                    <Typography variant='h6'>
                        We have a global distributed network of loyal backers interested in supporting the project of the future, like yours.
                    </Typography>
                </Box>
                <Box sx={{
                    display: 'grid', gridTemplateColumns: 'auto auto', gap: '42px'
                }}>
                    {
                        config.map(item =>
                            <FlexBox key='' alignItems={isMobile ? 'start' :'center'} gap='15px' flexDirection={isTablet ? 'column' : 'row'}>
                                <Box padding={isTablet ? '15px' : '21px'} borderRadius='12px' sx={{backgroundColor: '#535353',display:'flex',justifyContent:'center',alignItems:'center'}}> 
                                    <Image src={item.icon} alt='' width='32px' height='32px' />
                                </Box>
                                <Box>
                                    <Typography variant='h4'>
                                        +{item.number}
                                    </Typography>
                                    <Typography sx={{color: 'gray.400'}}>
                                        {item.label} members
                                    </Typography>
                                </Box>
                                
                            </FlexBox>
                        )
                    }
                </Box>
            </FlexBox>
            <FlexBox alignItems='center' gap='42px' flexDirection='column'>
                <Typography variant={isMobile ? 'h3Samsung' : 'h2'}>
                    All-encompassing support
                </Typography>
                <Box sx={{
                    display: 'grid', gridTemplateColumns: isTablet ? 'auto auto' : isMobile ? 'auto' :  'auto auto auto',
                    alignItems: 'center', gap: '60px'
                }}>
                    {
                        config2.map(item =>
                            <FlexBox key='' alignItems={isMobile ? 'start' :'center'} gap='15px' flexDirection={isTablet ? 'column' : 'row'} maxWidth='323px'>
                                <Image src={item.icon} alt='' width='60px' height='60px' />
                                <FlexBox flexDirection='column'>
                                    <Typography variant='h6' sx={{color: item.color}}>
                                        {item.label}
                                    </Typography>
                                    <Typography variant='body4Poppins'>
                                        {item.content}
                                    </Typography>
                                </FlexBox>
                                
                            </FlexBox>
                        )
                    }
                </Box>
            </FlexBox>
        </Wrapper>
    )
}

const Wrapper = styled(Box)`
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 60px;
    background: url("/images/home/community.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    align-items: center;
    justify-content: space-between;
  }
`
const FlexBox = styled(Box)`
  display: flex
`


export default CommunitySection