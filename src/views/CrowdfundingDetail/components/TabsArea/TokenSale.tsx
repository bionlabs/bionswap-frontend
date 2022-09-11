import React from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import IDOProcess from "../IDOProcess";

interface TokenSaleProps {
    data: any,
    isMobile: boolean
}

const TokenSale: React.FC<TokenSaleProps> = ({ data, isMobile = false }) => {
    const fetchData = [
        {
            allocation: 'Sale Price',
            tokenSale: '1FOX = 0.5BUSD'
        },
        {
            allocation: 'Sale End Time',
            tokenSale: '06/22/2022 - 10:00:00 AM'
        },
        {
            allocation: 'Sale Start Time',
            tokenSale: '06/20/2022 - 10:00:00 AM'
        },
        {
            allocation: 'Token Distribution Time',
            tokenSale: '06/25/2022 - 10:00:00 AM'
        },
        {
            allocation: 'Token Address',
            tokenSale: '0xdfd7b0dd7bf1012dfdf3307a964c36b972300ac8'
        },
        {
            allocation: 'Contract Address',
            tokenSale: '0x49D4008930ABb6AD1e25E2C19B78230157B756B7'
        },
    ]
    return (
        <Box display='flex' gap={3} sx={{ width: '100%' }} flexDirection={isMobile ? 'column' : 'row'}>
            <Box width={isMobile ? '100%' : '70%'}>
                <Box sx={{
                    border: '1px solid',
                    borderColor: 'gray.700',
                    borderRadius: '8px',
                    width: '100%',
                    overflow: 'hidden',
                    backgroundColor: 'gray.900',
                }}>
                    <Box sx={{
                        padding: '9px 20px',
                        background: '#001015',
                    }}>
                        <Typography variant="body4Poppins" fontWeight='500' color='primary.main' >
                            Token Sale
                        </Typography>
                    </Box>
                    {
                        fetchData?.map((item, index) => (
                            <Box key={index} component='p' display='flex' justifyContent='space-between' sx={{
                                padding: '20px',
                                borderTop: '1px solid',
                                borderColor: 'gray.700'

                            }}>
                                <Typography variant="body3Poppins" fontWeight='400' color='gray.400' >
                                    {item.allocation}
                                </Typography>
                                <Typography variant="body3Poppins" fontWeight='400' color='text.primary' >
                                    {item.tokenSale}
                                </Typography>
                            </Box>
                        ))
                    }
                </Box>
            </Box>
        </Box >
    )
}

export default TokenSale;