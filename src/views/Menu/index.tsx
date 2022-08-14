/* eslint-disable @next/next/no-img-element */
import React from 'react'
import {
    Box,
    Button,
    Container,
    Drawer,
    IconButton,
    useMediaQuery,
    styled
} from '@mui/material'
import {HiMenu , HiX} from 'react-icons/hi'
import {BsThreeDots} from 'react-icons/bs'
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
        <Box sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : '300px', minHeight:'100vh', backgroundColor: '#081319', borderLeft: '1px solid #424242'}}>
          <FlexBox flexDirection='column' width='100%'>
            <FlexBox justifyContent='end' p='16px'>
                <IconButton onClick={toggleDrawer(anchor, false)} onKeyDown={toggleDrawer(anchor, false)}>
                    <HiX/>
                </IconButton>
            </FlexBox>
            <Box p='16px'>
                <ConnectButton/>
            </Box>
            <FlexBox flexDirection='column' onClick={toggleDrawer(anchor, false)}>
                {
                    menuConfig.map(item =>
                        <Box 
                            key=''
                            component="a"
                            target={item.newWindow ? '_blank' : '_self'}
                            href={item.href}
                            sx={{
                                color: "extra.header.color",
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
                                    color: "extra.header.colorActive",
                                }
                            }}
                            className={router.pathname == item.href ? "active" : ""}
                            onClick={(e:any) => {
                                e.preventDefault();
                                if(item.newWindow) window.open(item.href);
                                else router.push(item.href);
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
                <StyledContained>
                    <FlexBox alignItems='center' gap='60px'>
                        <Box component="a" href='/'>
                            <img src='/logo.svg' alt='BionDex' width='auto' />
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
                                                color: "extra.header.color",
                                                fontWeight: '500',
                                                fontSize: '16px',
                                                transition: '.15s ease-in',
                                                ':hover': {
                                                    color: 'extra.header.colorActive',
                                                },
                                                '&.active': {
                                                    color: "extra.header.colorActive",
                                                }
                                            }}
                                            onClick={(e:any) => {
                                                e.preventDefault();
                                                if(item.newWindow) window.open(item.href);
                                                else router.push(item.href);
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
                    <FlexBox gap='16px'>
                        {!isMobile &&
                            <ConnectButton/>
                        }
                        <IconButton sx={{
                            color:'#fff',
                            backgroundColor: '#0b0b0b',
                            borderRadius: '12px'
                        }}>
                            <BsThreeDots/>
                        </IconButton>
                        {
                            isMobile && 
                            <IconButton onClick={toggleDrawer('right', true)} 
                                sx={{
                                    color:'#fff',
                                    backgroundColor: '#0b0b0b',
                                    borderRadius: '12px'
                                }}
                            >
                                <HiMenu/>
                            </IconButton>
                        }
                    </FlexBox>
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
    position: relative;
    z-index: 1100;
    width: 100%;
    background-color: ${props => (props.theme.palette as any).extra.header.background};
    border-bottom: 1px solid ${props => (props.theme.palette as any).extra.border.color};
`
const StyledContained = styled(Box)`
    padding: 0 16px;
    display: flex;
    width: 100%;
    min-height: 78px;
    align-items: center;
    justify-content: space-between;
`
const FlexBox = styled(Box)`
    display: flex;
`

export default Menu