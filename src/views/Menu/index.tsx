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
    MenuItem,
    Typography
} from '@mui/material'
import {HiMenu , HiX , HiMenuAlt3} from 'react-icons/hi'
import {BsThreeDots} from 'react-icons/bs'
import {TiPlus} from 'react-icons/ti'
import { menuConfig, MENU_HEIGHT } from 'configs/menu/config'
import { useRouter } from 'next/router'
import { ConnectButton } from 'components'
import Link from 'next/link'
import { useChain, useSwitchNetwork } from 'hooks'
import { CHAIN_INFO_MAP } from 'configs/chain'
import { ChainId } from '@bionswap/core-sdk'
import ChainSelect from 'components/ConnectButton/ChainSelect'

type Anchor = 'top' | 'left' | 'bottom' | 'right'

const Menu = ({ children }: any) => {
    const isMobile = useMediaQuery('(max-width:700px)');
    const isTablet = useMediaQuery('(max-width:900px)');
    const isDesktop = useMediaQuery('(max-width:1280px)');

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

    const { switchNetwork } = useSwitchNetwork({})
    const {chainId , isConnected} = useChain()

    const list = (anchor: Anchor) => (
        <Box sx={{ 
            width: anchor === 'top' || anchor === 'bottom' ? 'auto' : '350px', 
            minHeight:'100vh', 
            backgroundColor: theme => theme.palette.gray[900],
            borderBottom: '1px solid #424242', 
            paddingTop: `${MENU_HEIGHT + 20}px`
        }}
        >
          <FlexBox flexDirection='column' width='100%'>
            <FlexBox flexDirection='column' onClick={toggleDrawer(anchor, false)}>
                {
                    menuConfig.map(item =>
                        <Box 
                            key=''
                            component="a"
                            href={item.href}
                            sx={{
                                color: "gray.400",
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '16px 24px',
                                '&.active': {
                                    color: "primary.main",
                                }
                            }}
                            className={router.pathname == item.href ? "active" : ""}
                            onClick={(e:any) => {
                                e.preventDefault();
                                if(item.newWindow) window.open(item.href);
                                else router.push(item.href);
                            }}
                        >
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
                    <FlexBox alignItems='center' gap='42px'>
                        <Box sx={{cursor: 'pointer'}}>
                            {
                                isMobile ?
                                <Link href='/'>
                                    <img src='/logo.png' alt='BionSwap' width='40px' />
                                </Link>
                                :
                                <Link href='/'>
                                    <img src='/alpha.svg' alt='BionSwap' width='auto' />
                                </Link>
                            }
                        </Box>
                        {
                            !isDesktop &&
                            <Box alignItems="center" display="flex" gap={0}>
                                {
                                    menuConfig.slice(0, 4).map(item =>
                                        <Box 
                                            key=''
                                            component="a"
                                            href={item.href}
                                            sx={{
                                                color: "gray.400",
                                                fontSize: '14px',
                                                transition: '.15s ease-in',
                                                padding: '8px 15px',
                                                borderRadius: '4px',
                                                backgroundColor: 'transparent',
                                                ':hover': {
                                                    backgroundColor: 'rgba(61, 255, 255, 0.1)',
                                                    color: "primary.main",
                                                },
                                                '&.active': {
                                                    color: "primary.main",
                                                    backgroundColor: 'rgba(61, 255, 255, 0.1)'
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
                                {
                                    menuConfig.length > 4 &&
                                    <IconButton 
                                        sx={{
                                            color: theme => theme.palette.gray[400],
                                        }}
                                        onClick={handleClick}
                                    >
                                        <BsThreeDots/>
                                    </IconButton>
                                }
                                
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
                                        menuConfig.slice(4, menuConfig.length).map(item =>
                                            <MenuItem 
                                                key=''
                                                component="a"
                                                href={item.href}
                                                sx={{
                                                    color: "gray.400",
                                                    fontWeight: '500',
                                                    fontSize: '16px',
                                                    padding: '10px 20px',
                                                    transition: '.15s ease-in',
                                                    ':hover': {
                                                        color: 'primary.main',
                                                    },
                                                    '&.active': {
                                                        color: "primary.main",
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
                        {isMobile ?
                            <>
                                <LaunchpadButton
                                    variant='contained'
                                    href='/launch'
                                    onClick={(e) => {
                                        e.preventDefault();
                                        router.push('/launch')
                                    }}
                                >
                                    <TiPlus/>
                                </LaunchpadButton>
                                <ChainSelect/>
                                <IconButton onClick={toggleDrawer('top', !state.top)} 
                                    sx={{
                                        color:'#fff',
                                    }}
                                >
                                    {!state.top ? <HiMenu/> : <HiMenuAlt3/>}
                                </IconButton>
                            </>
                            :
                            isTablet ?
                                <>
                                    <LaunchpadButton
                                        variant='contained'
                                        href='/launch'
                                        onClick={(e) => {
                                            e.preventDefault();
                                            router.push('/launch')
                                        }}
                                    >
                                        <TiPlus/>
                                    </LaunchpadButton>
                                    <ChainSelect/>
                                    <ConnectButton/>
                                    <IconButton onClick={toggleDrawer('top', !state.top)} 
                                        sx={{
                                            color:'#fff',
                                        }}
                                    >
                                        {!state.top ? <HiMenu/> : <HiMenuAlt3/>}
                                    </IconButton>
                                </>
                            :
                            isDesktop ?
                                <>
                                    <LaunchpadButton
                                        variant='contained'
                                        sx={{
                                            'svg':{
                                                width: '15px',
                                                height: '15px'
                                            }
                                        }}
                                        href='/launch'
                                        onClick={(e) => {
                                            e.preventDefault();
                                            router.push('/launch')
                                        }}
                                    >
                                        Launch <TiPlus/>
                                    </LaunchpadButton>
                                    <ChainSelect/>
                                    <ConnectButton/>
                                    <IconButton onClick={toggleDrawer('top', !state.top)} 
                                        sx={{
                                            color:'#fff',
                                        }}
                                    >
                                        {!state.top ? <HiMenu/> : <HiMenuAlt3/>}
                                    </IconButton>
                                </>
                            :
                                <>
                                    <LaunchpadButton
                                        variant='contained'
                                        sx={{
                                            'svg':{
                                                width: '15px',
                                                height: '15px'
                                            }
                                        }}
                                        href='/launch'
                                        onClick={(e) => {
                                            e.preventDefault();
                                            router.push('/launch')
                                        }}
                                    >
                                        Launch <TiPlus/>
                                    </LaunchpadButton>
                                    <ChainSelect/>
                                    <ConnectButton/>
                                </>
                        }
                    </FlexBox>
                </StyledContained>
                {
                    isMobile &&
                    <BottomContainer>
                        <ConnectButton/>
                    </BottomContainer>
                }
                <Drawer
                    anchor={'top'}
                    open={state['top']}
                    onClose={toggleDrawer('top', false)}
                >
                    {list('top')}
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
    z-index: ${(prop) => prop.theme.zIndex.drawer + 1};
    width: 100%;
`
const StyledContained = styled(Box)`
    padding: 0 16px;
    display: flex;
    width: 100%;
    height: ${MENU_HEIGHT}px;
    align-items: center;
    justify-content: space-between;
    background-color: ${props => props.theme.palette.gray[900]};
    border-bottom: 1px solid ${props => props.theme.palette.gray[700]};
`
const FlexBox = styled(Box)`
    display: flex;
`
const LaunchpadButton = styled(Button)`
  border-radius: 4px;
  padding: 8.5px 20px;
  box-shadow: none;
  text-transform: none;
  font-family: inherit;
  font-weight: 500;
  align-items: center;
  height: 40px;
  gap: 10px;
  background-color: ${props => props.theme.palette.secondary.main};
  color: ${props => props.theme.palette.text.primary};
  transition: 0.15s ease-in;
  svg {
    width: 20px;
    height: 20px;
  }
  :hover {
    background-color: ${props => props.theme.palette.secondary.main};
    box-shadow: none;
  }
`;
const BottomContainer = styled(Box)`
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: ${(prop) => prop.theme.zIndex.drawer + 1};
  width: 100%;
  background-color: ${props => props.theme.palette.gray[900]};
  color: ${props => props.theme.palette.text.primary};
  padding: 16px;
  border-top: 1px solid ${props => props.theme.palette.gray[700]};
`

export default Menu