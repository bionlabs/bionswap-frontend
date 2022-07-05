import { Box, Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useAccount, useBalance, useNetwork } from "hooks";
import WalletInfoModal from "./WalletInfoModal";

type Props = {};

const WalletInfo = (props: Props) => {
  const [openInfoModal, setOpenInfoModal] = useState(false);

  const { address } = useAccount();
  const { chain } = useNetwork();
  const { data: balance } = useBalance({
    addressOrName: address,
  });

  return address ? (
    <>
      <Button
        onClick={() => setOpenInfoModal(true)}
        variant="text"
        disableTouchRipple
        sx={{
          p: 0.4,
          textTransform: "none",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          "&:hover": {
            transform: "matrix(1.025, 0, 0, 1.025, 0, 0)",
          },
        }}
      >
        <Stack direction="row">
          <Box
            sx={{
              p: 1,
            }}
          >
            <Typography>
              {balance?.formatted.slice(0, 5)} {chain?.nativeCurrency?.symbol}
            </Typography>
          </Box>
          <Box
            borderRadius={1.5}
            sx={{
              p: 1,
              backgroundColor: "#f2f2f2",
            }}
          >
            <Typography>
              {`${address?.slice(0, 6)}...${address?.slice(-4)}`}
            </Typography>
          </Box>
        </Stack>
      </Button>
      <WalletInfoModal
        open={openInfoModal}
        onClose={() => setOpenInfoModal(false)}
      />
    </>
  ) : null;
};

export default WalletInfo;
