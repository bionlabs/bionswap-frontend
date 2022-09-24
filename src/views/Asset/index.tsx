import {
    Box,
    Container,
    useMediaQuery,
    styled
} from '@mui/material'
import Page from 'components/Page';

const Asset = ({children}:any) => {
    const isMobile = useMediaQuery('(max-width:767px)');

    return (
        <Page>
            Hello Asset
        </Page>
    );
};

export default Asset;
