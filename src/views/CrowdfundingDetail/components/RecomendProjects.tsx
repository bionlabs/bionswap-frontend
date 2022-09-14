import * as React from 'react';
import { Box, Container, styled, Typography } from "@mui/material";
import RecomendItem from './RecomendItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import ProjectItem from 'views/Crowdfunding/components/ProjectItem';

interface RecomendProjectsProps {
    data: any,
    isMobile: boolean
}

const RecomendProjects: React.FC<RecomendProjectsProps> = ({ data, isMobile = false }) => {
    const Wrapper = styled(Box)`
        border-top: 1px solid;
        border-color: ${(props) => props.theme.palette.gray[800]};
        background: #001015;
    `
    return (
        <Wrapper padding={isMobile ? '40px 0' : '52px 0'}>
            <Container maxWidth='xl'>
                <FlexBox flexDirection='column' gap='35px'>
                    <Typography variant='h3Samsung' color='#F6F6F6' fontWeight='700'>
                        Recomend other projects
                    </Typography>
                    <Box>
                        <FlexBox gap={3} flexWrap='wrap' justifyContent='space-between'>
                            {
                                data?.map((item: any, index: any) => (
                                    <Box maxWidth='423px' key={item} sx={{
                                        width: {xs: '100%', md: '31%'}
                                    }}>
                                        <ProjectItem data={item} />
                                    </Box>
                                ))
                            }
                        </FlexBox>
                    </Box>
                </FlexBox>
            </Container>
        </Wrapper>
    );
}

const FlexBox = styled(Box)`
    display: flex;
`

export default RecomendProjects