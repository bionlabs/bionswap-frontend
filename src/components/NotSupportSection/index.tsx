import { ChainId } from '@bionswap/core-sdk';
import { useSwitchNetwork } from 'hooks';
import React from 'react';
import { Container, Typography, Box, MenuItem, Stack } from '@mui/material';
import { CHAIN_INFO_MAP } from 'configs/chain';
import Image from 'next/image';
import { getChainIcon } from 'utils/chains';

const NotSupportSection = () => {
  const { switchNetwork } = useSwitchNetwork({});

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          minHeight: '30vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h5Samsung" textAlign="center">
          This feature is not yet supported on this chain for now.
          <br />
          Please switch to these supported chain.
        </Typography>
        <Box mt='15px'>
          {Object.entries(CHAIN_INFO_MAP).map(([, chain]) =>
            chain.id === ChainId.BSC_TESTNET ? (
              <MenuItem
                sx={{
                  p: 2,
                  width: '100%',
                  borderBottom: '1px solid #787A9B',
                  ':last-child': {
                    borderBottom: 'none',
                  },
                }}
                key={chain.id}
                onClick={() => {
                  switchNetwork?.(chain?.id);
                }}
              >
                <Stack direction="row" justifyContent="space-between" width="100%">
                  <Box display="flex" width="100%" alignItems="center" justifyContent="space-between">
                    <Box display="flex" gap="10px" alignItems="center">
                      <Image src={getChainIcon(chain.id)?.iconUrl} layout="fixed" alt="" width={24} height={24} />
                      <Box fontSize="16px" fontWeight={600} color='text.primary'>
                        {chain.name}
                      </Box>
                    </Box>
                  </Box>
                </Stack>
              </MenuItem>
            ) : (
              <></>
            ),
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default NotSupportSection;
