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
        margin-top: 73px;
        padding-top: 40px;
    `

    return (
        <Section component='section'>
            <Container>
                <Box display='flex' gap={4}>
                    <Box width='35%'>
                        <BionStack />
                    </Box>
                    <Box width='65%'>
                        <IDOTabs isMobile={isMobile} data={dashboardConfig} />
                    </Box>
                </Box>
            </Container>
        </Section>
    );
};

export default Dashboard;
