import { Backdrop, Box, IconButton, MenuItem, MenuList, Modal, Stack , styled , Typography } from "@mui/material";
import { CHAIN_INFO_MAP } from "configs/chain";
import { useChain, useSwitchNetwork } from "hooks";
import Image from "next/image";
import { HiX } from "react-icons/hi";
import { getChainIcon } from "utils/chains";
import { Chain } from "wagmi";

type Props = {
  onClose?: () => void;
  open: boolean;
  onChainSwitched?: (chain: Chain) => void;
};

const ChainOptionsModal = ({ onClose, open = false, onChainSwitched }: Props) => {
  const { chainId, isConnected } = useChain();

  const { switchNetwork } = useSwitchNetwork({});

  console.log(CHAIN_INFO_MAP)

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
          // boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          borderRadius: "8px",
          p: 4,
        }}
      >
        <CloseButton onClick={onClose} sx={{color: theme => (theme.palette as any).extra.walletModal.textPrimary}}>
          <HiX />
        </CloseButton>
        <Box display="flex" flexDirection="column" gap="10px">
          <Typography variant='h5Samsung' color='extra.walletModal.textPrimary'>
            Connect a blockchain
          </Typography>
          <Box color="extra.walletModal.textSecondary" fontSize="14px">
            Connect with one of our available blockchain providers.
          </Box>
        </Box>
        <Box mt="24px">
          <Box
            onClick={onClose}
            sx={{
              display: 'grid', gridTemplateColumns: '1fr 1fr 1fr'
            }}
          >
            {Object.entries(CHAIN_INFO_MAP).map(([, chain]) => (
              <MenuItem
                sx={{
                  p: 2,
                  width: "100%",
                  borderRadius: '4px',
                  ':hover':{
                    backgroundColor: theme => (theme.palette as any).extra.walletModal.hover
                  }
                }}
                key={chain.id}
                onClick={() => {
                  // if (!selectToSwitch) {
                  //   setSelectedChain(chain);
                  //   onChainSelected(chain);
                  // } else {
                  //   switchNetwork?.(chain?.id);
                  // }
                  // setSelectedChain(chain);
                  // onChainSelected(chain);
                  switchNetwork?.(chain?.id);
                  // setSelectedChain(chain);
                  // onChainSwitched?.(chain);
                }}
              >
                <Stack direction="row" justifyContent="space-between" width="100%">
                  <Box display="flex" width="100%" alignItems="center" justifyContent="space-between">
                    <Stack direction='row' gap="10px">
                      <Image src={getChainIcon(chain.id)?.iconUrl} layout="fixed" alt="" width={24} height={24} />
                      <Typography fontSize="14px" fontWeight={500} color='extra.walletModal.textPrimary'>
                        {chain.name}
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>
              </MenuItem>
            ))}
          </Box>
        </Box>
      </Wrapper>
    </Modal>
  );
};

const Wrapper = styled(Box)`
  background-color: ${(props:any) => (props.theme.palette as any).extra.walletModal.background};
`
const CloseButton = styled(IconButton)`
  position: absolute;
  top: 8px;
  right: 8px;
`

export default ChainOptionsModal;
