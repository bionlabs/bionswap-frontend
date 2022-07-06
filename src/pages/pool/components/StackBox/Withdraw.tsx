import React from "react";
import { Box, OutlinedInput, InputAdornment } from "@mui/material";
import PrimaryButton from "components/PrimaryButton"

interface WithdrawProps {
    // rewardItems: any,
}

const Withdraw: React.FC<WithdrawProps> = () => {
    return (
        <Box>
            <Box component='p'
                sx={{
                    marginBottom: '24px',
                    marginTop: '24px',
                }}>
                If you withdraw before term all interest will be lost.
            </Box>
            <Box>
                <Box>
                    <Box display="flex" justifyContent="space-between"
                        sx={{
                            marginBottom: '16px'
                        }}>
                        <Box component='label'>
                            Withdraw Amount 
                        </Box>
                        <Box component='span'>
                            Balance: 5000 BUSD
                        </Box>
                    </Box>
                    <OutlinedInput
                        sx={{
                            paddingLeft: '16px',
                            paddingRight: '16px',
                            border: '1px solid #D6DADE',
                            borderRadius: '6px',
                            width: '100%',
                            marginBottom: '24px',

                            '& input': {
                                paddingTop: '18px',
                                paddingBottom: '18px',
                                fontWeight: '400',
                                fontSize: '18px',
                                lineHeight: '22px',
                                fontFamily: "'Inter', sans-serif",
                                color: '#787A9B',
                            },

                            '& fieldset': {
                                display: 'none',
                            }
                        }}
                        id="input-with-icon-adornment"
                        placeholder="0.00"
                        startAdornment={
                            <InputAdornment position="start">
                                <Box component="img" src="/images/coins/BNB.png" />
                            </InputAdornment>
                        }
                        endAdornment={
                            <InputAdornment position="end">
                                <Box component="button"
                                    sx={{
                                        fontWeight: '600',
                                        fontSize: '14px',
                                        lineHeight: '17px',
                                        color: '#E7A236',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer'
                                    }}>
                                    MAX
                                </Box>
                            </InputAdornment>
                        }
                    />
                    <PrimaryButton label="Withdraw BUSD" />
                </Box>
                <Box component='p'
                    sx={{
                        textAlign: 'center',
                        marginTop: '24px'
                    }}>
                    You don't have any BUSD tokens staked
                </Box>
            </Box>
        </Box >
    )
}

export default Withdraw;