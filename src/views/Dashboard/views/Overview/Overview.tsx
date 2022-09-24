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
import BalanceSection from './BalanceSection'
import { useAccount } from 'hooks'


const Overview = () => {
  const isMobile = useMediaQuery('(max-width:767px)');
  const isDesktop = useMediaQuery('(max-width:1467px)')
  
  const { address } = useAccount();

  return (
    <Page>
      <Wrapper padding={isMobile ? '40px 16px' : '40px'}>
        <Header isMobile={isMobile}/>
        <Layout sx={{
          marginTop: '42px', gridTemplateColumns: isDesktop ? 'auto' : 'auto auto',
          alignItems: "start"
        }}>
          <FundSection isMobile={isMobile}/>
          {
            address &&
            <BalanceSection isMobile={isMobile}/>
          }
          
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
  gap: 24px;
`


export default Overview