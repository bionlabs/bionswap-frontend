import React from 'react'
import { Box , styled } from '@mui/material'
import { MENU_HEIGHT } from 'configs/menu/config'

const Page = styled(Box)`
    min-height: 100vh;
    background: ${prop => (prop.theme.palette as any).extra.background.linear};
    background-color: ${prop => prop.theme.palette.background.default};
    padding: ${MENU_HEIGHT}px 0;
    color: ${prop => prop.theme.palette.text.primary};
`

export default Page