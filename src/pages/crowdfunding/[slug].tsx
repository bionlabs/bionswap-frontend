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
import Breadcrumb from './components/Breadcrumb'
import HeadDetail from './components/HeadDetail'

const Crowdfunding: NextPage = () => {
    return (
        <Box component='section'>
            <Container>
                <Breadcrumb name={crowdfundingConfig[0].name} />
                <HeadDetail avarta={crowdfundingConfig[0].coin.image} name={crowdfundingConfig[0].name} type={crowdfundingConfig[0].type} unit={crowdfundingConfig[0].fundraiseGoal.unit} />

            </Container>
        </Box>
    );
};

export default Crowdfunding;
