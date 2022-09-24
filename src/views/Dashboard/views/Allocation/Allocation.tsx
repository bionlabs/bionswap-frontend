import React from 'react'
import {
  Box,
  styled,
  Typography
} from '@mui/material'
import Page from 'components/Page';
import AllocationCard from 'components/AllocationCard';

const Allocation = () => {
  return (
    <Page>
      <Wrapper>
        <Typography variant='h3Samsung'>
          Active Allocation
        </Typography>
        <Box>
          <Item>
          <AllocationCard data={[]} />
          </Item>
        </Box>
      </Wrapper>
    </Page>
  )
}

const Wrapper = styled(Box)`
  width: 100%;
  padding: 30px 40px;
`
const Item = styled(Box)`
  max-width: 433px;
`

export default Allocation