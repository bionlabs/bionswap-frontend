import * as React from 'react';
import { Box, linearProgressClasses, LinearProgress } from "@mui/material";
import { styled } from '@mui/material/styles';
import PrimaryButton from 'components/PrimaryButton';

interface FundraiseAreaProps {
    data: any;
}

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
}));

const FundraiseArea: React.FC<FundraiseAreaProps> = ({ data }) => {
    const time = {
        days: '0',
        hours: '0',
        min: '0',
        sec: '0'
    }

    return (
        <Box display='flex' gap={3}>
            <Box width='65%'>
                <Box width='100%' component='img' src={data.projectThumb} alt={data.name} />
            </Box>
            <Box width='35%'
                sx={{
                    width: '35%',
                    padding: '16px 20px',
                    background: '#ffffff',
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
                <Box display='flex' justifyContent='space-between' sx={{ marginBottom: '12px' }}>
                    <Box component='span'>Allocation</Box>
                    <Box component='span' sx={{
                        fontWeight: '600',
                        color: '#25222D',
                    }}>
                        $0 BUSD - $500 BUSD
                    </Box>
                </Box>
                <Box display='flex' justifyContent='space-between' sx={{ marginBottom: '20px' }}>
                    <Box component='span'>Price per token</Box>
                    <Box component='span' sx={{
                        fontWeight: '600',
                        color: '#25222D',
                    }}>
                        1 FOX = $0.5 BUSD
                    </Box>
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
                <PrimaryButton label="Apply now" />
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