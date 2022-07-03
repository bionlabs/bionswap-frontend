import { NextPage } from "next";
import Head from "next/head";
import Menu from '../../views/Menu'
import Footer from '../../views/Footer'
import PrimaryButton from '../../components/PrimaryButton'
import Reward from './components/Reward'
import TotalAvailable from './components/TotalAvailable'
import StackBox from './components/StackBox'

import {
    Box,
    Container
} from '@mui/material'

const Pool: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Connect Wallet Demo</title>
                <meta
                    name="description"
                    content="Demo app part of a tutorial on adding RainbowKit to a React application"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <Menu />
                <Box display='flex' component='section' alignItems='center' flex='1'>
                    <Container>
                        {/* <Reward /> */}
                        <Box display='flex' justifyContent='space-between' alignItems='center'>
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
                                            color: '#25273D',
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
                <Footer />
            </main>
        </div>
    );
};

export default Pool;
