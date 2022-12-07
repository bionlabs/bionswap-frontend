/* eslint-disable @next/next/no-img-element */
import React , {useState , useEffect} from 'react'
import {
    Box,
    Button,
    Drawer,
    IconButton,
    styled,
    Typography
} from '@mui/material'
import {HiMenu , HiX , HiMenuAlt3} from 'react-icons/hi'
import {IoClose} from 'react-icons/io5'
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
import MobileMenu from './MobileMenu'
import useOnScroll from 'hooks/useOnScroll'
import useMediaQuery from 'hooks/useMediaQuery'

type Anchor = 'top' | 'left' | 'bottom' | 'right'

const Menu = ({ children }: any) => {
    const {isMobile , isTablet , isDesktop} = useMediaQuery();

    const router = useRouter()
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
      })
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    // const open = Boolean(anchorEl);
    // const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    // setAnchorEl(event.currentTarget);
    // };
    // const handleClose = () => {
    // setAnchorEl(null);
    // };


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

    // const { switchNetwork } = useSwitchNetwork({})
    // const {chainId , isConnected} = useChain()
    const scrollDir = useOnScroll();

    

    return (
        <>
            <MenuContainer>
                <StyledContained
                    sx={{
                        backgroundColor: scrollDir > 10 ? theme => (theme.palette as any).background.default : 'transparent',
                        boxShadow: scrollDir > 10 ? 'rgba(149, 157, 165, 0.2) 0px 8px 24px' : 'none',
                    }}
                >
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
                            !isTablet &&
                            <Box alignItems="center" display="flex" gap={0}>
                                {
                                    menuConfig.map(item =>
                                        <Box 
                                            key=''
                                            component="a"
                                            href={item.href}
                                            sx={{
                                                color: "text.secondary",
                                                fontSize: '14px',
                                                transition: '.12s ease-in',
                                                padding: '8px 15px',
                                                borderRadius: '4px',
                                                backgroundColor: 'transparent',
                                                ':hover': {
                                                    backgroundColor: theme => (theme.palette as any).extra.button.backgroundGreenOpacity,
                                                    color: "primary.main",
                                                },
                                                '&.active': {
                                                    color: "primary.main",
                                                    backgroundColor: theme => (theme.palette as any).extra.button.backgroundGreenOpacity
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
                        {isMobile ?
                            <>
                                <ChainSelect/>
                                <IconButton onClick={toggleDrawer('top', !state.top)} 
                                    sx={{
                                        color:'#fff',
                                    }}
                                >
                                    {!state.top ? <HiMenu/> : <IoClose/>}
                                </IconButton>
                            </>
                            :
                            isTablet ?
                                <>
                                    <ChainSelect/>
                                    <ConnectButton/>
                                    <IconButton onClick={toggleDrawer('top', !state.top)} 
                                        sx={{
                                            color:'#fff',
                                        }}
                                    >
                                        {!state.top ? <HiMenu/> : <IoClose/>}
                                    </IconButton>
                                </>
                            :
                                <>
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
                    <MobileMenu
                        anchor='top'
                        toggleDrawer={toggleDrawer}
                    />
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
    z-index: ${(prop) => prop.theme.zIndex.drawer + 1};
    top: 0;
    left: 0;
    width: 100%;
`
const StyledContained = styled(Box)`
    padding: 0 24px;
    display: flex;
    width: 100%;
    height: ${MENU_HEIGHT}px;
    align-items: center;
    justify-content: space-between;
    // background-color: ${props => (props.theme.palette as any).extra.card.background};
`
const FlexBox = styled(Box)`
    display: flex;
`
const LaunchpadButton = styled(Button)`
  border-radius: 4px;
  box-shadow: none;
  text-transform: none;
  font-family: inherit;
  min-width: fit-content;
  font-weight: 500;
  align-items: center;
  height: 40px;
  gap: 10px;
  background-color: ${props => props.theme.palette.secondary.main};
  color: ${props => props.theme.palette.text.primary};
  transition: 0.15s ease-in;
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
  background-color: ${props => (props.theme.palette as any).extra.card.background};
  color: ${props => props.theme.palette.text.primary};
  padding: 16px;
  border-top: 1px solid ${props => props.theme.palette.gray[700]};
`

export default Menu