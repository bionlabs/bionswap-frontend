import React, { useState } from 'react';
import { Box, styled, Stack, Typography, IconButton, Button } from '@mui/material';
import { HiX } from 'react-icons/hi';
import Image from 'next/image';
import { Connector } from 'wagmi';
import { useChain, useConnect, useSwitchNetwork } from 'hooks';
import { getConnectorIcon } from 'utils/connectors';
import { CHAIN_INFO_MAP } from 'configs/chain';
import { getChainIcon } from 'utils/chains';

interface Props {
    toggleChainDrawer: any;
}

const ChainDrawer = ({ toggleChainDrawer }: Props) => {
  const [selectedConnector, setSelectedConnector] = useState<Connector | null>(null);
  const { chainId } = useChain();

  const { switchNetwork } = useSwitchNetwork({});

  
  return (
    <Box
      sx={{
        width: '100%',
        height: '80vh',
        backgroundColor: (theme) => (theme.palette as any).extra.walletModal.background,
        color: (theme) => (theme.palette as any).extra.walletModal.textPrimary,
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
      }}
    >
      <Stack width="100%" height="100%" alignItems="start">
        <Stack
          direction="row"
          justifyContent="space-between"
          width="100%"
          p="12.5px 16px"
          sx={{
            borderBottom: (theme) => `1px solid ${(theme.palette as any).extra.walletModal.divider}`,
          }}
        >
          <Typography fontSize="18px" fontWeight="500" color="inherit">
            Select a blockchain
          </Typography>
          <IconButton
            onClick={toggleChainDrawer(false)}
            sx={{ color: 'extra.walletModal.textSecondary', padding: 0 }}
          >
            <HiX />
          </IconButton>
        </Stack>
        <Stack width="100%" height="100%" alignItems="start" justifyContent="start" p="16px" overflow='auto'>
          <Box
            onClick={toggleChainDrawer(false)}
            sx={{
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px',
                width: '100%'
            }}
            >
            {Object.entries(CHAIN_INFO_MAP).map(([, chain]) => (
              <DrawerConnectorItemButton
                key=""
                variant="outlined"
                fullWidth
                onClick={() => {
                    switchNetwork?.(chain?.id);
                }}
              >
                <Stack direction="row" justifyContent="space-between" width="100%">
                  <Box display="flex" width="100%" alignItems="center" justifyContent="space-between">
                    <Stack direction='row' gap="10px">
                      <Image src={getChainIcon(chain.id)?.iconUrl} layout="fixed" alt="" width={24} height={24} />
                      <Typography fontSize="14px" fontWeight={500} color='inherit'>
                        {chain.name}
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>
              </DrawerConnectorItemButton>
            ))}
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};

const DrawerConnectorItemButton = styled(Button)`
  border-radius: 8px;
  border: 1px solid ${(props) => (props.theme.palette as any).extra.walletModal.divider};
  color: ${(props) => (props.theme.palette as any).extra.walletModal.textPrimary};
  justify-content: start;
  padding: 16px;
  :hover {
    border: 1px solid ${(props) => (props.theme.palette as any).extra.walletModal.divider};
  }
`;

export default ChainDrawer;
