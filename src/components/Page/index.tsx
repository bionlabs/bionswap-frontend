import React from 'react'
import { Box , styled } from '@mui/material'

const Page = styled(Box)`
    min-height: 100vh;
    background-color: ${prop => prop.theme.palette.background.default};
    color: ${prop => prop.theme.palette.text.primary};
`

export default Page