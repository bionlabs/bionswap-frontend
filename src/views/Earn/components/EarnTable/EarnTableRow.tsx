import React, { useEffect, useState } from 'react';
import { Stack, Typography , styled, Box} from '@mui/material'
import { StyledTableCell, StyledTableRow } from './components/components';
import Image from 'next/image';
import { Data, Order } from './types';
import { useChain } from 'hooks';
import {useToken} from 'hooks/useToken'
import { formatUnits } from 'ethers/lib/utils';
import { BUSD_ADDRESS, USDT_ADDRESS, USDC_ADDRESS } from '@bionswap/core-sdk';
import Link from 'next/link';
import getAddress from 'utils/getAddress';
import usePools from 'hooks/usePools';
import CurrencyLogo from 'components/CurrencyLogo';


const LaunchpadTableRow = ({pool , loading}:any) => {
  const [decimals, setDecimals] = useState(18);
  const {chainId} = useChain();
  const contractData = usePools(pool.address, pool.chainId);

  return (
    <Link href={`/earn/${pool.chainId}/${pool.address}`}>
        <StyledTableRow>
          <StyledTableCell component="th" scope="row">
            <Stack direction="row" justifyContent="start" spacing={2}>
              <Stack direction='row'>
                <WrapLogo>
                  <CurrencyLogo currency={contractData.stakingToken} size='30px'/>
                </WrapLogo>
                <WrapLogo sx={{marginLeft: '-12.5%'}}>
                  <CurrencyLogo currency={contractData.rewardsToken} size='30px'/>
                </WrapLogo>
              </Stack>
              <Stack alignItems="start">
                <Typography fontSize="inherit" fontWeight="inherit">
                  {pool.token.symbol}/{pool.quoteToken.symbol}
                </Typography>
                <Typography fontSize="10px" color="text.secondary" fontWeight="400">
                  Classic
                </Typography>
              </Stack>
            </Stack>
          </StyledTableCell>
          <StyledTableCell align="right">
            {contractData.totalSupply}
          </StyledTableCell>
          <StyledTableCell align="right">
            {contractData.currentStaking}
          </StyledTableCell>
          <StyledTableCell align="right">
            {contractData.earned}
          </StyledTableCell>
          <StyledTableCell align="right">
            {contractData.apr}%
          </StyledTableCell>
        </StyledTableRow>
    </Link>
  );
};

const WrapLogo = styled(Box)`
  background-color: ${(props) => (props.theme.palette as any).background.default};
  border-radius: 50%;
  position: relative;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: start;
`;

const Status = styled(Stack)`
  padding: 4px 8px;
  border-radius: 4px;
  line-height: 1;
`;



export default LaunchpadTableRow;
