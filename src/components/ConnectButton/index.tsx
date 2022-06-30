import { Box, Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Chain, Connector } from "wagmi";

import { useNetwork } from "../../hooks";
import ChainOptionsModal from "./ChainOptionsModal";
import ConnectorOptionsModal from "./ConnectorOptionsModal";
import { chains } from "../../configs/chain";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { getChainIcon } from "../../utils";
import Image from "next/image";

type Props = {};

const ConnectButton = (props: Props) => {
  const [openConnectorsModal, setOpenConnectorsModal] = useState(false);
  const [openChainsModal, setOpenChainsModal] = useState(false);
  const [selectedChain, setSelectedChain] = useState<Chain | null>(chains[0]);

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
      <Stack direction={"row"} gap={2}>
        <Button
          onClick={() => setOpenChainsModal(true)}
          variant="text"
          disableTouchRipple
          sx={{
            textTransform: "none",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            "&:hover": {
              transform: "matrix(1.025, 0, 0, 1.025, 0, 0)",
            },
          }}
          endIcon={<KeyboardArrowDownIcon />}
        >
          <Stack direction="row" gap={2} alignItems="center">
            <Image
              src={getChainIcon(selectedChain!.id).iconUrl}
              layout="fixed"
              width={24}
              height={24}
            />

            <Typography>{selectedChain?.name}</Typography>
          </Stack>
        </Button>
        {!connectedChain && (
          <Button
            onClick={() => setOpenConnectorsModal(true)}
            variant="text"
            disableTouchRipple
            sx={{
              textTransform: "none",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              "&:hover": {
                transform: "matrix(1.025, 0, 0, 1.025, 0, 0)",
              },
            }}
          >
            <Typography>Connect Wallet</Typography>
          </Button>
        )}
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

export default ConnectButton;
