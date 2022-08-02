import {
  DialogContent,
  DialogTitle,
  MenuItem,
  MenuList,
  Modal,
  Stack,
  Typography,
  Backdrop,
  Box,
  IconButton
} from "@mui/material";
import Image from "next/image";
import {HiX} from 'react-icons/hi'
import { useEffect, useState } from "react";
import { Chain, Connector } from "wagmi";
import { useConnect } from "hooks";
import { getConnectorIcon } from "utils/getConnectorIcon";

type Props = {
  chain: Chain | null;
  onConnectorSelected?: (connector: Connector) => void;
  onConnectorConnected: (connector: Connector) => void;
  onClose?: () => void;
  open: boolean;
};

function ConnectorOptionsModal({
  chain,
  onConnectorSelected,
  onConnectorConnected,
  onClose,
  open = false,
}: Props) {
  const [selectedConnector, setSelectedConnector] = useState<Connector | null>(
    null
  );
  const {
    connect,
    connectors,
    error,
    isLoading: isConnectLoading,
    pendingConnector,
  } = useConnect({
    onSuccess: () => {
      onConnectorConnected(selectedConnector!);
    },
  });

  return (
    <Modal 
      onClose={onClose}
      open={open}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 'fit-content',
          bgcolor: "#fff",
          boxShadow: 24,
          borderRadius: '8px',
          p: 4,
        }}
      >
        <Box display='flex' flexDirection='column' gap='10px' >
          <Box display='flex' justifyContent='space-between' alignItems='center' >
            <Box fontSize='24px' fontWeight='700'>
              Connect a wallet
            </Box>
            <IconButton onClick={onClose}>
              <HiX/>
            </IconButton>
          </Box>
          <Box color='#787A9B' fontSize='14px'>Connect with one of our available wallet providers or create a new one.</Box>
        </Box>
        <Box mt='24px'>
          <MenuList sx={{
            border: '1px solid #787A9B',
            borderRadius: '8px',
            padding: 0
          }}>
            {connectors.map((connector) => {
              return (
                <MenuItem
                  sx={{
                    p: 2,
                    width: "100%",
                    borderBottom: '1px solid #787A9B',
                    ':last-child': {
                      borderBottom: 'none'
                    }
                    // "&.Mui-selected": {
                    //   backgroundColor: "#ffc107",
                    //   boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.24)",
                    //   "&:hover": { backgroundColor: "#ffc107" },
                    // },
                  }}
                  key={connector.id}
                  onClick={() => {
                    connect({ connector, chainId: chain?.id });
                    setSelectedConnector(connector);
                    onConnectorSelected?.(connector);
                  }}
                  disabled={!connector.ready}
                >
                  <Stack direction="row" gap={2} alignItems="center">
                    <Image
                      src={getConnectorIcon(connector.id)}
                      layout="fixed"
                      alt=''
                      width={24}
                      height={24}
                    />

                    <Box fontSize='16px' fontWeight={600}>
                      {connector.name}
                      {!connector.ready && " (unsupported)"}
                      {isConnectLoading &&
                        connector.id === pendingConnector?.id &&
                        "(connecting...)"}
                    </Box>
                  </Stack>
                </MenuItem>
              );
            })}
          </MenuList>
        </Box>
      </Box>
    </Modal>
  );
}

export default ConnectorOptionsModal;