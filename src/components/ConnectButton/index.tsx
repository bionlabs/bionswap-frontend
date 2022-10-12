import { Box, Button, Drawer, Stack, styled, useMediaQuery } from '@mui/material';
import { useAccount, useChain, useNativeCurrencyBalances } from 'hooks';
import Image from 'next/image';
import { useState } from 'react';
import { getConnectorIcon } from 'utils/connectors';
import { shortenAddress } from 'utils/format';
import { Chain, Connector } from 'wagmi';
import ChainOptionsModal from './ChainOptionsModal';
import ChainSelect from './ChainSelect';
import ConnectorOptionsModal from './ConnectorOptionsModal';
import SidebarProfileMenu from './SidebarProfileMenu';

type Props = {};

const ConnectButton = (props: Props) => {
  const isMobile = useMediaQuery('(max-width:1224px)');
  const [openConnectorsModal, setOpenConnectorsModal] = useState(false);
  const [openChainsModal, setOpenChainsModal] = useState(false);
  const [openProfileModal, setOpenProfileModal] = useState(false);

  const { chainId } = useChain();
  const { address, connector: activeConnector } = useAccount();
  const balance = useNativeCurrencyBalances(address ? [address] : [])?.[address ?? ''];

  const [profileSlide, setProfileSlide] = useState(false);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setProfileSlide(open);
  };

  const handleChainSwitched = (chain: Chain) => {
    setOpenChainsModal(false);
    gtag('event', 'Switch', {
      event_category: 'Chain',
      event_label: chain.name,
    });
  };

  const handleChainSelected = () => {
    setOpenChainsModal(false);
  };

  const handleConnectorConnected = (connector: Connector) => {
    setOpenConnectorsModal(false);
    gtag('event', 'Connector Connected', {
      event_category: 'Connector',
      event_label: connector.name,
    });
  };

  return (
    <>
      <Stack direction={isMobile ? 'column' : 'row'} gap={2}>
        {/* <ChainButton
          onClick={() => setOpenChainsModal(true)}
          variant="contained"
          // fullWidth={isMobile}
          endIcon={<BsFillCaretDownFill color="#fff" />}
        >
          <Stack direction="row" gap={1} alignItems="center">
            <Image
              src={getChainIcon(chainId)?.iconUrl ? getChainIcon(chainId)?.iconUrl : '/'}
              layout="fixed"
              alt=""
              width={24}
              height={24}
            />
            <Box>{CHAIN_INFO_MAP[chainId]?.name}</Box>
          </Stack>
        </ChainButton> */}
        <ChainSelect />
        {!address ? (
          <ConnectWalletButton onClick={() => setOpenConnectorsModal(true)} variant="contained" fullWidth={isMobile}>
            <Box>Connect Wallet</Box>
          </ConnectWalletButton>
        ) : (
          <ProfileButton
            // onClick={() => setOpenProfileModal(true)}
            onClick={toggleDrawer(!profileSlide)}
            variant="contained"
            // fullWidth={isMobile}
          >
            <Box p="5px 5px 5px 15px">
              {balance ? `${balance.toFixed(3)} ${balance.currency.symbol}` : 'Loading...'}
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'gray.800',
                height: 'inherit',
                padding: '5px 12px',
                borderRadius: '4px',
                transition: '.12s ease-in',
              }}
            >
              <Box>{shortenAddress(address ?? '')}</Box>
              {activeConnector && (
                <Image src={getConnectorIcon(activeConnector.id)} layout="fixed" alt="" width={20} height={20} />
              )}
            </Box>
          </ProfileButton>
        )}
      </Stack>

      <ChainOptionsModal
        open={openChainsModal}
        onClose={() => setOpenChainsModal(false)}
        onChainSelected={handleChainSelected}
        onChainSwitched={handleChainSwitched}
      />

      <ConnectorOptionsModal
        onClose={() => setOpenConnectorsModal(false)}
        open={openConnectorsModal}
        onConnectorConnected={handleConnectorConnected}
      />
      {/* <ProfileModal
        onClose={() => setOpenProfileModal(false)}
        open={openProfileModal}
      /> */}
      <Drawer anchor="right" open={profileSlide} onClose={toggleDrawer(false)}>
        <SidebarProfileMenu toggleDrawer={toggleDrawer} address={address} balance={balance} />
      </Drawer>
    </>
  );
};

const ChainButton = styled(Button)`
  border-radius: 4px;
  min-width: fit-content;
  padding: 8.5px 24px;
  box-shadow: none;
  min-height: 41px;
  text-transform: none;
  font-family: inherit;
  font-weight: 500;
  background-color: ${(prop) => prop.theme.palette.primary.dark};
  align-items: center;
  // border: 1px solid ${(prop) => (prop.theme.palette as any).warning.main};
  border: 1px solid ${(prop) => (prop.theme.palette as any).gray[800]};
  color: ${(prop) => prop.theme.palette.text.primary};
  transition: 0.15s ease-in;
  line-height: 1;
  svg {
    width: 12px;
    height: 12px;
  }
  :hover {
    // color: ${(prop) => prop.theme.palette.primary.main};
    // border: 1.5px solid #066C6C;
    background-color: ${(prop) => (prop.theme.palette as any).gray[800]};
  }
`;

const ConnectWalletButton = styled(Button)`
  border-radius: 4px;
  min-width: fit-content;
  padding: 8.5px 48px;
  box-shadow: none;
  text-transform: none;
  font-family: inherit;
  font-weight: 500;
  align-items: center;
  min-height: 41px;
  background-color: rgba(61, 255, 255, 0.1);
  color: #07e0e0;
  transition: 0.15s ease-in;
  line-height: 1;
  svg {
    width: 20px;
    height: 20px;
  }
  :hover {
    background-color: rgba(61, 255, 255, 0.2);
    box-shadow: none;
  }
`;
const ProfileButton = styled(Button)`
  border-radius: 4px;
  min-width: fit-content;
  // padding: 5px 5px 5px 12px;
  height: 42px;
  padding: 0;
  box-shadow: none;
  text-transform: none;
  font-family: inherit;
  font-weight: 500;
  align-items: center;
  background-color: ${(prop) => (prop.theme.palette as any).primary.dark};
  color: #fff;
  transition: 0.15s ease-in;
  line-height: 1;
  gap: 8px;
  border: 1px solid ${(prop) => (prop.theme.palette as any).gray[800]};
  svg {
    width: 20px;
    height: 20px;
  }
  :hover {
    background-color: ${(prop) => (prop.theme.palette as any).gray[800]};
    box-shadow: none;
  }
`;

export default ConnectButton;
