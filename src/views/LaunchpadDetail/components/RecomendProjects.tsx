import * as React from 'react';
import { Box, Container, styled, Typography , useMediaQuery } from "@mui/material";
import Card from 'components/Card';

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
                    {/* <Box>
                        <Box sx={{
                            display:'grid' , gridTemplateColumns: isMobile ? 'auto' : isTablet ? 'auto auto' : isDesktop ? 'auto auto auto' : 'auto auto auto auto',
                            gap: '32px'
                        }}>
                            {
                                data?.map((item: any, index: any) => (
                                    <Box maxWidth='423px' key={item} sx={{
                                        width: {xs: '100%', md: '31%'}
                                    }}>
                                        <ProjectItem data={item} />
                                    </Box>
                                ))
                            }
                        </Box>
                    </Box> */}
                    <Box>
                        <Box sx={{
                            display: 'flex',
                            gap: '40px'
                        }}>
                            {
                                data?.map((item: any, index: any) => (
                                    <Box key={item} sx={{
                                        width: {xs: '100%', md: 'calc(100% / 3)'}
                                    }}>
                                        <Card data={item} />
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