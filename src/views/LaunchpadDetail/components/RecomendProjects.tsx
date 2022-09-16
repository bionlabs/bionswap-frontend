import * as React from 'react';
import { Box, Container, styled, Typography } from "@mui/material";
import Card from 'components/Card';
import Slider from "react-slick"

interface RecomendProjectsProps {
    data: any,
}

const RecomendProjects: React.FC<RecomendProjectsProps> = ({ data }) => {

    const settings = {
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,

        responsive: [
            {
                breakpoint: 10000,
                settings: 'unslick'
            },
            {
                breakpoint: 1199,
                settings: {
                    arrows: false,
                    speed: 500,
                    swipeToSlide: true,
                    infinite: false,
                    variableWidth: true,
                }
            },
        ]
    };

    return (
        <Wrapper>
            <Container maxWidth='xl'>
                <FlexBox flexDirection='column' gap='35px'>
                    <Typography variant='h3Samsung' color='#F6F6F6' fontWeight='700'>
                        Recomend other projects
                    </Typography>
                    <WrapSlider>
                        <Slider {...settings}>
                            {
                                data?.map((item: any, index: any) => (
                                    <Box key={item} sx={{
                                        width: { xs: '362px !important', lg: 'calc(100% / 3)' },
                                    }}>
                                        <Card data={item} />
                                    </Box>
                                ))
                            }
                        </Slider>
                    </WrapSlider>
                </FlexBox>
            </Container>
        </Wrapper>
    );
}

const Wrapper = styled(Box)`
    border-top: 1px solid;
    border-color: ${(props) => props.theme.palette.gray[800]};
    background: #001015;
    padding: 52px 0;

    ${props => props.theme.breakpoints.down("sm")} {
        padding: 40px 0;
    }
`
const WrapSlider = styled(Box)`
    .slider {
        display: flex;
        width: 100%;
        gap: 40px;
    }

    .slick-track {
        display: flex;
        gap: 30px;
    }
`
const FlexBox = styled(Box)`
    display: flex;
`

export default RecomendProjects