import { NextPage } from "next";
import Head from "next/head";
import Menu from '../../views/Menu'
import Footer from '../../views/Footer'
import TitleTag from '../../components/TitleTag'
import PrimaryButton from '../../components/PrimaryButton'
import ProjectItem from './components/ProjectItem'
import { crowdfundingConfig } from "./config";
import {
    Box,
    Container
} from '@mui/material'

const Crowdfunding: NextPage = () => {
    return (
        <Box component='section'>
            <Container>
                <Box sx={{
                    marginTop: '100px',
                    marginBottom: '78px'
                }}>
                    <Box component='h3'
                        sx={{
                            color: '#000000',
                            fontWeight: '600',
                            fontSize: '32px',
                            lineHeight: '150%',
                            marginTop: '0',
                            marginBottom: '8px',
                        }}>
                        🚀  Upcoming on BionicFox
                    </Box>
                    <Box component='p'
                        sx={{
                            fontWeight: '400',
                            fontSize: '18px',
                            lineHeight: '150%',
                            marginBottom: '20px',
                        }}>
                                Stake token to earn reward. See how it work ->
                    </Box>
                    <Box display='flex' gap={3} flexWrap='wrap'>
                        {
                            crowdfundingConfig?.map((item, idex) => (
                                <Box sx={{
                                    maxWidth: '340px',
                                    width: '100%'
                                }}>
                                    <ProjectItem data={item} />
                                </Box>

                            ))
                        }
                    </Box>
                </Box>
                <Box sx={{
                    marginBottom: '100px'
                }}>
                    <Box component='h3'
                        sx={{
                            color: '#000000',
                            fontWeight: '600',
                            fontSize: '32px',
                            lineHeight: '150%',
                            marginTop: '0',
                            marginBottom: '8px',
                        }}>
                        ✈️  Funded projects
                    </Box>
                    <Box component='p'
                        sx={{
                            fontWeight: '400',
                            fontSize: '18px',
                            lineHeight: '150%',
                            marginBottom: '20px',
                        }}>
                        We bring new technologies to our community
                    </Box>
                    <Box display='flex' gap={3} flexWrap='wrap'>
                        {
                            crowdfundingConfig?.map((item, idex) => (
                                <Box sx={{
                                    maxWidth: '340px',
                                    width: '100%'
                                }}>
                                    <ProjectItem data={item} />
                                </Box>
                            ))
                        }
                    </Box>
                </Box>
            </Container>

            <Box sx={{
                backgroundImage: 'url(/images/bg.png)',
                paddingTop: '76px',
                paddingBottom: '112px',
                textAlign: 'center',
                zIndex: '0',
                position: 'relative',
            }}>
                <Container>
                    <TitleTag title="📝 For projects" />
                    <Box sx={{
                        letterSpacing: '-1.28px',
                        color: '#25273D',
                        fontWeight: '600',
                        fontSize: '40px',
                        lineHeight: '76px',
                        fontFamily: 'Bai Jamjuree',
                        marginBottom: '12px',
                    }}>
                        Ready to be launch on Bionswap ?
                    </Box>
                    <Box component='p'
                        sx={{
                            fontSize: '18px',
                            lineHeight: '150%',
                            color: '#787A9B',
                            fontWeight: '500',
                            marginBottom: '43px',
                            maxWidth: '766px',
                            width: '100%',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                        }}>
                        BionicFox is very confident in saying that we have a lot of experience in developing dApp with many functions like: Swap, Farm, Pool, NFT Marketplace, Launchpad,...
                    </Box>
                    <Box sx={{
                        maxWidth: '248px',
                        width: '100%',
                        margin: 'auto',
                    }}>
                        <PrimaryButton label="Apply now ->" />
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default Crowdfunding;
