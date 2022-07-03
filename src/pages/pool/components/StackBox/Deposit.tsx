import React from "react";
import { Box, OutlinedInput, InputAdornment } from "@mui/material";
import PrimaryButton from "../../../../components/PrimaryButton"

interface DepositProps {
    // rewardItems: any,
}

const Deposit: React.FC<DepositProps> = () => {
    return (
        <Box>
            <Box component='p'
                sx={{
                    marginBottom: '24px',
                    marginTop: '24px',
                }}>
                Deposit BUSD to participate in allowlists for upcoming IDOs
            </Box>
            <Box>
                <Box>
                    <Box display="flex" justifyContent="space-between"
                        sx={{
                            marginBottom: '16px'
                        }}>
                        <Box component='label' for="outlined-basic">
                            Input
                        </Box>
                        <Box component='span'>
                            Balance: 10000 BUSD
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
                    <PrimaryButton label="Deposit BUSD" />
                </Box>
                <Box component='p'
                    sx={{
                        textAlign: 'center',
                        marginTop: '24px'
                    }}>
                    You’re free to withdraw at any time.
                </Box>
            </Box>
        </Box >
    )
}

export default Deposit;