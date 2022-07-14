import { crowdfundingConfig } from "./config";
import {
    Box,
    Container
} from '@mui/material'
import Breadcrumb from './components/Breadcrumb'
import HeadDetail from './components/HeadDetail'
import FundraiseArea from './components/FundraiseArea'
import RecomendProjects from "./components/RecomendProjects";
import TabsArea from "./components/TabsArea";
import styled from '@emotion/styled'

const CrowdfundingDetail = () => {
    const Section = styled(Box)`
        margin-top: 120px;
    `
    return (
        <Section component='section'>
            <Container>
                <Breadcrumb name={crowdfundingConfig[0].name} />
                <HeadDetail avarta={crowdfundingConfig[0].coin.image} name={crowdfundingConfig[0].name} type={crowdfundingConfig[0].type} unit={crowdfundingConfig[0].fundraiseGoal.unit} />
                <FundraiseArea data={crowdfundingConfig[0]} />
                <TabsArea data={crowdfundingConfig[0]} />
                <RecomendProjects data={crowdfundingConfig} />
            </Container>
        </Section>
    );
};

export default CrowdfundingDetail;