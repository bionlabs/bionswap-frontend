import { NextPage } from "next";
import Head from "next/head";
import Menu from '../../views/Menu'
import Footer from '../../views/Footer'
import PrimaryButton from '../../components/PrimaryButton'
import {
    Box,
    Container
} from '@mui/material'

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
                
                <Footer />
            </main>
        </div>
    );
};

export default Crowdfunding;
