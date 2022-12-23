import React, { useState } from 'react';
import { Box, styled, Stack, Typography, IconButton, Button } from '@mui/material';
import { HiX } from 'react-icons/hi';
import Image from 'next/image';
import { Connector } from 'wagmi';
import { useChain, useConnect } from 'hooks';
import { getConnectorIcon } from 'utils/connectors';

interface Props {
  toggleConnectorDrawer: any;
  handleConnectorConnected: any;
}

const ConnectorOptionsDrawer = ({ toggleConnectorDrawer, handleConnectorConnected }: Props) => {
  const [selectedConnector, setSelectedConnector] = useState<Connector | null>(null);
  const { chainId } = useChain();

  const {
    connect,
    connectors,
    error,
    isLoading: isConnectLoading,
    pendingConnector,
  } = useConnect({
    onSuccess: () => {
      handleConnectorConnected(selectedConnector!);
    },
  });
  return (
    <Box
      sx={{
        width: '100%',
        height: '90vh',
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
            Connect a wallet
          </Typography>
          <IconButton
            onClick={toggleConnectorDrawer(false)}
            sx={{ color: 'extra.walletModal.textSecondary', padding: 0 }}
          >
            <HiX />
          </IconButton>
        </Stack>
        <Stack width="100%" height="100%" alignItems="start" justifyContent="space-between" p="16px">
          <Stack width="100%" spacing={2} onClick={toggleConnectorDrawer(false)}>
            {connectors.map((connector) => (
              <DrawerConnectorItemButton
                key=""
                variant="outlined"
                fullWidth
                onClick={() => {
                  connect({ connector, chainId });
                  setSelectedConnector(connector);
                }}
              >
                <Stack direction="row" spacing={1}>
                  <Stack>
                    <Image src={getConnectorIcon(connector.id)} alt="" width={24} height={24} />
                  </Stack>
                  <Typography color="inherit" fontWeight="500">
                    {connector.name}
                  </Typography>
                </Stack>
              </DrawerConnectorItemButton>
            ))}
          </Stack>
          <Stack width="100%">
            <Typography fontSize="12px" color="text.secondary">
              By connecting wallet, you agree to our Terms of Service
            </Typography>
          </Stack>
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
  padding: 20px 16px;
  :hover {
    border: 1px solid ${(props) => (props.theme.palette as any).extra.walletModal.divider};
  }
`;

export default ConnectorOptionsDrawer;
