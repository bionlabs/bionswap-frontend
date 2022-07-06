import Head from "next/head";
import Menu from 'views/Menu'
import Footer from 'views/Footer'
import TitleTag from 'components/TitleTag'
import PrimaryButton from 'components/PrimaryButton'
import {
    Box,
    Container
} from '@mui/material'
import Breadcrumb from "views/crowdfunding/components/Breadcrumb";
import { crowdfundingConfig } from "views/crowdfunding/config";

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
