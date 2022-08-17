/* eslint-disable @next/next/no-img-element */
import React from 'react'
import {
    Box,
    Container,
    styled,
    Typography,
    useMediaQuery
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
                        <img src='logo_dark.svg' alt='' width='200px' />
                        <Typography variant='subtitle2Poppins'
                            sx={{
                                color: 'extra.other.eight',
                                fontWeight: '400',
                                maxWidth: '191px'
                            }}>
                            Discover NFTs by category, track the latest drops, and follow the collections you love. Enjoy it!
                        </Typography>
                        <Box gap={2} display="flex" alignItems="center" >
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
                                    >
                                        <Box component='img' src={item.icon} alt={item.label} />
                                    </Box>
                                ))
                            }
                        </Box>
                    </MenuItems>
                    {
                        footerMenuConfig.map(footer =>
                            <MenuItems key={footer.title}>
                                <Typography variant='h6Poppins' color='extra.other.sixth' fontWeight='600'>
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
                                                color: 'extra.other.seventh',
                                                fontWeight: '400',
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
    background-color: ${(props) => props.theme.palette.background.paper};
    display: flex;
    padding-top: 80px;
    padding-bottom: 80px;
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
`

export default Footer