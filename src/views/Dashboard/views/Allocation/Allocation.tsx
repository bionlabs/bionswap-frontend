import React from 'react'
import {
  Box,
  styled,
  Typography
} from '@mui/material'
import Page from 'components/Page';

const Allocation = () => {
  return (
    <Page>
      <Wrapper>
        <Typography variant='h3Samsung'>
          Active Allocation
        </Typography>
      </Wrapper>
    </Page>
  )
}

const Wrapper = styled(Box)`
  width: 100%;
  padding: 30px 40px;
`

export default Allocation