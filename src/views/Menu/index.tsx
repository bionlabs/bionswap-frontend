/* eslint-disable @next/next/no-img-element */
import React from 'react'
import {
    Box,
    Button,
    Container,
    Drawer,
    IconButton,
    useMediaQuery
} from '@mui/material'
import styled from '@emotion/styled'
import {HiMenu , HiX} from 'react-icons/hi'
import { menuConfig } from 'configs/menu/config'
import { useRouter } from 'next/router'
import { ConnectButton } from 'components'

type Anchor = 'top' | 'left' | 'bottom' | 'right'

const Menu = ({ children }: any) => {
    const isMobile = useMediaQuery('(max-width:1155px)');
    const router = useRouter()
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
      })

    const toggleDrawer = (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
        return;
    }
        setState({ ...state, [anchor]: open });
    }

    const list = (anchor: Anchor) => (
        <Box
          sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : '95vw' ,minHeight:'100vh'}}
        >
          <FlexBox flexDirection='column' width='100%'>
            <FlexBox justifyContent='end' p='16px'>
                <IconButton onClick={toggleDrawer(anchor, false)} onKeyDown={toggleDrawer(anchor, false)}>
                    <HiX/>
                </IconButton>
            </FlexBox>
            <Box p='16px'>
                <ConnectButton/>
            </Box>
            <FlexBox flexDirection='column'>
                {
                    menuConfig.map(item =>
                        <Box 
                            key=''
                            component="a"
                            href={item.href}
                            sx={{
                                color: "#0C1116",
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '16px',
                                'svg':{
                                    fill: '#707a8a',
                                    width: '24px',
                                    height: '24px'
                                },
                                '&.active': {
                                    color: "#25273D",
                                }
                            }}
                            className={router.pathname == item.href ? "active" : ""}
                            onClick={(e:any) => {
                                e.preventDefault();
                                router.push(item.href);
                            }}
                        >
                            {item.icon}
                            {item.label}
                        </Box>
                    )
                }
            </FlexBox>
          </FlexBox>
        </Box>
      );

    return (
        <>
            <MenuContainer>
                <StyledContained maxWidth='xl'>
                    <FlexBox alignItems='center' gap='60px'>
                        <Box component="a" href='/'>
                            <img src='logo.svg' alt='BionDex' width='200px' />
                        </Box>
                        {
                            !isMobile &&
                            <Box alignItems="center" display="flex" gap={4}>
                                {
                                    menuConfig.map(item =>
                                        <Box 
                                            key=''
                                            component="a"
                                            href={item.href}
                                            sx={{
                                                color: "#787A9B",
                                                fontWeight: '600',
                                                fontSize: '16px',
                                                transition: '.15s ease-in',
                                                ':hover': {
                                                    color: '#0C1116',
                                                },
                                                '&.active': {
                                                    color: "#25273D",
                                                }
                                            }}
                                            onClick={(e:any) => {
                                                e.preventDefault();
                                                router.push(item.href);
                                            }}
                                            className={router.pathname == item.href ? "active" : ""}
                                        >
                                            {item.label}
                                        </Box>
                                    )
                                }
                            </Box>
                        }
                    </FlexBox>
                    {
                        !isMobile ? 
                        <>
                            <ConnectButton/>
                        </>
                        :
                        <>
                            <IconButton onClick={toggleDrawer('right', true)} sx={{color:'#0C1116'}}>
                                <HiMenu/>
                            </IconButton>
                        </>
                    }
                </StyledContained>
                <Drawer
                    anchor={'right'}
                    open={state['right']}
                    onClose={toggleDrawer('right', false)}
                >
                    {list('right')}
                </Drawer>
            </MenuContainer>
            <Box>
                {children}
            </Box>
        </>
    )
}

const MenuContainer = styled(Box)`
    position: fixed;
    z-index: 1100;
    width: 100%;
    background-color: rgba(255,255,255);
    top: 0;
    left: 0;
`
const StyledContained = styled(Container)`
    display: flex;
    min-height: 78px;
    align-items: center;
    justify-content: space-between;
`
const FlexBox = styled(Box)`
    display: flex;
`
const ChainButton = styled(Button)`
    border-radius: 35px;
    padding: 12px 25px;
    height: fit-content;
    text-transform: none;
    font-family: inherit;
    font-size: 16px;
    font-weight: 600;
    align-items: center;
    border: 1px solid #25273D;
    color: #25273D;
    width: 100%;
    transition: 0.15s ease-in;
    gap: 8px;
    :hover {
        border: 1px solid #25273D;
        opacity: .9;
    }
`
const ConnectWalletButton = styled(Button)`

`


export default Menu