import { crowdfundingConfig } from "./config";
import {
    Box,
    Container,
    Typography,
    useMediaQuery,
    styled
} from '@mui/material'
import Breadcrumb from './components/Breadcrumb'
import HeadDetail from './components/HeadDetail'
import FundraiseArea from './components/FundraiseArea'
import RecomendProjects from "./components/RecomendProjects";
import TabsArea from "./components/TabsArea";

const config = [
    {
        icon: '/icons/launchpad/chat-icon.svg',
        content: 'BionSwap connects creators with backers to fund projects and many more features.',
    },
    {
        icon: '/icons/launchpad/reserving-project.svg',
        content: 'Reserving project tokens and extremly rare NFTs if you are lucky enough.',
    },
    {
        icon: '/icons/launchpad/verified-project.svg',
        content: 'Every verified projects is secured and checked by the BionSwap team.',
    },
]

const LaunchpadDetail = () => {
    const isMobile = useMediaQuery('(max-width:767px)');
    return (
        <Section component='section'>
            <Container maxWidth='xl'>
                <Breadcrumb name={crowdfundingConfig[0].name} />
                <HeadDetail avarta={crowdfundingConfig[0].coin.image} name={crowdfundingConfig[0].name} type={crowdfundingConfig[0].type} unit={crowdfundingConfig[0].fundraiseGoal.unit} />
                <FundraiseArea isMobile={isMobile} data={crowdfundingConfig[0]} />
            </Container>
            <WrapService>
                <Container maxWidth='xl'>
                    <FlexBox justifyContent='space-between' sx={{
                        flexDirection: {xs: 'column', md: 'row'},
                        gap: {xs: '40px', md: '30px'}
                    }}>
                        {
                            config.map(item => (
                                <FlexBox key={item.content} gap='25px' alignItems='center'>
                                    <img src={item.icon} alt='' />
                                    <Box maxWidth='290px' width='100%'>
                                        <Typography variant="body3Poppins" color='text.primary' fontWeight='400'>
                                            {item.content}
                                        </Typography>
                                    </Box>
                                </FlexBox>
                            ))
                        }
                    </FlexBox>
                </Container>
            </WrapService>
            <WrapTabRecom>
                <TabsArea isMobile={isMobile} data={crowdfundingConfig[0]} />
                <RecomendProjects data={crowdfundingConfig} />
            </WrapTabRecom>
        </Section>
    );
};

const Section = styled(Box)`
    background-color: #001015;
    padding-top: 42px;
    display: flex;
    flex-direction: column;
    gap: 70px;
`
const WrapService = styled(Box)`
    background-color: ${(props) => props.theme.palette.gray[900]};
    padding: 57px 0;
`
const WrapTabRecom = styled(Box)``
const FlexBox = styled(Box)`
    display: flex;
`

export default LaunchpadDetail;