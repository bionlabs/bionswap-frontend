import { Box, Modal } from "@mui/material";
import React from "react";

type Props = {
  children: React.ReactNode;
  open: boolean;
  onClose?: () => void;
};

const BaseModal = ({ children, open, onClose }: Props) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          minWidth: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 2,
          borderRadius: 1,
        }}
      >
        {children}
      </Box>
    </Modal>
  );
};

export default BaseModal;
