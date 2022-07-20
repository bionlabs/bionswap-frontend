import { crowdfundingConfig } from "./config";
import {
    Box,
    Container,
    useMediaQuery
} from '@mui/material'
import Breadcrumb from './components/Breadcrumb'
import HeadDetail from './components/HeadDetail'
import FundraiseArea from './components/FundraiseArea'
import RecomendProjects from "./components/RecomendProjects";
import TabsArea from "./components/TabsArea";
import styled from '@emotion/styled'

const CrowdfundingDetail = () => {
    const isMobile = useMediaQuery('(max-width:767px)');

    const Section = styled(Box)`
        background-image: url('/images/crowdfunding_detail_bg.png');
        background-repeat: no-repeat;
        background-size: 100% auto;
        padding-top: 42px;
        background-position: top;
    `
    const WrapTabRecom = styled(Box)`
    `
    return (
        <Section component='section'>
            <Container>
                <Breadcrumb isMobile={isMobile} name={crowdfundingConfig[0].name} />
                <HeadDetail isMobile={isMobile} avarta={crowdfundingConfig[0].coin.image} name={crowdfundingConfig[0].name} type={crowdfundingConfig[0].type} unit={crowdfundingConfig[0].fundraiseGoal.unit} />
                <FundraiseArea isMobile={isMobile} data={crowdfundingConfig[0]} />
            </Container>
            <WrapTabRecom>
                <TabsArea isMobile={isMobile} data={crowdfundingConfig[0]} />
                <RecomendProjects isMobile={isMobile} data={crowdfundingConfig} />
            </WrapTabRecom>
        </Section>
    );
};

export default CrowdfundingDetail;