import {
  Dialog,
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
import styled from "@emotion/styled";
import {HiX} from 'react-icons/hi'
import Image from "next/image";
import { useState } from "react";
import { Chain } from "wagmi";
import { chains } from "configs/chain";
import { useSwitchNetwork, useNetwork } from "hooks";
import { getChainIcon } from "utils";

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
              Connect a blockchain
            </Box>
            <IconButton onClick={onClose}>
              <HiX/>
            </IconButton>
          </Box>
          <Box color='#787A9B' fontSize='14px'>Connect with one of our available blockchain providers.</Box>
        </Box>
        <Box mt='24px'>
          <MenuList sx={{
            border: '1px solid #787A9B',
            borderRadius: '8px',
            padding: 0
          }}>
            {chains.map((chain) => (
              <MenuItem
                sx={{
                  p: 2,
                  width: "100%",
                  borderBottom: '1px solid #787A9B',
                  ':last-child': {
                    borderBottom: 'none'
                  },
                  // "&.Mui-selected": {
                  //   backgroundColor: "#ffc107",
                  //   boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.24)",
                  //   "&:hover": { backgroundColor: "#ffc107" },
                  // },
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
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  width="100%"
                >
                  <Box display='flex' width='100%' alignItems="center" justifyContent='space-between'>
                    <Box display='flex' gap='10px' alignItems="center">
                      <Image
                        src={getChainIcon(chain.id).iconUrl}
                        layout="fixed"
                        alt=''
                        width={24}
                        height={24}
                      />
                      <Box fontSize='16px' fontWeight={600}>
                        {chain.name}
                      </Box>
                    </Box>
                    {chain.id === selectedChain?.id && (
                      <StatusBox>
                        <div className="ring-container">
                            <div className="ringring"/>
                            <div className="circle"/>
                        </div>
                        <Box fontSize='12px' lineHeight='1' color='#787A9B' >Connected</Box>
                      </StatusBox>
                    )}
                  </Box>
                  
                </Stack>
              </MenuItem>
            ))}
          </MenuList>
        </Box>
      </Box>
    </Modal>
  );
};

const StatusBox = styled(Box)`
    display: flex;
    gap: 5px;
    align-items: center;
    position: relative;
    .circle {
        width: 12px;
        height: 12px;
        background-color: #62bd19;
        border-radius: 50%;
        position: absolute;
        top: -1px;
        left: -15px;
    }
    .ringring {
      border: 2px solid #62bd19;
      -webkit-border-radius: 30px;
      height: 22px;
      width: 22px;
      position: absolute;
      left: -19.5px;
      top: -6px;
      -webkit-animation: pulsate 1s ease-out;
      -webkit-animation-iteration-count: infinite; 
      opacity: 0.0
    }
    @-webkit-keyframes pulsate {
        0% {-webkit-transform: scale(0.1, 0.1); opacity: 0.0;}
        50% {opacity: 1.0;}
        100% {-webkit-transform: scale(1.2, 1.2); opacity: 0.0;}
    }
`

export default ChainOptionsModal;
