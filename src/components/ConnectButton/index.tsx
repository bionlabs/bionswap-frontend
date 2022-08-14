import styled from "@emotion/styled";
import { Box, Button, Stack, useMediaQuery } from "@mui/material";
import { CHAIN_INFO_MAP } from "configs/chain";
import { useAccount, useChain } from "hooks";
import Image from "next/image";
import { useState } from "react";
import { BsFillCaretDownFill } from "react-icons/bs";
import { getChainIcon } from "utils/chains";
import { getConnectorIcon } from "utils/connectors";
import { shortenAddress } from "utils/format";
import ChainOptionsModal from "./ChainOptionsModal";
import ConnectorOptionsModal from "./ConnectorOptionsModal";
import ProfileModal from "./ProfileModal";

type Props = {};

const ConnectButton = (props: Props) => {
  const isMobile = useMediaQuery("(max-width:1155px)");
  const [openConnectorsModal, setOpenConnectorsModal] = useState(false);
  const [openChainsModal, setOpenChainsModal] = useState(false);
  const [openProfileModal, setOpenProfileModal] = useState(false);

  const { chainId } = useChain();
  const { address, connector: activeConnector } = useAccount();

  const handleChainSwitched = () => {
    setOpenChainsModal(false);
  };

  const handleChainSelected = () => {
    setOpenChainsModal(false);
  };

  const handleConnectorConnected = () => {
    setOpenConnectorsModal(false);
  };

  return (
    <>
      <Stack direction={isMobile ? "column" : "row"} gap={2}>
        <ChainButton
          onClick={() => setOpenChainsModal(true)}
          variant="contained"
          fullWidth={isMobile}
          endIcon={<BsFillCaretDownFill color="#FBB03B" />}
        >
          <Stack direction="row" gap={1} alignItems="center">
            <Image
              src={getChainIcon(chainId)?.iconUrl ? getChainIcon(chainId)?.iconUrl : "/"}
              layout="fixed"
              alt=""
              width={24}
              height={24}
            />
            <Box>{CHAIN_INFO_MAP[chainId]?.name}</Box>
          </Stack>
        </ChainButton>
        {!address ? (
          <ConnectWalletButton
            onClick={() => setOpenConnectorsModal(true)}
            variant="contained"
            fullWidth={isMobile}
          >
            <Box>Connect Wallet</Box>
          </ConnectWalletButton>
        ) : (
          <ProfileButton
            onClick={() => setOpenProfileModal(true)}
            variant="contained"
            fullWidth={isMobile}
          >
            {/* <IoWallet color='#0b0b0b'/> */}
            <Box>
              5 BNB
            </Box>
            <Box sx={{
              display: 'flex',alignItems:'center', gap:'8px',
              backgroundColor: '#012D44', height: '35px', padding: '5px 12px',
              borderRadius: '4px'
            }}>
              <Box>{shortenAddress(address ?? "")}</Box>
              <Image
                src={activeConnector ? getConnectorIcon(activeConnector.id) : "/"}
                layout="fixed"
                alt=""
                width={20}
                height={20}
              />
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
      <ProfileModal
        onClose={() => setOpenProfileModal(false)}
        open={openProfileModal}
      />
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
  background-color: #000B0D;
  align-items: center;
  border: 1px solid #6B4F03;
  color: #FBB03B;
  transition: 0.15s ease-in;
  line-height: 1;
  svg {
    width: 12px;
    height: 12px;
  }
  :hover {
    color: #FBB03B;
    border: 1px solid #6B4F03;
    background-color: #000B0D;
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
  color: #07E0E0;
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
  padding: 5px 5px 5px 12px;
  box-shadow: none;
  text-transform: none;
  font-family: inherit;
  font-weight: 500;
  align-items: center;
  background-color: #000;
  color: #fff;
  transition: 0.15s ease-in;
  line-height: 1;
  gap: 8px;
  svg {
    width: 20px;
    height: 20px;
  }
  :hover {
    background-color: #000;
    box-shadow: none;
  }
`;

export default ConnectButton;
