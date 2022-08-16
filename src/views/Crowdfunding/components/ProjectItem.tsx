/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useRouter } from 'next/router';
import { Box } from "@mui/material";
import styled from "@emotion/styled";

interface ProjectItemProps {
    data: any,
}

const ProjectItem: React.FC<ProjectItemProps> = ({ data }) => {
    const router = useRouter();

    return (
        <WrapBox onClick={() => { router.push(`/crowdfunding/${data?.slug}`) }}>
            <img src={data?.projectThumb} alt={data?.name} style={{
                width: '100%',
                objectFit: 'cover'
            }} />
            <Box sx={{
                position: 'absolute',
                background: '#2BB673',
                padding: '4px 10px',
                borderRadius: '4px',
                color: '#fff',
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
                        marginBottom: '20px',
                    }}>
                    <Box>
                        <Box
                            sx={{
                                fontWeight: '700',
                                fontSize: '24px',
                                lineHeight: '160%',
                                color: '#000000',
                                marginBottom: '5px'
                            }}>
                            {data?.name}
                        </Box>
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
                    <Box sx={{
                        position: 'relative',
                    }}>
                        <Box component='img' src={data?.coin?.image} alt={data?.coin?.name} />
                        <Box component='img' src='/images/coins/BNB_coin.png' alt='BNB_coin'
                            sx={{
                                position: 'absolute',
                                bottom: '5px',
                                right: '-10px',
                            }} />
                    </Box>
                </Box>
                <Box sx={{
                    fontWeight: '400',
                    fontSize: '14px',
                    lineHeight: '160%',
                    color: '#31313B',
                    marginBottom: '30px',
                }}>
                    {data?.description}
                </Box>
                <Box display='flex' justifyContent='space-between'
                    sx={{
                        marginBottom: '12px'
                    }}>
                    <Box component='p'
                        sx={{
                            fontSize: '14px',
                            lineHeight: '160%',
                        }}>
                        Fundraise Goal
                    </Box>
                    <Box component='p' sx={{
                        color: '#0b0b0b',
                        fontWeight: '600',
                        fontSize: '14px',
                        lineHeight: '160%',
                    }}>
                        ${data?.fundraiseGoal?.price} {data?.fundraiseGoal?.unit}
                    </Box>
                </Box>
                <Box display='flex' justifyContent='space-between'>
                    <Box component='p' sx={{
                        fontSize: '14px',
                        lineHeight: '160%',
                    }}>
                        Allocation
                    </Box>
                    <Box component='p' sx={{
                        color: '#0b0b0b',
                        fontWeight: '600',
                        fontSize: '14px',
                        lineHeight: '160%',
                    }}>
                        ${data?.allocation?.from?.price} {data?.allocation?.from?.unit} - ${data?.allocation?.to?.price} {data?.allocation?.to?.unit}
                    </Box>
                </Box>
            </Box>
            {
                data?.status === 'Coming Soon' ?
                    <Box sx={{
                        color: '#ee7609',
                        fontWeight: '600',
                        fontSize: '14px',
                        lineHeight: '160%',
                        padding: '11px',
                        textAlign: 'center',
                        background: 'rgba(231, 162, 54, 0.15)',
                    }}>
                        TOKEN SALE - LUCKY NFTs DROP
                    </Box>
                    :
                    null
            }

        </WrapBox>
    )
}

const WrapBox = styled(Box)`
        border-radius: 8px;
        background: #FFFFFF;
        width: 100%;
        overflow: hidden;
        position: relative;
        cursor: pointer;
        transition: .15s ease-in;
        border: 1.5px solid #EAECEE;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
        :hover {
            transform: scale3d(0.99, 0.99, 1);
            transform-style: preserve-3d;
        }
    `

export default ProjectItem;