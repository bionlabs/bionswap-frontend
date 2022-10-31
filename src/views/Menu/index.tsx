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
import { menuConfig, MENU_HEIGHT } from 'configs/menu/config'
import { useRouter } from 'next/router'
import { ConnectButton } from 'components'
import Link from 'next/link'
import { useChain, useSwitchNetwork } from 'hooks'
import { CHAIN_INFO_MAP } from 'configs/chain'
import { ChainId } from '@bionswap/core-sdk'

type Anchor = 'top' | 'left' | 'bottom' | 'right'

const Menu = ({ children }: any) => {
    const isMobile = useMediaQuery('(max-width:700px)');
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
            borderLeft: '1px solid #424242', 
            paddingTop: `${chainId !== 97 ? MENU_HEIGHT + 58 : MENU_HEIGHT}px`
        }}
        >
          <FlexBox flexDirection='column' width='100%'>
            {/* <FlexBox justifyContent='end' p='16px'>
                <IconButton onClick={toggleDrawer(anchor, false)} onKeyDown={toggleDrawer(anchor, false)}>
                    <HiX/>
                </IconButton>
            </FlexBox> */}
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
                                color: "gray.400",
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
                    <FlexBox alignItems='center' gap='42px'>
                        <Box sx={{cursor: 'pointer'}}>
                            <Link href='/'>
                                <img src='/alpha.svg' alt='BionDex' width='auto' />
                            </Link>
                        </Box>
                        {
                            !isMobile &&
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
                            <IconButton onClick={toggleDrawer('right', !state.right)} 
                                sx={{
                                    color:'#fff',
                                }}
                            >
                                {!state.right ? <HiMenu/> : <HiMenuAlt3/>}
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
                {
                    ((chainId !== 97) && isConnected && (router.asPath == '/launch' || router.asPath == '/launchpad')) &&
                    <WarningBanner>
                        <img src='/icons/warning.svg' alt='' width='16px' />
                        <Typography variant='captionPoppins' sx={{color: 'inherit'}}>
                            This feature is not yet supported on this chain for now. Please switch to BNB Testnet
                        </Typography>
                        <SwitchChainButton
                            variant='contained'
                            onClick={() => {
                                switchNetwork?.(97);
                            }}
                        >
                            Switch Network
                        </SwitchChainButton>
                    </WarningBanner>
                }
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

const WarningBanner = styled(Box)`
  display: flex;
  justify-content: center;
  width: 100%;
  color: ${prop => prop.theme.palette.warning.main};
  background-color: #14110A;
  padding: 15px;
  align-items: center;
  gap: 15px;
`
const SwitchChainButton = styled(Button)`
  background: #fff;
  color: #000;
  padding: 8px;
  line-height: 1;
  font-size: 12px;
  transition: .15s ease-in;
  :hover {
    background: #fff;
    opacity: .8;
  }
`

export default Menu