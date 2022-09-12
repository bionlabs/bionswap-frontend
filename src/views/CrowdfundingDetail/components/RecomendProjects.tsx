import * as React from 'react';
import { Box, Container, styled, Typography , useMediaQuery } from "@mui/material";
import RecomendItem from './RecomendItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import ProjectItem from 'views/Crowdfunding/components/ProjectItem';

interface RecomendProjectsProps {
    data: any,
    isMobile: boolean
}

const RecomendProjects: React.FC<RecomendProjectsProps> = ({ data }) => {
    const isMobile = useMediaQuery('(max-width:700px)');
    const isTablet = useMediaQuery('(max-width:1050px)');
    const isDesktop = useMediaQuery('(max-width:1380px)');

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
                        <Box sx={{
                            display:'grid' , gridTemplateColumns: isMobile ? 'auto' : isTablet ? 'auto auto' : isDesktop ? 'auto auto auto' : 'auto auto auto auto',
                            gap: '32px'
                        }}>
                            {
                                data?.map((item: any, idex: any) => (
                                    <Box key={item}>
                                        <ProjectItem data={item} />
                                    </Box>
                                ))
                            }
                        </Box>
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