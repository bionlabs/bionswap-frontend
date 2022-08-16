import { Box, IconButton, Modal, Stack, SxProps } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  children: React.ReactNode;
  open: boolean;
  onClose?: () => void;
  sx?: SxProps;
};

const BaseModal = ({ children, open, onClose, sx }: Props) => {
  return (
    <Modal open={open} onClose={onClose}>
      <>
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
            ...sx,
          }}
        >
          <IconButton onClick={onClose} sx={{ position: "absolute", top: 8, right: 8 }}>
            <CloseIcon />
          </IconButton>
          {children}
        </Box>
      </>
    </Modal>
  );
};

export default BaseModal;
