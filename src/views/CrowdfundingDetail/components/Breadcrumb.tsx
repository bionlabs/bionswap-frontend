import * as React from 'react';
import { Box, Link, Breadcrumbs } from "@mui/material";

function handleClick(event: any) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}

interface BreadcrumbProps {
    name: string,
    isMobile: boolean
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({name, isMobile = false}) => {
    return (
        <Box role="presentation" onClick={handleClick} marginBottom="24px">
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/crowdfunding">
                    Project
                </Link>
                <Box component='p' sx={{
                    color: '#000000',
                    fontWeight: '600',
                    fontSize: '16px',
                    lineHeight: '160%',
                }}>
                    {name}
                </Box>
            </Breadcrumbs>
        </Box>
    );
}

export default Breadcrumb