import * as React from 'react';
import { Box, Link, Breadcrumbs } from "@mui/material";
import RecomendItem from './RecomendItem';

interface RecomendProjectsProps {
    data: any,
    isMobile: boolean
}

const RecomendProjects: React.FC<RecomendProjectsProps> = ({ data, isMobile = false }) => {
    return (
        <Box paddingTop={isMobile ? '40px' : '52px'}>
            <Box component='p'
                sx={{
                    fontWeight: '600',
                    fontSize: isMobile ? '28px' : '32px',
                    lineHeight: '150%',
                    color: '#000000',
                    marginBottom: '24px',
                }}>
                Recomend other projects
            </Box>
            <Box>
                <Box display='flex' gap={3} flexWrap='wrap' justifyContent='space-around'>
                    {
                        data?.map((item: any, idex: any) => (
                            <Box key={item} sx={{
                                maxWidth: '260px',
                                width: '100%'
                            }}>
                                <RecomendItem data={item} />
                            </Box>
                        ))
                    }
                </Box>
            </Box>
        </Box>
    );
}

export default RecomendProjects