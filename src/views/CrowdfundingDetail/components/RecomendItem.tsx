import * as React from 'react';
import { Box, Link, Breadcrumbs } from "@mui/material";
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

interface RecomendItemProps {
    data: any;
}

const RecomendItem: React.FC<RecomendItemProps> = ({ data }) => {
    const router = useRouter();

    const WrapBox = styled(Box)`
        border: 1px solid #EAECEE;
        border-radius: 8px;
        background: #FFFFFF;
        width: 100%;
        overflow: hidden;
        position: relative;
        cursor: pointer;
        transition: all .5s ease;

        &:hover {
            transition: all .5s ease;
            box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        }
    `

    return (
        <WrapBox onClick={() => { router.push(`/crowdfunding/${data?.slug}`) }} sx={{

        }}>
            <Box component='img' src={data?.projectThumb} alt={data?.name} sx={{
                width: '100%'
            }} />
            <Box component='p' sx={{
                position: 'absolute',
                background: '#25273D',
                padding: '4px 10px',
                borderRadius: '4px',
                color: '#FFFFFF',
                fontWeight: '600',
                fontSize: '12px',
                lineHeight: '160%',
                top: '10px',
                right: '20px',
            }} >
                {data?.status}
            </Box>
            <Box sx={{
                padding: '20px'
            }}>
                <Box display='flex' justifyContent='space-between' alignItems='center'
                    sx={{
                        marginBottom: '5px',
                    }}>
                    <Box>
                        <Box component='p'
                            sx={{
                                fontWeight: '600',
                                fontSize: '20px',
                                lineHeight: '160%',
                                color: '#000000',
                                marginBottom: '5px'
                            }}>
                            {data?.name}
                        </Box>
                    </Box>
                    <Box>
                        <Box component='p'
                            sx={{
                                fontWeight: '400',
                                fontSize: '12px',
                                lineHeight: '160%',
                                color: '#E7A236',
                            }}>
                            {data?.coin?.name}
                        </Box>
                    </Box>
                </Box>
                <Box sx={{
                    fontWeight: '400',
                    fontSize: '14px',
                    lineHeight: '160%',
                    color: '#31313B',
                }}>
                    {data?.description}
                </Box>
            </Box>
        </WrapBox>
    );
}

export default RecomendItem