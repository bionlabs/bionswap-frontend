import React from 'react'
import {
    Box,
    styled,
    Stack,
    Container
} from '@mui/material'
import Sidebar from './Sidebar';
import useMediaQuery from 'hooks/useMediaQuery';

const Layout = ({children}:any) => {
  return (
    <Stack 
      sx={{
        height: '100%',
        minHeight: 'inherit',
        width: '100%',
        marginTop: '40px'
      }}
      direction='row'
      alignItems='start'
    >
        <Container>
          {children}
        </Container>
        {/* <Sidebar /> */}
    </Stack>
  )
}

export default Layout