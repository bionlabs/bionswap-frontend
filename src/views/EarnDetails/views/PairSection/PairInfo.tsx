import React from 'react';
import { Box, styled, Stack, Typography } from '@mui/material';
import usePools from 'hooks/usePools';
import CurrencyLogo from 'components/CurrencyLogo';
import Image from 'next/image';
import { getChainIcon } from 'utils/chains';
import { CHAIN_INFO_MAP } from 'configs/chain';
import { useTokenWithChainId } from 'hooks';
import useMediaQuery from 'hooks/useMediaQuery';

const PairInfo = ({ data }: any) => {
  const stakingToken = useTokenWithChainId(data.stakingToken, data.chainId);
  const { isMobile } = useMediaQuery();

  return (
    <Stack alignItems="start" justifyContent="start" gap="10px" width="100%">
      <Stack direction="row" spacing={1}>
        <Stack>
          <Image src={getChainIcon(CHAIN_INFO_MAP[data.chainId].id)?.iconUrl} alt="" width={15} height={15} />
        </Stack>
        <Typography fontSize={12}>{CHAIN_INFO_MAP[data.chainId].name}</Typography>
      </Stack>
      <Stack
        direction={isMobile ? 'column' : 'row'}
        justifyContent="space-between"
        width="100%"
        alignItems="start"
        gap="15px"
      >
        <Stack direction="row" justifyContent="start" spacing={1}>
          <Stack direction="row" justifyContent="start">
            <WrapLogo>
              <CurrencyLogo currency={data.stakingToken} size="44px" />
            </WrapLogo>
            {data.quoteToken && (
              <WrapLogo sx={{ marginLeft: '-12.5%' }}>
                <CurrencyLogo currency={data.rewardsToken} size="44px" />
              </WrapLogo>
            )}
          </Stack>
          <Stack alignItems="start">
            <Typography fontSize={18} fontWeight={600}>
              {data.quoteToken ? (
                <>
                  {data.token.symbol}/{data.quoteToken.symbol}
                </>
              ) : (
                <>{data.token.symbol}</>
              )}
            </Typography>
            <Typography fontSize={12}>Fee: 0.3%</Typography>
          </Stack>
        </Stack>
        <Stack alignItems={isMobile ? 'start' : 'end'}>
          <Stack direction="row" spacing={1}>
            <Typography color="text.secondary">APR:</Typography>
            <Typography fontWeight={500}>{data.apr}%</Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography fontSize={14} color="text.secondary">
              Rewards: 0.00%
            </Typography>
            <Typography fontSize={14} color="text.secondary">
              Fees: 0.00%
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
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

export default PairInfo;
