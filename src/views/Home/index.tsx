import React from 'react'
import {
    Box,
    Container
} from '@mui/material'
import styled from '@emotion/styled'

const Homepage = () => {
  return (
    <Page>
        <Container>
            Hello Home
        </Container>
    </Page>
  )
}

const Page = styled(Box)`
    min-height: 100vh;
    padding-top: 78px;
`

export default Homepage