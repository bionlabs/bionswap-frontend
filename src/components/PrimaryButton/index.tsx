import React, { useEffect, useState } from 'react'
import { Box } from "@mui/material";

interface PrimaryButtonProps {
    label: string,
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ label }) => {
    return (
        <Box component='button'
            sx={{
                color: '#FFFFFF',
                fontWeight: '600',
                fontSize: '16px',
                lineHeight: '27px',
                fontFamily: 'Inter',
                padding: '12px',
                border: '1px solid #F1F1F1',
                borderRadius: '31px',
                background: '#25273D',
                width: '100%',
                transition: 'all .3s ease',
                cursor: 'pointer',

                '&:hover': {
                    border: '1px solid #25273D',
                    background: '#F1F1F1',
                    color: '#25273D',
                }
            }}>
            {label}
        </Box>
    )
}

export default PrimaryButton;