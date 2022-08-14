import React, { useEffect, useState } from 'react'
import { Box , Button } from "@mui/material";
import styled from '@emotion/styled';

interface PrimaryButtonProps {
    label?: string,
    color?: string,
    backgroundColor?: string,
    variant?: any
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ label, color = 'text.secondary', backgroundColor = 'primary.main', variant='contained'}) => {
    return (
        <Button
            variant={variant}
            sx={{
                color: variant === 'outlined' ? 'primary' : color,
                backgroundColor: variant === 'outlined' ? 'transparent' : backgroundColor,
                fontSize: '16px',
                border: variant === 'outlined' ? '1px solid #07E0E0' : 'none',
                fontWeight: '500',
                lineHeight: '27px',
                padding: '10px',
                width: '100%',
                transition: 'all .3s ease',
                cursor: 'pointer',
                borderRadius: '4px',
            }}>
            {label}
        </Button>
    )
}

export default PrimaryButton;