import * as React from 'react';
import { Box, Container } from "@mui/material";
import RecomendItem from './RecomendItem';
import styled from '@emotion/styled';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

interface RecomendProjectsProps {
    data: any,
    isMobile: boolean
}

const RecomendProjects: React.FC<RecomendProjectsProps> = ({ data, isMobile = false }) => {
    const Wrapper = styled(Box)`
        border-top: 1px solid #dee0e2;
        background: #FAFAF9;
    `
    return (
        <Wrapper padding={isMobile ? '40px 0' : '52px 0'}>
            <Container>
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
                    <Swiper
                        spaceBetween={50}
                        slidesPerView={3}
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                    >
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
                    </Swiper>
                </Box>
            </Container>
        </Wrapper>
    );
}

export default RecomendProjects