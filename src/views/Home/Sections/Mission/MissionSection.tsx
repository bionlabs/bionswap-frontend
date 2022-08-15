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
        icon: '/images/home/arrange-circle.png',
        label: 'Swap token with low gas fee and  fast. transaction',
        action: 'Swap now',
        url: '',
        bgColor: 'background.default',
        bgIcon: 'extra.other.second',
        fontColor: 'text.primary'
    },
    {
        icon: '/images/home/additem.png',
        label: 'Create token, projects token sale or air drop. all with a single click',
        action: 'Create now',
        url: '',
        bgColor: 'background.paper',
        bgIcon: 'extra.other.third',
        fontColor: 'text.secondary'
    },
    {
        icon: '/images/home/award.png',
        label: 'Participate on all of our event such as ido, lucky events',
        action: 'Join now',
        url: '',
        bgColor: 'extra.swapButton.background',
        bgIcon: 'extra.other.fourth',
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
                            What’s possible with Bionswap?
                        </Typography>
                        <Typography variant='h3'>
                            Bionswap is a decentralized exchange native to BNB Chain and other chains
                        </Typography>
                    </FlexBox>
                </FlexBox>
                <FlexBox>
                    <ItemConfig>
                        <FlexBox flexDirection='column' gap='19px'>
                            <Box>
                                <Image src='/images/home/arrange-circle.png' alt='Swap token with low gas fee and  fast. transaction' width='29px' height='29px' />
                            </Box>
                            <Typography variant='bodyPoppins' fontWeight='600'>
                                Swap token with low gas fee and  fast. transaction
                            </Typography>
                        </FlexBox>
                        <FlexBox alignItems='center' gap='13px'>
                            <Line sx={{ backgroundColor: '#FFFFFF' }} />
                            <Typography variant='body3Poppins' fontWeight='400'>
                                Swap now
                            </Typography>
                        </FlexBox>
                    </ItemConfig>
                    <ItemConfig sx={{}}>
                        <FlexBox flexDirection='column' gap='19px'>
                            <Box>
                                <Image src='/images/home/arrange-circle.png' alt='Swap token with low gas fee and  fast. transaction' width='29px' height='29px' />
                            </Box>
                            <Box>
                                <Typography variant='body3Poppins' fontWeight='500'>
                                    Create
                                </Typography>
                                <Typography variant='body3Poppins' fontWeight='600'>
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
                            <Line sx={{ backgroundColor: '#FFFFFF' }} />
                            <Typography variant='body3Poppins' fontWeight='400'>
                                Swap now
                            </Typography>
                        </FlexBox>
                    </ItemConfig>
                    <ItemConfig sx={{}}>
                        <FlexBox flexDirection='column' gap='19px'>
                            <Box>
                                <Image src='/images/home/arrange-circle.png' alt='Swap token with low gas fee and  fast. transaction' width='29px' height='29px' />
                            </Box>
                            <Box>
                                <Typography variant='body3Poppins' fontWeight='500'>
                                    Create
                                </Typography>
                                <Typography variant='body3Poppins' fontWeight='600'>
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
                            <Line sx={{ backgroundColor: '#FFFFFF' }} />
                            <Typography variant='body3Poppins' fontWeight='400'>
                                Swap now
                            </Typography>
                        </FlexBox>
                    </ItemConfig>
                    {/* {
                        config.map((item, index) => (
                            <ItemConfig key={item.label}>
                                <FlexBox flexDirection='column' gap='19px'>
                                    <Box>
                                        <Image src={item.icon} alt={item.label} width='29px' height='29px' />
                                    </Box>
                                    <Typography variant='body3Poppins' fontWeight=''>
                                       {item.label}
                                    </Typography>
                                </FlexBox>
                                <FlexBox gap='13px'>

                                </FlexBox>
                            </ItemConfig>
                        ))
                    } */}
                </FlexBox>
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
`
const ItemConfig = styled(Box)`
    width: 1px;
    height: 89px;
    padding: 25px 30px;
    max-width: 329px;
    width: 100%;
    aspect-ratio: 1;
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

export default MissionSection