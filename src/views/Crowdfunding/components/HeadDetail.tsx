import * as React from 'react';
import { Box, Link, Breadcrumbs } from "@mui/material";

function handleClick(event: any) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}

interface HeadDetailProps {
    avarta: string,
    name: string,
    type: any,
    unit: string,
}

const HeadDetail: React.FC<HeadDetailProps> = ({avarta, name, type, unit}) => {
    return (
        <Box>
            <Box>
                <Box component='img' src={avarta} alt={name} />
            </Box>
            <Box>
                <Box component='h3'>
                    {name}
                </Box>
                <Box component='p'>
                    {type}
                </Box>
            </Box>
            <Box>
                <Box component='span'>
                    <Box component='img' />{unit}
                </Box>
                <Box component='span'>
                    <Box component='img' />{unit}
                </Box>
            </Box>
        </Box>
    );
}

export default HeadDetail