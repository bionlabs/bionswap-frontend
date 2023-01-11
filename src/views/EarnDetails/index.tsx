import React, { Suspense, useCallback, useEffect, useState } from 'react'
import Page from 'components/Page'
import { useRouter } from 'next/router'
import Breadcrumbs from './components/Breadcrumbs/Breadcrumbs'
import {
  Container,
  Box,
  styled,
  Stack
} from '@mui/material'
import pools from 'configs/constants/mining/pools'
import useMediaQuery from 'hooks/useMediaQuery'
import PairSection from './views/PairSection/PairSection'
import UserSection from './views/UserSection/UserSection'
import { poolConfig } from 'configs/constants/types'
import LoadingPage from 'components/LoadingPage/LoadingPage'

const EarnDetail = () => {
  const router = useRouter();
  const {chain , address} = router.query;
  const [pool , setPool] = useState<poolConfig | undefined>();

  const getPool = async(address?:string) => {
    if(!address) return;
    try {
      const res = await pools.find(item => item.address == address);
      setPool(res)
    } catch (error) {
      console.log('error==>', error);
    }
  }

  useEffect(() => {
    getPool(address as string)
  },[address])

  const {isTablet} = useMediaQuery();

  return (
    <Page>
      <Box p='3rem 0'>
        <Container>
          <Stack alignItems='start' justifyContent='start' gap='60px'>
            <Breadcrumbs pair={pool ? pool.lpSymbol : ''} />
            <Layout gridTemplateColumns={isTablet ? '100%' : '7fr 4fr'}>
            {
              pool ?
              <>
                <PairSection data={pool} />
                <UserSection data={pool}/>
              </>
              : <LoadingPage/>
            }
            </Layout>
          </Stack>
        </Container>
      </Box>
    </Page>
  )
}

const Layout = styled(Box)`
  display: grid;
  width: 100%;
  gap: 3rem;
`

export default EarnDetail