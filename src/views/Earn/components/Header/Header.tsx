import React from 'react';
import { Box, styled, Typography, Stack, Button } from '@mui/material';
import useMediaQuery from 'hooks/useMediaQuery';
import { useRouter } from 'next/router';

const Header = () => {
  const { isMobile } = useMediaQuery();
  const router = useRouter();
  return (
    <Stack width="100%" direction={isMobile ? 'column' : 'row'} justifyContent="space-between" gap="20px">
      <Stack alignItems="start">
        <Typography fontSize="44px" fontWeight="700">
          Earn
        </Typography>
        <Typography fontSize="20px" color="text.secondary" fontWeight="500">
          Providing liquidity to get more rewards
        </Typography>
      </Stack>
      <Stack alignItems="start" spacing={2}>
        <Button
          variant="contained"
          size="large"
          sx={{
            width: '150px',
          }}
          onClick={() => router.push('/earn/add')}
        >
          New Pool
        </Button>
        <Button
          variant="outlined"
          size="large"
          sx={{
            width: '150px',
          }}
        >
          Custom Pool
        </Button>
      </Stack>
    </Stack>
  );
};

export default Header;
