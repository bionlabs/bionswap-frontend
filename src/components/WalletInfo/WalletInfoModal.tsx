import { Dialog, DialogTitle, Modal, Typography } from "@mui/material";
import React from "react";
import { useAccount, useBalance, useNetwork } from "../../hooks";

type Props = {
  open: boolean;
  onClose?: () => void;
};

const WalletInfoModal = ({ open = false, onClose }: Props) => {
  const { address } = useAccount();
  const { data: balance } = useBalance({
    addressOrName: address,
  });
  const { chain: connectedChain } = useNetwork();

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>
        <Typography variant="h5" fontWeight={800} color="#ffc107">
          Account
        </Typography>
      </DialogTitle>

      <Typography variant="caption" fontWeight="bold" textAlign="center">
        {address}
      </Typography>
      <Typography variant="caption" textAlign="center">
        {balance?.formatted.slice(0, 5)}{" "}
        {connectedChain?.nativeCurrency?.symbol}
      </Typography>
    </Dialog>
  );
};

export default WalletInfoModal;
