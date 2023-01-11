import React from 'react'
import {Box , styled} from '@mui/material'

const Card = styled(Box)`
    background-color: ${props => (props.theme.palette as any).extra.card.background};
    border-radius: 8px;
    border: 1px solid ${props => (props.theme.palette as any).extra.card.divider};
    padding: 16px;
`

export default Card