import { ChainId, Currency } from "@bionswap/core-sdk";
import CloseIcon from "@mui/icons-material/Close";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import { BaseModal } from "components";
import { useChain } from "hooks";
import React, { useCallback } from "react";
import ErrorIcon from "@mui/icons-material/Error";
import CircularProgress from "@mui/material/CircularProgress";
import NorthIcon from "@mui/icons-material/North";

type TransactionConfirmationModalProps = {
  title: string;
  open: boolean;
  onDismiss?: () => void;
  hash?: string;
  content: React.ReactNode;
  attemptingTxn: boolean;
  pendingText: string;
  currencyToAdd?: Currency;
};

function ConfirmationPendingContent({ pendingText }: { pendingText: string }) {
  return (
    <Stack>
      <CircularProgress />
      <Typography my={2} fontWeight={600}>
        {pendingText}
      </Typography>
      <Typography mb={2} color="text.secondary">
        Confirm this transaction in your wallet
      </Typography>
    </Stack>
  );
}

export function TransactionSubmittedContent({
  onDismiss,
  chainId,
  hash,
  currencyToAdd,
}: {
  onDismiss: () => void;
  hash: string | undefined;
  chainId: ChainId;
  currencyToAdd?: Currency | undefined;
}) {
  return (
    <Stack gap={3} sx={{ width: "100%" }}>
      <NorthIcon sx={{ color: "success.main", fontSize: 60 }} />
      <Typography fontSize={18}>Transaction submitted</Typography>
      <Button
        fullWidth
        sx={{
          backgroundColor: "primary.main",
          height: 50,
          borderRadius: "8px",
          "&:hover": {
            backgroundColor: "primary.main",
          },
          "&.Mui-disabled": {
            opacity: 0.4,
          },
        }}
        onClick={onDismiss}
      >
        <Typography variant="body4Poppins" fontWeight={600} color="#000607">
          Close
        </Typography>
      </Button>
    </Stack>
  );
}

export function TransactionErrorContent({ message, onDismiss }: { message: string; onDismiss?: () => void }) {
  return (
    <Stack gap={2} sx={{ width: "100%" }}>
      <ErrorIcon sx={{ color: "error.main", fontSize: 50 }} />
      <Typography>{message}</Typography>
      <Button
        fullWidth
        sx={{
          backgroundColor: "primary.main",
          height: 50,
          borderRadius: "8px",
          "&:hover": {
            backgroundColor: "primary.main",
          },
          "&.Mui-disabled": {
            opacity: 0.4,
          },
        }}
        onClick={onDismiss}
      >
        <Typography variant="body4Poppins" fontWeight={600} color="#000607">
          Dismiss
        </Typography>
      </Button>
    </Stack>
  );
}

const TransactionConfirmationModal = ({
  title,
  open,
  onDismiss,
  attemptingTxn,
  content,
  currencyToAdd,
  pendingText,
  hash,
}: TransactionConfirmationModalProps) => {
  const { chainId } = useChain();

  const handleDismiss = useCallback(() => {
    onDismiss?.();
  }, [onDismiss]);

  if (!chainId) return null;

  return (
    <BaseModal open={open} sx={{ 
      backgroundColor: "gray.900", 
      minWidth: '200px',
      maxWidth: "556px",
      width: "90vW",
      border: '1px solid',
      borderColor: 'gray.700',
      borderRadius: '8px',
      boxShadow: '0px 4px 11px #000000',
      padding: '25px 15px 15px',
    }}>
      <Stack sx={{ minWidth: 200 }}>
        <Stack justifyContent="flex-start" direction="row" sx={{ width: "100%", mb: 3 }}>
          <Typography variant="body3Poppins" fontWeight={400} color='text.primary'>
            {title}
          </Typography>
        </Stack>
        {attemptingTxn ? (
          <ConfirmationPendingContent pendingText={pendingText} />
        ) : hash ? (
          <TransactionSubmittedContent
            chainId={chainId}
            hash={hash}
            onDismiss={handleDismiss}
            currencyToAdd={currencyToAdd}
          />
        ) : (
          content
        )}
      </Stack>
    </BaseModal>
  );
};

export default TransactionConfirmationModal;
