/* eslint-disable @next/next/no-img-element */
import React , {useState} from 'react'
import {
    Box,
    Button,
    Drawer,
    IconButton,
    useMediaQuery,
    styled,
    Menu as MuiMenu,
    MenuProps,
    MenuItem
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
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
    setAnchorEl(null);
    };


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
                            <Box alignItems="center" display="flex" gap={0}>
                                {
                                    menuConfig.slice(0, 5).map(item =>
                                        <Box 
                                            key=''
                                            component="a"
                                            href={item.href}
                                            sx={{
                                                color: "extra.header.color",
                                                fontWeight: '500',
                                                fontSize: '16px',
                                                transition: '.15s ease-in',
                                                padding: '8px 20px',
                                                borderRadius: '4px',
                                                backgroundColor: 'transparent',
                                                ':hover': {
                                                    backgroundColor: 'gray.800',
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
                                <IconButton 
                                    sx={{
                                        color:'#fff',
                                    }}
                                    onClick={handleClick}
                                >
                                    <BsThreeDots/>
                                </IconButton>
                                <MuiMenu
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    sx={{
                                        '.MuiPaper-root': {
                                            backgroundColor: '#081319!important',
                                            border: "1px solid #424242", borderRadius: '8px',
                                            minWidth: '200px'
                                        }
                                    }}
                                >
                                    {
                                        menuConfig.slice(5, menuConfig.length).map(item =>
                                            <MenuItem 
                                                key=''
                                                component="a"
                                                href={item.href}
                                                sx={{
                                                    color: "extra.header.color",
                                                    fontWeight: '500',
                                                    fontSize: '16px',
                                                    padding: '10px 20px',
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
                                                    handleClose();
                                                }}
                                                className={router.pathname == item.href ? "active" : ""}
                                                disableRipple
                                            >
                                                {item.label}
                                            </MenuItem>
                                        )
                                    }
                                </MuiMenu>
                            </Box>
                        }
                    </FlexBox>
                    <FlexBox gap='16px'>
                        {!isMobile &&
                            <>
                                {/* <LaunchpadButton>
                                    Create +
                                </LaunchpadButton> */}
                                <ConnectButton/>
                            </>
                        }
                        
                        {
                            isMobile && 
                            <IconButton onClick={toggleDrawer('right', true)} 
                                sx={{
                                    color:'#fff',
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
const LaunchpadButton = styled(Button)`
  border-radius: 4px;
  min-width: fit-content;
  padding: 8.5px 48px;
  box-shadow: none;
  text-transform: none;
  font-family: inherit;
  font-weight: 600;
  align-items: center;
  min-height: 41px;
  background-color: rgba(205, 61, 255, 0.1);
  color: #9A6AFF;
  transition: 0.15s ease-in;
  line-height: 1;
  svg {
    width: 20px;
    height: 20px;
  }
  :hover {
    background-color: rgba(205, 61, 255, 0.15);
    box-shadow: none;
  }
`;

export default Menu