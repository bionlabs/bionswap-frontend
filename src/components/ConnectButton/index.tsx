import { Box, Stack, Typography, Button , useMediaQuery } from "@mui/material";
import styled from "@emotion/styled";
import {BsFillCaretDownFill} from 'react-icons/bs'
import {IoWallet} from 'react-icons/io5'
import { useState } from "react";
import { Chain, Connector } from "wagmi";

import { useNetwork , useAccount } from "hooks";
import ChainOptionsModal from "./ChainOptionsModal";
import ConnectorOptionsModal from "./ConnectorOptionsModal";
import { chains } from "configs/chain";
import { getChainIcon } from "utils";
import Image from "next/image";
import formatAccount from "hooks/formatAccount";

type Props = {};

const ConnectButton = (props: Props) => {
  const isMobile = useMediaQuery('(max-width:1155px)');
  const [openConnectorsModal, setOpenConnectorsModal] = useState(false);
  const [openChainsModal, setOpenChainsModal] = useState(false);
  const [selectedChain, setSelectedChain] = useState<Chain | null>(chains[0]);
  const {address} = useAccount()

  const { chain: connectedChain } = useNetwork();

  const handleChainSwitched = (chain: Chain) => {
    setOpenChainsModal(false);
    setSelectedChain(chain);
  };

  const handleChainSelected = (chain: Chain) => {
    setOpenChainsModal(false);
    setSelectedChain(chain);
  };

  const handleConnectorConnected = (connector: Connector) => {
    setOpenConnectorsModal(false);
  };

  return (
    <>
      <Stack direction={isMobile ? 'column' : "row"} gap={2}>
        <ChainButton
          onClick={() => setOpenChainsModal(true)}
          variant="contained"
          endIcon={<BsFillCaretDownFill color='#25273D' />}
        >
          <Stack direction="row" gap={1} alignItems="center">
            <Image
              src={getChainIcon(selectedChain!.id).iconUrl}
              layout="fixed"
              alt=''
              width={24}
              height={24}
            />
            <Box>{selectedChain?.name}</Box>
          </Stack>
        </ChainButton>
        {!address ?
            <ConnectWalletButton
              onClick={() => setOpenConnectorsModal(true)}
              variant="contained"
            >
              <Box>Connect Wallet</Box>
            </ConnectWalletButton>
          :
            <ConnectWalletButton
              // onClick={() => setOpenConnectorsModal(true)}
              variant="contained"
              endIcon={<IoWallet color='#fff'/>}
            >
              <Box>{formatAccount(address ?? '')}</Box>
            </ConnectWalletButton>
        }
      </Stack>

      <ChainOptionsModal
        open={openChainsModal}
        onClose={() => setOpenChainsModal(false)}
        onChainSelected={handleChainSelected}
        onChainSwitched={handleChainSwitched}
        selectToSwitch={!!connectedChain}
      />

      <ConnectorOptionsModal
        chain={selectedChain}
        onClose={() => setOpenConnectorsModal(false)}
        open={openConnectorsModal}
        onConnectorConnected={handleConnectorConnected}
      />
    </>
  );
};

const ChainButton = styled(Button)`
    border-radius: 999px;
    min-width: fit-content;
    padding: 8.5px 24px;
    box-shadow: none;
    text-transform: none;
    font-family: inherit;
    font-weight: 600;
    align-items: center;
    background-color: #f2f2f2;
    border: none;
    color: #25273D;
    transition: 0.15s ease-in;
    line-height: 1;
    svg {
      width: 12px;
      height: 12px;
    }
    :hover {
        box-shadow: none;
        background-color: #f2f2f2;
        opacity: .9;
        border: none;
    }
`

const ConnectWalletButton = styled(Button)`
    border-radius: 999px;
    min-width: fit-content;
    padding: 8.5px 48px;
    box-shadow: none;
    text-transform: none;
    font-family: inherit;
    font-weight: 600;
    align-items: center;
    background-color: #25273D;
    color: #fff;
    transition: 0.15s ease-in;
    line-height: 1;
    svg {
      width: 20px;
      height: 20px;
    }
    :hover {
        background-color: #25273D;
        opacity: .9;
        box-shadow: none;
    }
`

export default ConnectButton;
