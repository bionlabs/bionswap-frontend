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
            bgcolor: "gray.900",
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.5)',
            p: 2,
            borderRadius: '12px',
            border: '1px solid',
            borderColor: 'gray.700',
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
