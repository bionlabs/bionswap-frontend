import * as React from 'react';
import { Box, linearProgressClasses, LinearProgress } from "@mui/material";
import PrimaryButton from 'components/PrimaryButton';
import styled from '@emotion/styled';

interface FundraiseAreaProps {
    data: any;
    isMobile: boolean;
}

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: '#F1F1F1',
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: '#1C7744',
    },
}));

const FundraiseArea: React.FC<FundraiseAreaProps> = ({ data, isMobile = false }) => {
    const time = {
        days: '0',
        hours: '0',
        min: '0',
        sec: '0'
    }
    const Values = styled(Box)`
        font-weight: 600;
        color: #25222D;
    `

    return (
        <Box display='flex' gap={3} flexDirection={isMobile ? 'column' : 'row'}>
            <Box width={isMobile ? '100%' : '65%'}>
                <Box width='100%' component='img' src={data.projectThumb} alt={data.name} />
            </Box>
            <Box width={isMobile ? '100%' : '35%'}
                sx={{
                    padding: '16px 20px',
                    background: '#ffffff',
                    borderRadius: '8px',
                }}>
                <BorderLinearProgress variant="determinate" value={70} />
                <Box sx={{
                    color: '#1C7744',
                    fontWeight: '600',
                    fontSize: '32px',
                    lineHeight: '150%',
                    marginTop: '10px',
                }}>
                    $46,800
                </Box>
                <Box sx={{
                    color: '#E7A236',
                    fontWeight: '400',
                    fontSize: '14px',
                    lineHeight: '160%',
                    marginBottom: '20px',
                }}>
                    Fundraise goal: 500,000$
                </Box>
                <Box display='flex' justifyContent='space-between' marginBottom='12px'>
                    <Box component='span'>Allocation</Box>
                    <Values component='span'>
                        $0 BUSD - $500 BUSD
                    </Values>
                </Box>
                <Box display='flex' justifyContent='space-between' marginBottom='20px'>
                    <Box component='span'>Price per token</Box>
                    <Values component='span'>
                        1 FOX = $0.5 BUSD
                    </Values>
                </Box>
                <Box display='flex' justifyContent='space-between' marginBottom='20px'>
                    <Box component='span'>Backers</Box>
                    <Values component='span'>
                        320
                    </Values>
                </Box>
                <Box marginBottom='20px'>
                    <Box component='span' sx={{marginBottom: '10px', display: 'inline-block'}}>End in:</Box>
                    <Box display='flex' gap={3}>
                        {
                            Object.entries(time).map(([key, value]) => (
                                <Box width='100%' textAlign='center'>
                                    <Box component='p'
                                        sx={{
                                            color: '#000000',
                                            fontWeight: '600',
                                            fontSize: '20px',
                                            lineHeight: '160%',
                                            padding: '8px',
                                            background: '#F1F1F1',
                                            borderRadius: '6px',
                                            marginBottom: '4px'
                                        }}>
                                        {value}
                                    </Box>
                                    <Box component='span'>
                                        {key}
                                    </Box>
                                </Box>
                            ))
                        }
                    </Box>
                </Box>
                <PrimaryButton label="Apply now" isMobile={isMobile}  />
                <Box component='span'
                    sx={{
                        display: 'inline-block',
                        marginTop: '12px',
                        textAlign: 'center',
                        width: '100%',
                        fontSize: '12px',
                    }}>
                    Successfully funded and closed on May 10, 2022.
                </Box>
            </Box>
        </Box>
    );
}

export default FundraiseArea