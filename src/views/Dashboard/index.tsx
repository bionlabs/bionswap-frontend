import {
    Box,
    Container,
    useMediaQuery,
    styled
} from '@mui/material'
import Page from 'components/Page';

const Dashboard = ({children}:any) => {
    const isMobile = useMediaQuery('(max-width:767px)');

    return (
        <Page>
            Hello dashboard
        </Page>
    );
};

export default Dashboard;
