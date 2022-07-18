import React from "react";
import { Box } from "@mui/material";

interface RewardProps {
    // rewardItems: any,
}

const Reward: React.FC<RewardProps> = () => {
    return (
        <Box sx={{
            background: '#FAFAFA',
            borderRadius: '8px',
            width: '100%',
            padding: '16px 24px',
            marginBottom: '40px'
        }}>
            <Box component='p'
            sx={{
                color: '#000000',
                fontWeight: '600',
                fontSize: '16px',
                lineHeight: '160%',
                margin: '0'
            }}>
                Reward
            </Box>
            <Box>
                <Box display='flex' alignItems='center' sx={{
                    marginTop: '12px'
                }}>
                    <Box component='img' src='/images/Reward.png' alt='Reward' />
                    <Box component='span'
                        sx={{
                            fontWeight: '400',
                            fontSize: '14px',
                            lineHeight: '160%',
                            marginLeft: '8px',
                            color: '#787A9B'
                        }}>
                        After 7 days: Bion stack will increase based on the number of staked $BUSD (1 BUSD ~ 20 Bion Stacks)
                    </Box>
                </Box>
                <Box display='flex' alignItems='center' sx={{
                    marginTop: '12px'
                }}>
                    <Box component='img' src='/images/Reward.png' alt='Reward' />
                    <Box component='span'
                        sx={{
                            fontWeight: '400',
                            fontSize: '14px',
                            lineHeight: '160%',
                            marginLeft: '8px',
                            color: '#787A9B'
                        }}>
                        You will get 12% interest per year.
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Reward;