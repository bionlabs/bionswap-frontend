/* eslint-disable @next/next/no-img-element */
import React from 'react'
import {
    Box,
    Container,
    useMediaQuery
} from '@mui/material'
import styled from '@emotion/styled'
import { footerMenuConfig, socialsConfig } from 'configs/menu/config'
import { useRouter } from 'next/router'


const Footer = ({ children }: any) => {
    const isMobile = useMediaQuery('(max-width:900px)')
    const router = useRouter()
    return (
        <Wrapper>
            <Container maxWidth='xl'>
                <WrapMenuItem sx={{
                    flexDirection: isMobile ? 'column' : 'row'
                }}>
                    <MenuItems>
                        <img src='logo.svg' alt='' width='200px' />
                        <Box mt={2} ml={2} gap={2} display="flex" alignItems="center" >
                            {
                                socialsConfig.map((item, index) => (
                                    <Box 
                                        key=''
                                        component='a' 
                                        href={item.href}
                                        onClick={(e:any) => {
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
                            <MenuItems key=''>
                                <Label>{footer.title}</Label>
                                {
                                    footer.items.map(item => (
                                        <Item
                                            key='' 
                                            href={item.href}
                                            onClick={(e:any) => {
                                                e.preventDefault();
                                                router.push(item.href);
                                            }}
                                        >
                                            {item.label}
                                        </Item>
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
    background-image: url('/images/footer_bg.png');
    display: flex;
    padding-top: 80px;
    padding-bottom: 80px;
    background-size: cover;
`
const WrapMenuItem = styled(Box)`
    display: flex;
    align-items: start;
    gap: 40px;
`
const MenuItems = styled(Box)`
    width: calc(100% / 4)
`
const Item = styled.a`
    cursor: pointer;
    display: block;
    color: #25273D;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 24px;
    margin-top: 8px;
    margin-bottom: 8px;
`
const Label = styled.p`
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 27px;
    color: #000000;
    margin: 0;
    margin-bottom: 8px;
`

export default Footer