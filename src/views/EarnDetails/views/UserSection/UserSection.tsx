import React from 'react';
import { styled, Box, Stack, Typography, Divider, Button } from '@mui/material';
import Card from 'views/EarnDetails/components/Card/Card';
import usePools from 'hooks/usePools';
import { CurrencyLogo } from 'components';
import { useChain } from 'hooks';

const UserSection = ({ data }: any) => {
  const contractData = usePools(data.address, data.chainId);
  const poolData = { ...data, ...contractData };
  const {account} = useChain();

  return (
    <Stack width="100%" alignItems="start" gap="60px" justifyContent="start">
      <Stack width="100%" alignItems="start" spacing={2}>
        <Card width="100%" sx={{
          boxShadow: theme => (theme.palette as any).extra.table.boxShadow
        }}>
          <Stack width="100%" alignItems="start" justifyContent="start" spacing={2} divider={<Divider flexItem />}>
            <Stack direction="row" width="100%" justifyContent="space-between" gap="10px">
              <Typography fontSize={18} fontWeight={600}>
                My rewards
              </Typography>
              <Typography fontWeight={500}>$0.00</Typography>
            </Stack>
            <Stack direction="row" width="100%" justifyContent="space-between" gap="10px">
              <Stack direction="row" width="100%" justifyContent="start" spacing={1}>
                <CurrencyLogo currency={poolData.stakingToken} size="20px" />
                <Typography color="text.secondary" fontWeight={600}>
                  {poolData.earned} {poolData.rewardToken.symbol}
                </Typography>
              </Stack>
              <Typography fontSize={14} color="text.secondary">
                $0.00
              </Typography>
            </Stack>
          </Stack>
        </Card>
        <StyledButton
          variant='contained'
          size='large'
          fullWidth
        >
          {account ? 'Claim' : 'Connect Wallet'}
        </StyledButton>
      </Stack>

      <Stack width="100%" alignItems="start" spacing={2}>
        <Card width="100%" sx={{
          boxShadow: theme => (theme.palette as any).extra.table.boxShadow
        }}>
          <Stack width="100%" alignItems="start" justifyContent="start" spacing={2} divider={<Divider flexItem />}>
            <Stack direction="row" width="100%" justifyContent="space-between" gap="10px">
              <Typography fontSize={18} fontWeight={600}>
                Staked
              </Typography>
              <Typography fontWeight={500}>$0.00</Typography>
            </Stack>
            <Stack direction="row" width="100%" justifyContent="space-between" gap="10px">
              <Stack direction="row" width="100%" justifyContent="start" spacing={1}>
                <CurrencyLogo currency={poolData.stakingToken} size="20px" />
                <Typography color="text.secondary" fontWeight={600}>
                  {poolData.earned} {poolData.token.symbol}
                </Typography>
              </Stack>
              <Typography fontSize={14} color="text.secondary">
                $0.00
              </Typography>
            </Stack>
          </Stack>
        </Card>
        <Stack direction='row' width='100%' gap='10px'>
          <StyledButton
            variant='outlined'
            size='large'
            fullWidth
          >
            Withdraw
          </StyledButton>
          <StyledButton
            variant='contained'
            size='large'
            fullWidth
          >
            Deposite
          </StyledButton>
        </Stack>
        
      </Stack>
    </Stack>
  );
};

const StyledButton = styled(Button)`
  padding: 12.5px 20px;
`

export default UserSection;
