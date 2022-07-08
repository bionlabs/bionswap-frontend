import Head from "next/head";
import Menu from 'views/Menu'
import Footer from 'views/Footer'
import TitleTag from 'components/TitleTag'
import PrimaryButton from 'components/PrimaryButton'
import ProjectItem from './components/ProjectItem'
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

const CrowdfundingDetail = () => {
    return (
        <div>
            <Box component='section'>
                <Container>
                    <Breadcrumb name={crowdfundingConfig[0].name} />
                    <HeadDetail avarta={crowdfundingConfig[0].coin.image} name={crowdfundingConfig[0].name} type={crowdfundingConfig[0].type} unit={crowdfundingConfig[0].fundraiseGoal.unit} />
                    <FundraiseArea data={crowdfundingConfig[0]} />
                    <TabsArea />
                    <RecomendProjects data={crowdfundingConfig} />
                </Container>
            </Box>
        </div >
    );
};

export default CrowdfundingDetail;
