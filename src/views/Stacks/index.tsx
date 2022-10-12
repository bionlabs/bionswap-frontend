import Reward from './components/Reward'
import TotalAvailable from './components/TotalAvailable'
import StackBox from './components/StackBox'
import {
    Box,
    Container,
    useMediaQuery
} from '@mui/material'

const Stacks = () => {
    const isMobile = useMediaQuery('(max-width:700px)');
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'start',
                padding: '5vh 0',
                minHeight: '100vh',
                background: "url('/images/stackbg.png')",
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                objectFit: 'cover',
            }}>
            <Box display='flex' component='section' alignItems='center' flex='1'>
                <Container>
                    <Reward />
                    <Box display='flex' justifyContent='space-between' alignItems='center' gap={3} flexDirection={isMobile ? 'column' : 'row'}>
                        <Box>
                            <TotalAvailable title="TOTAL AVAILABLE BION STACKS " value="0.0" />
                            <Box sx={{
                                marginTop: '30px',
                                marginBottom: '36px'
                            }}>
                                <TotalAvailable title="TOTAL BUSD DEPOSITED ON BNB CHAIN" value="0.0" />
                            </Box>
                            <Box display='flex'>
                                <Box component='button'
                                    sx={{
                                        fontWeight: '600',
                                        fontSize: '14px',
                                        lineHeight: '27px',
                                        color: '#FFFFFF',
                                        background: '#E7A236',
                                        borderRadius: '20px',
                                        fontFamily: "'Inter', sans-serif",
                                        padding: '4.5px',
                                        maxWidth: '140px',
                                        width: '100%',
                                        border: '1px solid #E7A236',
                                        cursor: 'pointer',
                                        marginRight: '11px'
                                    }}>
                                    Buy BUSD
                                </Box>
                                <Box component='button'
                                    sx={{
                                        fontWeight: '600',
                                        fontSize: '14px',
                                        lineHeight: '27px',
                                        color: '#0b0b0b',
                                        background: 'transparent',
                                        borderRadius: '20px',
                                        fontFamily: "'Inter', sans-serif",
                                        padding: '4.5px',
                                        maxWidth: '140px',
                                        width: '100%',
                                        border: '1px solid #BCC2C6',
                                        cursor: 'pointer',
                                    }}>
                                    Learn more
                                </Box>
                            </Box>
                        </Box>
                        <Box>
                            <StackBox />
                        </Box>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default Stacks;
