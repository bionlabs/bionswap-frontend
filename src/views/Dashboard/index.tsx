import {
    Box,
    Container,
    useMediaQuery
} from '@mui/material'
import BionStack from './components/BionStack';
import styled from '@emotion/styled';
import { dashboardConfig } from "./config";
import IDOTabs from './components/IDOTabs';

const Dashboard = () => {
    const isMobile = useMediaQuery('(max-width:767px)');

    const Section = styled(Box)`
        padding: 8vh 0;
        min-height: 100vh;
        // background: url('/images/crowdfunding_detail_bg.png');
        // background-repeat: no-repeat;
        // background-size: cover;
        // object-fit: cover;
    `

    return (
        <Section>
            <Container>
                <Box display='flex' gap={4} flexDirection={isMobile ? 'column' : 'row'}>
                    <Box width={isMobile ? '100%' : '35%'}>
                        <BionStack />
                    </Box>
                    <Box width={isMobile ? '100%' : '65%'}>
                        <IDOTabs isMobile={isMobile} data={dashboardConfig} />
                    </Box>
                </Box>
            </Container>
        </Section>
    );
};

export default Dashboard;
