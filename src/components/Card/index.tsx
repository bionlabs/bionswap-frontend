/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Box, styled, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";

interface ProjectItemProps {
    data: any,
}

const Card: React.FC<ProjectItemProps> = ({ data }) => {
    const router = useRouter();

    return (
        <WrapBox onClick={() => { router.push(`/launchpad/${data?.slug}`) }}>
            <Box sx={{
                width: '100%',
                height: '123px',

                'img': {
                    objectFit: 'cover',
                }
            }}>
                <img src={data?.projectThumb} alt={data?.name} width='100%' height='100%' />
            </Box>
            <Status sx={{
                backgroundColor: 'extra.other.thirteenth',
                ...(data?.status === 'Sale Open' && {
                    backgroundColor: 'extra.other.seventeenth',
                }),
                ...(data?.status === 'Closed' && {
                    backgroundColor: 'extra.header.color',
                }),
            }}>
                <Typography variant="captionPoppins"
                    sx={{
                        color: 'background.paper',
                        fontWeight: '500',
                        ...(data?.status === 'Closed' && {
                            color: 'extra.other.nineth',
                        }),
                    }}>
                    {data?.status}
                </Typography>
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
                <FlexBox justifyContent='space-between' alignItems='center'>
                    <FlexBox flexDirection='column' gap='5px'>
                        <Typography variant="captionPoppins" sx={{
                            fontWeight: '400',
                            color: 'extra.other.twelfth'
                        }}>
                            Token sale - Pair launch
                        </Typography>
                        <Typography variant="h5Samsung"
                            sx={{
                                fontWeight: '700',
                                color: 'background.paper'
                            }}>
                            {data?.name}
                        </Typography>
                    </FlexBox>
                    <Box>
                        <Image src={data?.coin?.image} alt={data?.coin?.name} width='38px' height='38px' />
                    </Box>
                </FlexBox>
                <FlexBox justifyContent='space-between'>
                    <Typography variant="caption6Poppins" sx={{
                        fontWeight: '400',
                        color: 'primary.main'
                    }}>
                        Total Goal
                    </Typography>
                    <Typography variant="caption6Poppins" sx={{
                        fontWeight: '600',
                        color: 'text.primary'
                    }}>
                        ${data?.fundraiseGoal?.price} {data?.fundraiseGoal?.unit}
                    </Typography>
                </FlexBox>
                <FlexBox justifyContent='space-between'>
                    <Typography variant="caption6Poppins" sx={{
                        fontWeight: '400',
                        color: 'primary.main'
                    }}>
                        Allocation
                    </Typography>
                    <Typography variant="caption6Poppins" sx={{
                        fontWeight: '600',
                        color: 'text.primary'
                    }}>
                        ${data?.allocation?.from?.price} {data?.allocation?.from?.unit} - ${data?.allocation?.to?.price} {data?.allocation?.to?.unit}
                    </Typography>
                </FlexBox>
                <Line />
                <FlexBox gap='12px'>
                    {
                        data?.verified &&
                        <Tag sx={{
                            backgroundColor: 'extra.other.fourteenthOpacity'
                        }}>
                            <Typography variant="captionPoppins" sx={{
                                fontWeight: '400',
                                color: 'extra.other.fourteenth'
                            }}>
                                Verified
                            </Typography>
                        </Tag>
                    }
                    {
                        data?.lovedByBionswap &&
                        <Tag sx={{
                            backgroundColor: 'extra.other.fifteenthOpacity'
                        }}>
                            <Typography variant="captionPoppins" sx={{
                                fontWeight: '400',
                                color: 'extra.other.fifteenth'
                            }}>
                                Loved by Bionswap
                            </Typography>
                        </Tag>
                    }
                </FlexBox>
            </FlexBox>
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
    padding: 4px 19px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    top: 13px;
    right: 13px;
`
const Line = styled(Box)`
    width: 95%;
    height: 1px;
    margin: auto;
    background-color: ${(props) => (props.theme.palette as any).extra.other.thirteenth};;
`
const Tag = styled(Box)`
    border-radius: 4px;
    padding: 1px 10px 3px;
`

export default Card;