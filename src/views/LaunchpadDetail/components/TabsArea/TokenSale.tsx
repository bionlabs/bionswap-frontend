import React from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import IDOProcess from "../IDOProcess";
import { formatEther } from "ethers/lib/utils";

interface TokenSaleProps {
    data: any,
    isMobile: boolean,
    unit: string,
    tokenContract: any,
}

const TokenSale: React.FC<TokenSaleProps> = ({ data, isMobile = false, unit, tokenContract }) => {
    const startTime = data?.startTime;
    const endTime = data?.endTime;

    const fetchData = [
        {
            allocation: 'Sale Price',
            tokenSale: `1 ${tokenContract?.symbol} = ${formatEther(data?.listingPrice || 0)} ${unit}`
        },
        {
            allocation: 'Sale Start Time',
            tokenSale: `${new Date(startTime).toUTCString()}`
        },
        {
            allocation: 'Sale End Time',
            tokenSale: `${new Date(endTime).toUTCString()}`
        },
        {
            allocation: 'Token Address',
            tokenSale: `${data?.token}`
        },
        {
            allocation: 'Contract Address',
            tokenSale: `${data?.saleAddress}`
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
                            <Box key={index} display='flex' justifyContent='space-between' sx={{
                                padding: '20px',
                                borderTop: '1px solid',
                                borderColor: 'gray.700',
                                flexDirection: {xs: 'column', md: 'row'}
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