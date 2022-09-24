import { Backdrop, Box, IconButton, MenuItem, MenuList, Modal, Stack , styled , Typography } from "@mui/material";
import { useChain, useConnect } from "hooks";
import Image from "next/image";
import { useState } from "react";
import { HiX } from "react-icons/hi";
import { getConnectorIcon } from "utils/connectors";
import { Connector } from "wagmi";

type Props = {
  onConnectorSelected?: (connector: Connector) => void;
  onConnectorConnected: (connector: Connector) => void;
  onClose?: () => void;
  open: boolean;
};

function ConnectorOptionsModal({ onConnectorSelected, onConnectorConnected, onClose, open = false }: Props) {
  const { chainId } = useChain();
  const [selectedConnector, setSelectedConnector] = useState<Connector | null>(null);
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
      <Wrapper
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "fit-content",
          color: "#fff",
          minWidth: "353px",
          maxWidth: "453px",
          // boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          borderRadius: "8px",
          p: 4,
        }}
      >
        <Box display="flex" flexDirection="column" gap="10px">
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant='h5Samsung' sx={{color: 'primary.main'}}>
              Connect a wallet
            </Typography>
            <IconButton onClick={onClose}>
              <HiX />
            </IconButton>
          </Box>
          <Box color="#787A9B" fontSize="14px">
            Connect with one of our available wallet providers or create a new one.
          </Box>
        </Box>
        <Box mt="24px">
          <MenuList
            sx={{
              border: "1px solid #787A9B",
              borderRadius: "8px",
              padding: 0,
            }}
          >
            {connectors.map((connector) => {
              return (
                <MenuItem
                  sx={{
                    p: 2,
                    width: "100%",
                    borderBottom: "1px solid #787A9B",
                    ":last-child": {
                      borderBottom: "none",
                    },
                  }}
                  key={connector.id}
                  onClick={() => {
                    connect({ connector, chainId });
                    setSelectedConnector(connector);
                    onConnectorSelected?.(connector);
                  }}
                  disabled={!connector.ready}
                >
                  <Stack direction="row" gap={2} alignItems="center">
                    <Image src={getConnectorIcon(connector.id)} layout="fixed" alt="" width={24} height={24} />

                    <Box display='flex' alignItems='center' gap='10px' fontSize="16px">
                      {connector.name}
                      {!connector.ready && " (unsupported)"}
                      <Typography variant='body1' sx={{color: 'primary.main'}}>
                        {isConnectLoading && connector.id === pendingConnector?.id && "connecting..."}
                      </Typography>
                    </Box>
                  </Stack>
                </MenuItem>
              );
            })}
          </MenuList>
        </Box>
      </Wrapper>
    </Modal>
  );
}

const Wrapper = styled(Box)`
  background: ${(props:any) => (props.theme.palette as any).extra.other.nineth};
  border: 2px solid ${(props) => (props.theme.palette as any).extra.other.tenth};
`

export default ConnectorOptionsModal;
