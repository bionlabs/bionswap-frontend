/* eslint-disable react/jsx-key */
import TitleTag from 'components/TitleTag'
import PrimaryButton from 'components/PrimaryButton'
import ProjectItem from './components/ProjectItem'
import { crowdfundingConfig } from "./config";
import {
    Box,
    Container,
    styled,
    Typography,
    useMediaQuery
} from '@mui/material'
import Link from 'next/link';
import HeroSection from './components/Hero/HeroSection';

const Crowdfunding = () => {
    const isMobile = useMediaQuery('(max-width:767px)');
    
    const Section = styled(Box)`
    background-color: ${(props) => props.theme.palette.background.default};

    .background {
        padding: ${isMobile ? '20px 0' : '100px 0'};
        // background-image: url('/images/crowdfunding_bg.png');
        // background-position: center;
        // background-repeat: no-repeat;
        // background-size: cover;
    }
`

    const Title = styled(Box)`
        position: relative;

        &::after {
            content: '';
            background: #07E0E0;
            height: 51%;
            width: 5px;
        }
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
        justify-content: center;
    `
    const Items = styled(Box)`
        min-width: 340px;
        max-width: calc(94% / 3);
        width: 100%;
    `

    return (
        <>
            <HeroSection />
            <Section component='section'>
            <Box className='background'>
                <Container>
                    <Box sx={{
                        marginBottom: '78px'
                    }}>
                        <Title>
                            <Typography variant='h5Samsung' fontWeight='700' color='gray.200' ml='30px'>
                                Feature Project
                            </Typography>
                        </Title>
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
                    <Box>
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
            </Box>

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
                        <PrimaryButton label="Apply now" />
                    </Box>
                </Container>
            </Box>
        </Section>
        </>
    );
};

export default Crowdfunding;