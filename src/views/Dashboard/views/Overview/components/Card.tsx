import React from 'react'
import {
    Box,
    styled
} from '@mui/material'

const Card = styled(Box)`
    border-radius: 8px;
    background: ${prop => prop.theme.palette.gray[900]};
    border: 1px solid #014959;
    width: fit-content;
    padding: 16px 24px;
`

export default Card