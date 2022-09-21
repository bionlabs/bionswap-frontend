import Page from 'components/Page'
import React from 'react'
import {
  styled,
  Box,
  Typography,
  useMediaQuery
} from '@mui/material'
import Header from './components/Header'
import FundSection from './FundSection'


const Overview = () => {
  const isMobile = useMediaQuery('(max-width:767px)');

  return (
    <Page>
      <Wrapper padding={isMobile ? '40px 16px' : '40px'}>
        <Header isMobile={isMobile}/>
        <Layout sx={{
          marginTop: '42px', gridTemplateColumns: isMobile ? '100%' : '59% 39%'
        }}>
          <FundSection isMobile={isMobile}/>
          <Box>
            Hello
          </Box>
        </Layout>
        
      </Wrapper>
    </Page>
  )
}

const Wrapper = styled(Box)`
  width: 100%;
`
const Layout = styled(Box)`
  display: grid;
  gap: 42px;
`


export default Overview