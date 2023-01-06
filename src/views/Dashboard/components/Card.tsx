import React from 'react'
import {
    Box,
    styled
} from '@mui/material'

const Card = styled(Box)`
    border-radius: 8px;
    border: 1px solid ${prop => (prop.theme.palette as any).extra.card.divider};
    background-color: ${prop => (prop.theme.palette as any).extra.card.background};
    width: fit-content;
    padding: 16px 24px;
`

export default Card