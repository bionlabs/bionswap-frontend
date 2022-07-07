import {
  Dialog,
  DialogContent,
  DialogTitle,
  MenuItem,
  MenuList,
  Modal,
  Stack,
  Typography,
  Backdrop
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { Chain } from "wagmi";
import { chains } from "configs/chain";
import { useSwitchNetwork, useNetwork } from "hooks";
import { getChainIcon } from "utils";
import CircleIcon from "@mui/icons-material/Circle";

type Props = {
  //   chains: Chain[];
  onChainSelected: (chain: Chain) => void;
  onClose?: () => void;
  open: boolean;
  selectToSwitch?: boolean;
  onChainSwitched?: (chain: Chain) => void;
};

const ChainOptionsModal = ({
  //   chains,
  onChainSelected,
  onClose,
  open = false,
  selectToSwitch = false,
  onChainSwitched,
}: Props) => {
  const [selectedChain, setSelectedChain] = useState<Chain | null>(chains[0]);
  const { chain: connectedChain } = useNetwork();

  const {
    switchNetwork,
    error: switchError,
    isLoading: isSwitchLoading,
  } = useSwitchNetwork({
    onSuccess: (chain) => {
      setSelectedChain(chain);
      onChainSwitched?.(chain);
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
          {!selectToSwitch ? "Select a Network" : "Switch to a Network"}
        </Typography>

        <MenuList>
          {chains.map((chain) => (
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
              key={chain.id}
              onClick={() => {
                if (!selectToSwitch) {
                  setSelectedChain(chain);
                  onChainSelected(chain);
                } else {
                  switchNetwork?.(chain?.id);
                }
              }}
              selected={chain.id === selectedChain?.id}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                width="100%"
              >
                <Stack direction="row" gap={2} alignItems="center">
                  <Image
                    src={getChainIcon(chain.id).iconUrl}
                    layout="fixed"
                    alt=''
                    width={24}
                    height={24}
                  />

                  <Typography variant="body1" fontWeight={700}>
                    {chain.name}
                  </Typography>
                </Stack>
                {connectedChain?.id === chain.id && (
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography variant="caption">Connected</Typography>
                    <CircleIcon
                      color="success"
                      sx={{
                        "&.MuiSvgIcon-root": {
                          fontSize: 10,
                        },
                      }}
                    />
                  </Stack>
                )}
              </Stack>
            </MenuItem>
          ))}
        </MenuList>
      </Stack>
    </Modal>
  );
};

export default ChainOptionsModal;
