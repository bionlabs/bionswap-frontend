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
          endIcon={<BsFillCaretDownFill color="#0b0b0b" />}
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
          >
            <Box>Connect Wallet</Box>
          </ConnectWalletButton>
        ) : (
          <ProfileButton
            onClick={() => setOpenProfileModal(true)}
            variant="contained"
          >
            {/* <IoWallet color='#0b0b0b'/> */}
            <Image
              src={activeConnector ? getConnectorIcon(activeConnector.id) : "/"}
              layout="fixed"
              alt=""
              width={22}
              height={22}
            />
            <Box>{shortenAddress(address ?? "")}</Box>
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
  border-radius: 999px;
  min-width: fit-content;
  padding: 8.5px 24px;
  box-shadow: none;
  min-height: 41px;
  text-transform: none;
  font-family: inherit;
  font-weight: 600;
  align-items: center;
  background-color: #f2f2f2;
  border: none;
  color: #0b0b0b;
  transition: 0.15s ease-in;
  line-height: 1;
  svg {
    width: 12px;
    height: 12px;
  }
  :hover {
    box-shadow: none;
    background-color: #f2f2f2;
    opacity: 0.9;
    border: none;
  }
`;

const ConnectWalletButton = styled(Button)`
  border-radius: 999px;
  min-width: fit-content;
  padding: 8.5px 48px;
  box-shadow: none;
  text-transform: none;
  font-family: inherit;
  font-weight: 600;
  align-items: center;
  min-height: 41px;
  background-color: #0b0b0b;
  color: #fff;
  transition: 0.15s ease-in;
  line-height: 1;
  svg {
    width: 20px;
    height: 20px;
  }
  :hover {
    background-color: #0b0b0b;
    opacity: 0.9;
    box-shadow: none;
  }
`;
const ProfileButton = styled(Button)`
  border-radius: 999px;
  min-width: fit-content;
  padding: 8.5px 28px;
  box-shadow: none;
  text-transform: none;
  font-family: inherit;
  font-weight: 600;
  align-items: center;
  min-height: 41px;
  background-color: transparent;
  border: 1px solid rgb(225, 227, 234);
  color: #0b0b0b;
  transition: 0.15s ease-in;
  line-height: 1;
  gap: 5px;
  svg {
    width: 20px;
    height: 20px;
  }
  :hover {
    background-color: #f9f9f9;
    box-shadow: none;
  }
`;

export default ConnectButton;
