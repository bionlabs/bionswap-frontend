import {
    Box,
    Stack
} from '@mui/material'
import { menuConfig, MENU_HEIGHT } from 'configs/menu/config';
import { useRouter } from 'next/router';

type Anchor = 'top' | 'left' | 'bottom' | 'right'
interface Props {
    toggleDrawer?: any
    anchor?: Anchor
}

const MobileMenu = ({toggleDrawer , anchor}:Props) => {
    const router = useRouter()

    return (
        <Box sx={{ 
            width: anchor === 'top' || anchor === 'bottom' ? 'auto' : '350px', 
            minHeight:'100vh', 
            backgroundColor: theme => (theme.palette as any).extra.card.background,
            borderBottom: '1px solid #424242', 
            paddingTop: `${MENU_HEIGHT + 20}px`
        }}
        >
            <Stack direction='column' alignItems='start' width='100%'>
                <Stack direction='column' alignItems='start' onClick={toggleDrawer(anchor, false)}>
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
                </Stack>
            </Stack>
        </Box>
    )
}

export default MobileMenu