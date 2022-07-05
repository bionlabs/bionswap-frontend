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

const Crowdfunding = () => {
    return (
        <div>
            <Box component='section'>
                <Container>
                    <Breadcrumb name={crowdfundingConfig[0].name} />
                </Container>
            </Box>
        </div >
    );
};

export default Crowdfunding;
