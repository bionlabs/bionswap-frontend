import {
    Autocomplete,
    Box,
    Container,
    TextField,
    styled,
    useMediaQuery
} from '@mui/material'
import SelectTokens from './components/SelectTokens';
import dynamic from "next/dynamic";
import Image from 'next/image';
export const SwapView = dynamic(() => import("./components/Swap"), {
    ssr: false,
});

const Trade = () => {
    return (
        <Section>
            <Container maxWidth="lg">
                <Box sx={{
                    display: 'flex',
                    gap: { xs: '30px', md: '16px' },
                    flexDirection: { xs: 'column', md: 'row' },
                }}>
                    <Box sx={{
                        width: { xs: '100%', md: '65%' }
                    }}>
                        <Box sx={{
                            display: 'flex',
                            gap: { xs: '20px', md: '83px' },
                            flexDirection: { xs: 'column', md: 'row' },
                        }}>
                            <Box>
                                <SelectTokens />
                                <TokenValue mt='4px'>$0.503</TokenValue>
                            </Box>
                            <Box display='flex' gap='24px'>
                                <WrapItem>
                                    <Title>24h Change</Title>
                                    <Value sx={{ color: '#2BB673 !important' }}>+0.97%</Value>
                                </WrapItem>
                                <Line />
                                <WrapItem>
                                    <Title>Liquidity</Title>
                                    <Value>$204.14K</Value>
                                </WrapItem>
                                <Line />
                                <WrapItem>
                                    <Title>Total Supply</Title>
                                    <Value>500.000.000</Value>
                                </WrapItem>
                            </Box>
                        </Box>
                        <Box mt='33px'>
                            <Image src="/images/Screen Shot 2022-08-07 at 01.45 1.png" alt='Screen Shot' width='100%' height='100%' objectFit={'contain'} />
                        </Box>
                    </Box>
                    <Box sx={{
                        width: { xs: '100%', md: '35%' }
                    }}>
                        <Box display='flex' justifyContent='space-between' mt='25px'>
                            <SwapLabel>Swap Token</SwapLabel>
                            <Image src='/images/trade/Setting.png' alt='Setting' width={21} height={21} />
                        </Box>
                        <Box mt='30px'>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={top100Films}
                                sx={{
                                    marginBottom: '22px',

                                    'input': {
                                        fontFamily: "'Poppins', sans-serif",
                                        color: '#ffffff',
                                        fontWeight: '400',
                                        fontSize: '14px',
                                        lineHeight: '20px',
                                        padding: '17px 5px !important'
                                    }
                                }}
                                renderInput={(params) => <TextField {...params} variant="standard" placeholder="Enter token name / address..." />}
                            />
                            <SwapView />
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Section>
    );
};

const Section = styled(Box)`
    padding: 8vh 0;
    min-height: 100vh;
    background-color: ${props => props.theme.palette.primary.dark};
`
const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
]

const WrapItem = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 4px;
`
const Title = styled(Box)`
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    color: #A8B0B9;
`
const Value = styled(Box)`
    font-family: 'Poppins', sans-serif;
    color: #FFFFFF;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
`
const Line = styled(Box)`
    background: #2B3247;
    height: 36px;
    width: 1px;
`
const TokenValue = styled(Box)`
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    font-size: 16px;
    line-height: 18px;
    color: #00EAFF;
`
const SwapLabel = styled(Box)`
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    color: #F8F9F9;
`

export default Trade;
