import React from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import IDOProcess from "./IDOProcess";

interface VestingScheduleProps {
    data: any,
}

const VestingSchedule: React.FC<VestingScheduleProps> = ({ data }) => {
    const fetchData = [
        {
            allocation: 'Allocation',
            tokenSale: 'Token Sale'
        },
        {
            allocation: 'Allocation',
            tokenSale: 'Token Sale'
        },
        {
            allocation: 'Allocation',
            tokenSale: 'Token Sale'
        },
        {
            allocation: 'Allocation',
            tokenSale: 'Token Sale'
        },
        {
            allocation: 'Allocation',
            tokenSale: 'Token Sale'
        },
        {
            allocation: 'Allocation',
            tokenSale: 'Token Sale'
        },
    ]
    return (
        <Box display='flex' gap={3} sx={{ width: '100%' }}>
            <Box width='70%'>
                <Box sx={{
                    border: '1px solid #DEE0E2',
                    borderRadius: '8px',
                    width: '100%',
                    overflow: 'hidden',
                }}>
                    <Box sx={{
                        fontWeight: '600',
                        fontSize: '14px',
                        lineHeight: '160%',
                        color: '#787A9B',
                        padding: '9px 20px',
                        background: '#F7F7FB',
                    }}>
                        Token Sale
                    </Box>
                    {
                        fetchData?.map((item, index) => (
                            <Box component='p' display='flex' justifyContent='space-between' sx={{
                                padding: '20px',
                                borderTop: '1px solid #DEE0E2',
                            }}>
                                <Box component='p' sx={{
                                    color: '#787A9B',
                                    fontWeight: '400',
                                    fontSize: '16px',
                                    lineHeight: '160%',
                                }}>
                                    {item.allocation}
                                </Box>
                                <Box sx={{
                                    color: '#25273D',
                                    fontWeight: '600',
                                    fontSize: '16px',
                                    lineHeight: '160%',
                                }}>
                                    {item.tokenSale}
                                </Box>
                            </Box>
                        ))
                    }
                </Box>
            </Box>
            <Box width='30%'>
                <IDOProcess />
            </Box>
        </Box >
    )
}

export default VestingSchedule;