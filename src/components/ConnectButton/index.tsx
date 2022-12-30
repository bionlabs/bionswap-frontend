import { Box, Button, SwipeableDrawer, styled, Typography, Stack } from '@mui/material';
import { useAccount, useNativeCurrencyBalances, useDisconnect } from 'hooks';
import useMediaQuery from 'hooks/useMediaQuery';
import { useEffect, useState } from 'react';
import { shortenAddress } from 'utils/format';
import { Connector } from 'wagmi';
import ConnectorOptionsModal from './ConnectorOptionsModal';
import { RiWallet3Fill } from 'react-icons/ri';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from 'state';
import { getUserInfo } from 'api/user';
import { logOut } from 'state/auth/actions';
import ProfileModal from './ProfileModal';
import ConnectorOptionsDrawer from './ConnectorOptionsDrawer';
import { getConnectorIcon } from 'utils/connectors';
import Image from 'next/image';

type Props = {};

const ConnectButton = () => {
  const { isMobile } = useMediaQuery();
  const [openConnectorsModal, setOpenConnectorsModal] = useState(false);
  const [openChainsModal, setOpenChainsModal] = useState(false);
  const [openProfileModal, setOpenProfileModal] = useState(false);

  const { address , connector: activeConnector } = useAccount();

  const [connectorDrawer, setConnectorDrawer] = useState(false);

  const toggleConnectorDrawer =
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

      setConnectorDrawer(open);
    };

  const dispatch = useAppDispatch();
  const { disconnect } = useDisconnect({
    onSuccess: () => {
      dispatch(logOut());
    },
  });

  const [userInfo, setUserInfo] = useState<any>(null);
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  useEffect(() => {
    const getUserInformation = async () => {
      try {
        if (!accessToken) return;

        const rest = await getUserInfo();
        setUserInfo(rest);
      } catch (error) {
        console.log('error====>', error);
      }
    };

    getUserInformation();
  }, [address, accessToken]);

  const [profileSlide, setProfileSlide] = useState(false);

  const handleConnectorConnected = (connector: Connector) => {
    setOpenConnectorsModal(false);
    gtag('event', 'Connector Connected', {
      event_category: 'Connector',
      event_label: connector.name,
    });
  };

  return (
    <>
      {!address ? (
        <ConnectWalletButton
          onClick={isMobile ? toggleConnectorDrawer(true) : () => setOpenConnectorsModal(true)}
          variant="contained"
          fullWidth
        >
          <Typography sx={{ fontSize: '14px', color: 'inherit', fontWeight: '500' }}>Connect Wallet</Typography>
        </ConnectWalletButton>
      ) : (
        <ProfileButton
          onClick={() => setOpenProfileModal(true)}
          // onClick={toggleDrawer(!profileSlide)}
          // href='/dashboard/overview'
          variant="contained"
          fullWidth
        >
          {activeConnector && (
            <Image src={getConnectorIcon(activeConnector.id)} layout="fixed" alt="" width={18} height={18} />
          )}
          <Typography fontSize="14px" fontWeight="500" color="inherit">
            {shortenAddress(address ?? '')}
          </Typography>
          {/* {activeConnector && (
            <Image src={getConnectorIcon(activeConnector.id)} layout="fixed" alt="" width={18} height={18} />
          )} */}
        </ProfileButton>
      )}

      <ConnectorOptionsModal
        onClose={() => setOpenConnectorsModal(false)}
        open={openConnectorsModal}
        onConnectorConnected={handleConnectorConnected}
      />
      <ProfileModal onClose={() => setOpenProfileModal(false)} open={openProfileModal} />
      <SwipeableDrawer
        anchor={'bottom'}
        open={connectorDrawer}
        onClose={toggleConnectorDrawer(false)}
        onOpen={toggleConnectorDrawer(true)}
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
        <ConnectorOptionsDrawer
          toggleConnectorDrawer={toggleConnectorDrawer}
          handleConnectorConnected={handleConnectorConnected}
        />
      </SwipeableDrawer>
    </>
  );
};

const ConnectWalletButton = styled(Button)`
  border-radius: 4px;
  text-transform: none;
  padding: 12px 25px;
  height: 42px;
  align-items: center;
  white-space: nowrap;
  // background: ${(props) => (props.theme.palette as any).extra.primaryButton.background};
  // color: ${(props) => (props.theme.palette as any).extra.primaryButton.color};
  transition: 0.12s ease-in;
  :hover {
    // background: ${(props) => (props.theme.palette as any).extra.primaryButton.background};
    // color: ${(props) => (props.theme.palette as any).extra.primaryButton.color};
    box-shadow: none;
  }
`;

const ProfileButton = styled(Button)`
  border-radius: 4px;
  text-transform: none;
  padding: 12px 25px;
  height: 42px;
  gap: 8px;
  align-items: center;
  white-space: nowrap;
  background: ${(props) => (props.theme.palette as any).extra.profileButton.background};
  color: ${(props) => props.theme.palette.text.primary};
  transition: 0.12s ease-in;
  :hover {
    background: ${(props) => (props.theme.palette as any).extra.profileButton.background};
    color: ${(props) => props.theme.palette.text.primary};
    box-shadow: none;
  }
  svg {
    width: 20px;
    height: 20px;
  }
`;

export default ConnectButton;
