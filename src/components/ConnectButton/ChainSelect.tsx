import React, { useState } from 'react';
import { Box, FormControl, MenuItem, Select, Stack, styled, Typography, Button, Modal, SwipeableDrawer } from '@mui/material';
import { useChain, useSwitchNetwork } from 'hooks';
import { CHAIN_INFO_MAP } from 'configs/chain';
import { getChainIcon } from 'utils/chains';
import Image from 'next/image';
import useMediaQuery from 'hooks/useMediaQuery';
import ChainOptionsModal from './ChainOptionsModal';
import { Chain } from 'wagmi';
import ChainDrawer from './ChainDrawer';

const ChainSelect = () => {
  const [chain, setChain] = useState('');
  const { isMobile } = useMediaQuery();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { chainId } = useChain();
  const [chainDrawer, setChainDrawer] = useState(false);
  const toggleChainDrawer =
    (open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setChainDrawer(open);
    };

  return (
    <Box width='100%'>
      <ChainSelectButton variant="contained" fullWidth onClick={isMobile ? toggleChainDrawer(true) : handleOpen}>
        <Stack direction="row" spacing={1} justifyContent='start'>
          <Stack>
            <Image src={getChainIcon(CHAIN_INFO_MAP[chainId].id)?.iconUrl} layout="fixed" alt="" width={18} height={18} />
          </Stack>
          <Typography fontSize="14px" fontWeight='500' color="inherit" lineHeight={1}>
            {CHAIN_INFO_MAP[chainId].name}
          </Typography>
        </Stack>
      </ChainSelectButton>
      <ChainOptionsModal
        open={open}
        onClose={handleClose}
      />
      <SwipeableDrawer
        anchor={'bottom'}
        open={chainDrawer}
        onClose={toggleChainDrawer(false)}
        onOpen={toggleChainDrawer(true)}
        sx={{
          '&.MuiModal-root.MuiDrawer-root': {
            zIndex: '1300',
            '.MuiPaper-root': {
              borderTopLeftRadius: '8px',
              borderTopRightRadius: '8px',
            },
          },
        }}
      >
        <ChainDrawer
          toggleChainDrawer={toggleChainDrawer}
        />
      </SwipeableDrawer>
    </Box>
  );
};

const ChainSelectButton = styled(Button)`
  border-radius: 4px;
  text-transform: none;
  padding: 12px 25px;
  height: 42px;
  align-items: center;
  white-space:nowrap;
  background: ${(props) => (props.theme.palette as any).extra.plainButton.background};
  color: ${(props) => (props.theme.palette as any).extra.plainButton.color};
  transition: 0.12s ease-in;
  :hover {
    background: ${(props) => (props.theme.palette as any).extra.plainButton.background};
    color: ${(props) => (props.theme.palette as any).extra.plainButton.color};
    box-shadow: none;
  }
`;

export default ChainSelect;
