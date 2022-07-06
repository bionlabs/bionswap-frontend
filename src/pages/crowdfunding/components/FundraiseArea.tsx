import * as React from 'react';
import { Box, linearProgressClasses, LinearProgress } from "@mui/material";
import { styled } from '@mui/material/styles';

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
        <Box>
            <Box>
                <Box component='img' src={data.projectThumb} alt={data.name} />
            </Box>
            <Box>
                <BorderLinearProgress variant="determinate" value={70} />
                <Box sx={{
                    color: '#1C7744',
                    fontWeight: '600',
                    fontSize: '32px',
                    lineHeight: '150%',
                }}>
                    $46,800
                </Box>
                <Box sx={{
                    color: '#E7A236',
                    fontWeight: '400',
                    fontSize: '14px',
                    lineHeight: '160%',
                }}>
                    Fundraise goal: 500,000$
                </Box>
                <Box>
                    <Box component='p'>Allocation</Box>
                    <Box component='p'>$0 BUSD - $500 BUSD</Box>
                </Box>
                <Box>
                    <Box component='p'>Price per token</Box>
                    <Box component='p'>1 FOX = $0.5 BUSD</Box>
                </Box>
                <Box>
                    <Box>End in:</Box>
                    <Box>
                        {
                            for (const key in time) 
                        <Box>
                            <p>{time[key]}</p>
                        </Box>
                        )
                        }
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default FundraiseArea