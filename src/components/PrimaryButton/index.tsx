import React, { useEffect, useState } from 'react'
import { Box , Button } from "@mui/material";
import styled from '@emotion/styled';

interface PrimaryButtonProps {
    label?: string,
    color?: string,
    backgroundColor?: string,
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ label, color = 'text.secondary', backgroundColor = 'primary.main'  }) => {
    return (
        <Button
            variant='contained'
            sx={{
                color: color,
                backgroundColor: backgroundColor,
                fontSize: '16px',
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