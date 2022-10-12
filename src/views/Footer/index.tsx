/* eslint-disable @next/next/no-img-element */
import React from 'react'
import {
    Box,
    Container,
    styled,
    SvgIcon,
    Typography,
    useMediaQuery,
} from '@mui/material'
import { footerMenuConfig, socialsConfig } from 'configs/menu/config'
import { useRouter } from 'next/router'


const Footer = ({ children }: any) => {
    const isMobile = useMediaQuery('(max-width:900px)')
    const router = useRouter()
    return (
        <Wrapper>
            <Container maxWidth='lg'>
                <WrapMenuItem sx={{
                    flexDirection: isMobile ? 'column' : 'row'
                }}>
                    <MenuItems>
                        <img src='alpha.svg' alt='' width='200px' />
                        <Typography variant='subtitle2Poppins'
                            sx={{
                                color: 'gray.400',
                                fontWeight: '400',
                                maxWidth: '300px'
                            }}>
                            BionSwap is a platform that allows Project Owners to self-launch their projects and a Multichain Decentralize Exchange.
                        </Typography>
                        <Box gap={2} display="flex" alignItems="center" sx={{
                            color: 'gray.400'
                        }}>
                            {
                                socialsConfig.map((item, index) => (
                                    <Box
                                        key={item.label}
                                        component='a'
                                        href={item.href}
                                        onClick={(e: any) => {
                                            e.preventDefault();
                                            router.push(item.href);
                                        }}
                                        sx={{
                                            '&:hover':{
                                                color: 'primary.main',
                                                transform: 'translateY(-5px)'
                                            }
                                        }}
                                    >
                                        {item.icon}
                                    </Box>
                                ))
                            }
                        </Box>
                    </MenuItems>
                    {
                        footerMenuConfig.map(footer =>
                            <MenuItems key={footer.title}>
                                <Typography variant='h6Poppins' color='text.primary' fontWeight='600'>
                                    {footer.title}
                                </Typography>
                                {
                                    footer.items.map(item => (
                                        <Typography variant='body3Poppins'
                                            component='a'
                                            key={item.label}
                                            href={item.href}
                                            onClick={(e: any) => {
                                                e.preventDefault();
                                                router.push(item.href);
                                            }}
                                            sx={{
                                                color: 'gray.400',
                                                fontWeight: '400',
                                                '&:hover':{
                                                    color: 'primary.main',
                                                    transform: 'translateX(5px)'
                                                }
                                            }}
                                        >
                                            {item.label}
                                        </Typography>
                                    ))
                                }
                            </MenuItems>
                        )
                    }
                </WrapMenuItem>
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled(Box)`
    width: 100%;
    background-color: ${(props) => props.theme.palette.background.default};
    display: flex;
    padding-top: 80px;
    padding-bottom: 80px;
    border-top: 1px solid #424242;
`
const WrapMenuItem = styled(Box)`
    display: flex;
    align-items: start;
    gap: 40px;
    justify-content: space-between;
`
const MenuItems = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
    * {
        transition: .1s ease-in;
    }
`

export default Footer