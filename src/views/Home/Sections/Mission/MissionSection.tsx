/* eslint-disable @next/next/no-img-element */
import React from 'react'
import {
    Box,
    Container,
    styled,
    Typography,
} from '@mui/material'
import Image from "next/image";

const config = [
    {
        icon: '/images/home/arrange-circle.png',
        label: 'Swap token with low gas fee and  fast. transaction',
        action: 'Swap now',
        url: '',
        bgColor: 'background.default',
        bgIcon: '#272727',
        fontColor: 'text.primary'
    },
    {
        icon: '/images/home/additem.png',
        label: 'Create token, projects token sale or air drop. all with a single click',
        action: 'Create now',
        url: '',
        bgColor: 'background.paper',
        bgIcon: '#D9D9D9',
        fontColor: 'text.secondary'
    },
    {
        icon: '/images/home/award.png',
        label: 'Participate on all of our event such as ido, lucky events',
        action: 'Join now',
        url: '',
        bgColor: 'primary.main',
        bgIcon: '#82FFFF',
        fontColor: 'text.secondary'
    },
]

const MissionSection = () => {
    return (
        <Wrapper>
            <Container maxWidth='lg'>
                <FlexBox flexDirection='column' gap='127px'>
                    <FlexBox flexDirection='column' gap='12px'>
                        <Typography variant='h2'>
                            What&apos;s possible with BionSwap?
                        </Typography>
                        <Typography variant='h3'>
                            Bionswap is a decentralized exchange native to BNB Chain and other chains
                        </Typography>
                    </FlexBox>
                </FlexBox>
                <Box mt='128px' sx={{position: 'relative'}}>
                    <WrapLogo>
                        <Image src='/images/home/Frame481747.png' alt='Frame481747' width='103px' height='74px' />
                    </WrapLogo>
                    <FlexBox justifyContent='flex-end' sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
                        <ItemConfig sx={{ backgroundColor: 'background.default' }}>
                            <FlexBox flexDirection='column' gap='19px' alignItems='baseline'>
                                <WrapIcon sx={{ backgroundColor: '#272727' }}>
                                    <Image src='/images/home/arrange-circle.png' alt='Swap token with low gas fee and  fast. transaction' width='29px' height='29px' />
                                </WrapIcon>
                                <Typography variant='bodyPoppins' fontWeight='600'>
                                    Swap token with low gas fee and  fast. transaction
                                </Typography>
                            </FlexBox>
                            <FlexBox alignItems='center' gap='13px'>
                                <Line sx={{ backgroundColor: 'background.paper' }} />
                                <Typography variant='body3Poppins' fontWeight='400' sx={{ color: 'background.paper' }}>
                                    Swap now
                                </Typography>
                            </FlexBox>
                        </ItemConfig>
                        <ItemConfig sx={{ backgroundColor: 'background.paper' }}>
                            <FlexBox flexDirection='column' gap='19px' alignItems='baseline'>
                                <WrapIcon sx={{ backgroundColor: '#D9D9D9' }}>
                                    <Image src='/images/home/additem.png' alt='additem' width='29px' height='29px' />
                                </WrapIcon>
                                <Box>
                                    <Typography variant='body3Poppins' fontWeight='500' sx={{ color: 'secondary.main' }}>
                                        Create
                                    </Typography>
                                    <Typography variant='body3Poppins' fontWeight='600' sx={{ color: 'text.secondary' }}>
                                        <br />
                                        &#8226; Launchpad
                                        <br />
                                        &#8226; Token
                                        <br />
                                        &#8226; Airdrop
                                        <br />
                                        &#8226; Farm, pools
                                        <br />
                                        &#8226; Minigames
                                    </Typography>
                                </Box>
                            </FlexBox>
                            <FlexBox alignItems='center' gap='13px'>
                                <Line sx={{ backgroundColor: 'text.secondary' }} />
                                <Typography variant='body3Poppins' fontWeight='400' sx={{ color: 'text.secondary' }}>
                                    Create now
                                </Typography>
                            </FlexBox>
                        </ItemConfig>
                        <ItemConfig sx={{ backgroundColor: 'primary.main' }}>
                            <FlexBox flexDirection='column' gap='19px' alignItems='baseline'>
                                <WrapIcon sx={{ backgroundColor: '#82FFFF' }}>
                                    <Image src='/images/home/award.png' alt='award' width='29px' height='29px' />
                                </WrapIcon>
                                <Box>
                                    <Typography variant='body3Poppins' fontWeight='500' sx={{ color: 'secondary.main' }}>
                                        Participate
                                    </Typography>
                                    <Typography variant='body3Poppins' fontWeight='600' sx={{ color: 'text.secondary' }}>
                                        <br />
                                        &#8226; Token sales
                                        <br />
                                        &#8226; Lucky events
                                        <br />
                                        &#8226; Yield farming
                                        <br />
                                        &#8226; Bounty reward
                                    </Typography>
                                </Box>
                            </FlexBox>
                            <FlexBox alignItems='center' gap='13px'>
                                <Line sx={{ backgroundColor: 'text.secondary' }} />
                                <Typography variant='body3Poppins' fontWeight='400' sx={{ color: 'text.secondary' }}>
                                    Join now
                                </Typography>
                            </FlexBox>
                        </ItemConfig>
                    </FlexBox>
                </Box>
            </Container>
        </Wrapper>
    )
}

const FlexBox = styled(Box)`
    display: flex;
`
const Line = styled(Box)`
    max-width: 107px;
    width: 100%;
    height: 1px;
`
const Wrapper = styled(Box)`
    width: 100%;
    background-color: ${(props) => props.theme.palette.secondary.main};
    display: flex;
    flex-direction: column;
    gap: 60px;
    justify-content: center;
    position: relative;
    padding-top: 68px;
`
const ItemConfig = styled(Box)`
    width: 1px;
    height: 89px;
    padding: 25px 30px;
    max-width: 329px;
    width: 100%;
    aspect-ratio: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    ${props => props.theme.breakpoints.down("sm")} {
        max-width: 100%;
    }
`
const WrapIcon = styled(Box)`
    border-radius: 4px;
    padding: 9px;
    display: flex;
`
const WrapLogo = styled(Box)`
    position: absolute;
    right: 11px;
    top: -35px;

    ${props => props.theme.breakpoints.down("sm")} {
        display: none;
    }
`

export default MissionSection