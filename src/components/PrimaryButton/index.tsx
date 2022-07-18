import React, { useEffect, useState } from 'react'
import { Box , Button } from "@mui/material";
import styled from '@emotion/styled';

interface PrimaryButtonProps {
    label?: string,
    isMobile?: boolean,
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ label, isMobile = false  }) => {
    return (
        <StyledButton
            variant='contained'
            sx={{
                color: '#FFFFFF',
                fontSize: isMobile ? '14px' : '16px',
                padding: '12px',
                textTransform: 'none',
                width: '100%',
                transition: 'all .3s ease',
                cursor: 'pointer',
            }}>
            {label}
        </StyledButton>
    )
}

const StyledButton = styled(Button)`
    font-family: inherit;
    box-shadow: none;
    background-color: #0b0b0b;
    border-radius: 999px;
    font-weight: 500;
    :hover {
        box-shadow: none;
        background-color: #0b0b0b;
        opacity: .9;
    }
`

export default PrimaryButton;