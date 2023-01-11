import usePools from 'hooks/usePools';
import React from 'react'
import PairInfo from './PairInfo'
import {Stack , Divider} from '@mui/material'
import PairDetails from './PairDetails';

const PairSection = ({data}:any) => {
  const contractData = usePools(data.address, data.chainId);
  const poolData = {...data, ...contractData};

  return (
    <Stack alignItems='start' justifyContent='start' width='100%' divider={<Divider flexItem/>} spacing={2}>
      <PairInfo data={poolData}/>
      <PairDetails data={poolData}/>
    </Stack>
  )
}

export default PairSection