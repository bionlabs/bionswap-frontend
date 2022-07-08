import * as React from 'react';
import { Box, Link, Breadcrumbs } from "@mui/material";

interface RecomendProjectsProps {
    data: any;
}

const RecomendProjects: React.FC<RecomendProjectsProps> = ({data}) => {
    return (
        <Box>
            <Box component='h3'
                sx={{
                    
                }}>
                Recomend other projects
            </Box>
        </Box>
    );
}

export default RecomendProjects