import React from 'react';
import { Stack, Typography, styled, Box } from '@mui/material';
import { StyledTableCell, StyledTableRow } from './components/components';
import Link from 'next/link';
import Image from 'next/image';
import usePools from 'hooks/usePools';
import CurrencyLogo from 'components/CurrencyLogo';
import { getChainIcon } from 'utils/chains';
import { CHAIN_INFO_MAP } from 'configs/chain';

const LaunchpadTableRow = ({ pool, loading }: any) => {
  const contractData = usePools(pool.address, pool.chainId);

  return (
    <Link href={`/earn/${pool.chainId}?address=${pool.address}`} legacyBehavior>
      <StyledTableRow>
        <StyledTableCell component="th" scope="row">
          <Stack width="fit-content">
            <Image
              src={getChainIcon(CHAIN_INFO_MAP[pool.chainId].id)?.iconUrl}
              layout="fixed"
              alt=""
              width={25}
              height={25}
            />
          </Stack>
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          <Stack direction="row" justifyContent="start" spacing={1}>
            <Stack direction="row" justifyContent="start">
              <WrapLogo>
                <CurrencyLogo currency={contractData.stakingToken} size="30px" />
              </WrapLogo>
              {pool.quoteToken && (
                <WrapLogo sx={{ marginLeft: '-12.5%' }}>
                  <CurrencyLogo currency={contractData.rewardsToken} size="30px" />
                </WrapLogo>
              )}
            </Stack>
            <Stack alignItems="start">
              <Typography fontSize="inherit" fontWeight="inherit">
                {pool.quoteToken ? (
                  <>
                    {pool.token.symbol}/{pool.quoteToken.symbol}
                  </>
                ) : (
                  <>{pool.token.symbol}</>
                )}
              </Typography>
              <Typography fontSize="10px" color="text.secondary" fontWeight="400">
                {pool.type}
              </Typography>
            </Stack>
          </Stack>
        </StyledTableCell>
        <StyledTableCell align="right">{contractData.totalSupply}</StyledTableCell>
        <StyledTableCell align="right">{contractData.currentStaking}</StyledTableCell>
        <StyledTableCell align="right">{contractData.earned}</StyledTableCell>
        <StyledTableCell align="right">{contractData.apr}%</StyledTableCell>
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
