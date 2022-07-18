/* eslint-disable react/jsx-key */
import TitleTag from 'components/TitleTag'
import PrimaryButton from 'components/PrimaryButton'
import ProjectItem from './components/ProjectItem'
import { crowdfundingConfig } from "./config";
import {
    Box,
    Container,
    useMediaQuery
} from '@mui/material'
import styled from "@emotion/styled";
import Link from 'next/link';

const Crowdfunding = () => {
    const isMobile = useMediaQuery('(max-width:767px)');

    const Section = styled(Box)`
        padding-top: ${isMobile ? '20px' : '78px'};
        background-image: url('/images/crowdfunding_bg.png');
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
    `
    const Title = styled(Box)`
        color: #000000;
        font-weight: 600;
        font-size: ${isMobile ? '25px' : '32px'};
        line-height: 150%;
        margin-top: 0;
        margin-bottom: 8px;
    `
    const SubContent = styled(Box)`
        font-weight: 400;
        font-size: ${isMobile ? '14px' : '18px'};
        line-height: 160%;
        margin-bottom: 20px;

        a {
            color: #E7A236;
        }
    `
    const WrapItems = styled(Box)`
        display: flex;
        gap: 32px;
        flex-wrap: wrap;
        ${isMobile ? 'justify-content: center;' : ''}
    `
    const Items = styled(Box)`
        min-width: 340px;
        max-width: calc(94% / 3);
        width: 100%;
    `

    return (
        <Section component='section'>
            <Container>
                <Box sx={{
                    marginBottom: '78px'
                }}>
                    <Title>
                        🚀  Upcoming on BionicFox
                    </Title>
                    <SubContent component='p'>
                        Stake token to earn reward. <Link href='/'>See how it work -&gt;</Link>
                    </SubContent>
                    <WrapItems>
                        {
                            crowdfundingConfig?.map((item, idex) => (
                                <Items>
                                    <ProjectItem data={item} />
                                </Items>
                            ))
                        }
                    </WrapItems>
                </Box>
                <Box sx={{
                    marginBottom: '100px'
                }}>
                    <Title>
                        ✈️  Funded projects
                    </Title>
                    <SubContent component='p'>
                        We bring new technologies to our community
                    </SubContent>
                    <WrapItems>
                        {
                            crowdfundingConfig?.map((item, idex) => (
                                <Items>
                                    <ProjectItem data={item} />
                                </Items>
                            ))
                        }
                    </WrapItems>
                </Box>
            </Container>

            <Box sx={{
                backgroundImage: 'url(/images/bg.png)',
                paddingTop: isMobile ? '50px' : '76px',
                paddingBottom: isMobile ? '50px' : '112px',
                textAlign: 'center',
                zIndex: '0',
                position: 'relative',
            }}>
                <Container>
                    <TitleTag title="📝 For projects" isMobile={isMobile} />
                    <Box sx={{
                        letterSpacing: '-1.28px',
                        color: '#0b0b0b',
                        fontWeight: '600',
                        fontSize: isMobile ? '24px' : '40px',
                        lineHeight: '76px',
                        fontFamily: 'Bai Jamjuree',
                        marginBottom: isMobile ? '0' : '12px',
                    }}>
                        Ready to be launch on Bionswap ?
                    </Box>
                    <SubContent component='p'
                        sx={{
                            marginBottom: '43px',
                            maxWidth: '766px',
                            width: '100%',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            fontSize: isMobile ? '12px' : '14px',
                        }}>
                        BionicFox is very confident in saying that we have a lot of experience in developing dApp with many functions like: Swap, Farm, Pool, NFT Marketplace, Launchpad,...
                    </SubContent>
                    <Box sx={{
                        maxWidth: '248px',
                        width: '100%',
                        margin: 'auto',
                    }}>
                        <PrimaryButton isMobile={isMobile} label="Apply now" />
                    </Box>
                </Container>
            </Box>
        </Section>
    );
};

export default Crowdfunding;