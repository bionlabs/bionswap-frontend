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
        margin-top: 73px;
        background-image: url('/images/crowdfunding_detail_bg.png');
        background-repeat: no-repeat;
        background-size: contain;
        background-position: top;
        padding-top: 42px;
    `
    const WrapTabRecom = styled(Box)`
        position: relative;
        z-index: 10;

        &:after {
            content: '';
            position: absolute;
            top: 50px;
            bottom: 0;
            width: 100%;
            background-color: #ffffff;
            z-index: -1
        }
    `
    return (
        <Section component='section'>
            <Container>
                <Breadcrumb isMobile={isMobile} name={crowdfundingConfig[0].name} />
                <HeadDetail isMobile={isMobile} avarta={crowdfundingConfig[0].coin.image} name={crowdfundingConfig[0].name} type={crowdfundingConfig[0].type} unit={crowdfundingConfig[0].fundraiseGoal.unit} />
                <FundraiseArea isMobile={isMobile} data={crowdfundingConfig[0]} />
            </Container>
            <WrapTabRecom>
                <Container>
                    <TabsArea isMobile={isMobile} data={crowdfundingConfig[0]} />
                    <RecomendProjects isMobile={isMobile} data={crowdfundingConfig} />
                </Container>
            </WrapTabRecom>
        </Section>
    );
};

export default CrowdfundingDetail;