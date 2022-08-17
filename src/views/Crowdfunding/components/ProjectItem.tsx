/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useRouter } from 'next/router';
import { Box, styled, Typography } from "@mui/material";
import Image from "next/image";

interface ProjectItemProps {
    data: any,
}

const ProjectItem: React.FC<ProjectItemProps> = ({ data }) => {
    const router = useRouter();

    return (
        <WrapBox onClick={() => { router.push(`/crowdfunding/${data?.slug}`) }}>
            <Box sx={{
                width: '100%',
                height: '123px',
            }}>
                <img src={data?.projectThumb} alt={data?.name} width='100%' height='100%' />
            </Box>
            <Status>
                {data?.status}
            </Status>
            <WrapTopArea>
                <WrapLogo>
                    <Image src={data?.logo} alt={data?.name} width='57px' height='57px' />
                </WrapLogo>
                <TimeLineBg>
                    <FlexBox ml='120px' gap='3px'>
                        <Typography variant="captionPoppins"
                            sx={{
                                color: 'primary.main',
                                fontWeight: '400',
                            }}>
                            Sale starts in:
                        </Typography>
                        <Typography variant="captionPoppins" sx={{
                            color: 'primary.main',
                            fontWeight: '500',
                        }}>
                            00d 10:46:35
                        </Typography>
                    </FlexBox>
                </TimeLineBg>
            </WrapTopArea>
            <FlexBox flexDirection='column' gap='20px' sx={{
                padding: '28px 15px 22px'
            }}>
                <FlexBox>
                    <Box>
                        <Typography>Token sale - Pair launch</Typography>
                        <Typography variant="h5Samsung"
                            sx={{
                                fontWeight: '700',
                                color: 'background.paper'
                            }}>
                            {data?.name}
                        </Typography>
                    </Box>
                    <Box>
                        <Image src={data?.coin?.image} alt={data?.coin?.name} width='38px' height='38px' />
                    </Box>
                </FlexBox>
            </FlexBox>

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
const FlexBox = styled(Box)`
    display: flex;
`
const WrapBox = styled(Box)`
    border-radius: 8px;
    background: ${(props) => (props.theme.palette as any).extra.other.nineth};
    width: 100%;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    transition: .15s ease-in;
    border: 1px solid ${(props) => (props.theme.palette as any).extra.other.tenth};

    :hover {
        transform: scale3d(0.99, 0.99, 1);
        transform-style: preserve-3d;
    }
`
const WrapLogo = styled(Box)`
    border: 2.75px solid ${(props) => (props.theme.palette as any).extra.other.nineth};
    background: linear-gradient(180deg, #008A61 0%, #033039 100%);
    border-radius: 8px;
    transform: matrix(-1, 0, 0, 1, 0, 0);
    max-width: 88px;
    width: 100%;
    height: 100%;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 15px;
`
const WrapTopArea = styled(Box)`
    margin-top: -38px;
`
const TimeLineBg = styled(Box)`
    background: ${(props) => (props.theme.palette as any).extra.other.eleventh};
    width: 100%;
    padding: 4px 5px 6px;
    margin-top: -50px;
`
const Status = styled(Box)`
position: absolute;
                background: #2BB673;
                padding: 4px 10px;
                border-radius: 4px;
                color: #fff;
                font-weight: 600;
                font-size: 12px;
                line-height: 160%;
                top: 10px;
                right: 20px;
`

export default ProjectItem;