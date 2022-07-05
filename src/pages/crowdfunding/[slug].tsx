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

const Crowdfunding: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Connect Wallet Demo</title>
                <meta
                    name="description"
                    content="Demo app part of a tutorial on adding RainbowKit to a React application"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <Menu />
                <Box component='section'>
                    <Container>
                        <Breadcrumb name={crowdfundingConfig[0].name} />
                        
                    </Container>
                </Box>
                <Footer />
            </main >
        </div >
    );
};

export default Crowdfunding;
