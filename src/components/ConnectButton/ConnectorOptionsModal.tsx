import {
  DialogContent,
  DialogTitle,
  MenuItem,
  MenuList,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";
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
    <Modal onClose={onClose} open={open}>
      <Stack
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h5" fontWeight={800} color="#ffc107">
          Select a Connector
        </Typography>

        <MenuList>
          {connectors.map((connector) => {
            return (
              <MenuItem
                sx={{
                  mb: 1,
                  p: 1.5,
                  width: "100%",
                  borderRadius: 2,
                  "&.Mui-selected": {
                    backgroundColor: "#ffc107",
                    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.24)",
                    "&:hover": { backgroundColor: "#ffc107" },
                  },
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
                    width={24}
                    height={24}
                  />

                  <Typography fontWeight={700}>
                    {connector.name}
                    {!connector.ready && " (unsupported)"}
                    {isConnectLoading &&
                      connector.id === pendingConnector?.id &&
                      " (connecting)"}
                  </Typography>
                </Stack>
              </MenuItem>
            );
          })}
        </MenuList>
      </Stack>
    </Modal>
  );
}

export default ConnectorOptionsModal;
