import React from "react";
import { Box } from "@mui/material";

interface TotalAvailableProps {
    title: string,
    value: string,
}

const TotalAvailable: React.FC<TotalAvailableProps> = ({ title, value }) => {
    return (
        <Box>
            <Box component='h3' sx={{
                color: '#E7A236',
                fontWeight: '600',
                fontSize: '14px',
                lineHeight: '160%',
                margin: '0'
            }}>
                {title}
            </Box>
            <Box component='h3' sx={{
                color: '#000000',
                fontWeight: '700',
                fontSize: '64px',
                lineHeight: '140%',
                margin: '0'
            }}>
                {value}
            </Box>
        </Box>
    )
}

export default TotalAvailable;