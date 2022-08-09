import { minimum, Percent } from "@bionswap/core-sdk";
import { Box, Button, Stack, Typography } from "@mui/material";
import { CurrencyLogo, TransactionConfirmationModal } from "components";
import { TransactionErrorContent } from "components/TransactionConfirmationModal";
import React, { useMemo } from "react";
import { Trade } from "types";
import { tradeMeaningfullyDiffers } from "utils/trade";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import SwapDetail from "../SwapDetail";
import InfoIcon from "@mui/icons-material/Info";

type ConfirmSwapModalProps = {
  open: boolean;
  trade?: Trade;
  originalTrade?: Trade;
  attemptingTxn: boolean;
  txHash?: string;
  recipient?: string;
  allowedSlippage: Percent;
  onAcceptChanges: () => void;
  onConfirm: () => void;
  swapErrorMessage?: string;
  onDismiss?: () => void;
};

const ConfirmSwapModal = ({
  allowedSlippage,
  attemptingTxn,
  onAcceptChanges,
  onConfirm,
  open,
  recipient,
  swapErrorMessage,
  onDismiss,
  originalTrade,
  trade,
  txHash,
}: ConfirmSwapModalProps) => {
  const showAcceptChanges = useMemo(
    () => Boolean(trade && originalTrade && tradeMeaningfullyDiffers(trade, originalTrade)),
    [originalTrade, trade]
  );

  // text to show while loading
  // const pendingText = t(
  //   "Swapping %amountA% %symbolA% for %amountB% %symbolB%",
  //   {
  //     amountA: trade?.inputAmount?.toSignificant(6) ?? "",
  //     symbolA: trade?.inputAmount?.currency?.symbol ?? "",
  //     amountB: trade?.outputAmount?.toSignificant(6) ?? "",
  //     symbolB: trade?.outputAmount?.currency?.symbol ?? "",
  //   }
  // );
  const pendingText = `Swapping ${trade?.inputAmount?.toSignificant(6) ?? ""} ${
    trade?.inputAmount?.currency?.symbol ?? ""
  } for ${trade?.outputAmount?.toSignificant(6) ?? ""} ${trade?.outputAmount?.currency?.symbol ?? ""}`;

  const ConfirmationContent = useMemo(
    () =>
      swapErrorMessage ? (
        <TransactionErrorContent onDismiss={onDismiss} message={swapErrorMessage} />
      ) : (
        <Stack sx={{ width: "100%" }}>
          <Stack
            justifyContent="space-between"
            direction="row"
            sx={{ width: "100%", borderRadius: 1, backgroundColor: "rgb(247, 248, 250)", px: 2 }}
          >
            <Typography sx={{ fontSize: 28 }}>{trade?.inputAmount.toSignificant(6)}</Typography>
            <Stack direction="row" gap={1}>
              <CurrencyLogo currency={trade?.inputAmount.currency} size={20} />
              <Typography sx={{ fontSize: 20 }}>{trade?.inputAmount.currency.symbol}</Typography>
            </Stack>
          </Stack>

          <Stack
            sx={{
              borderRadius: "50%",
              width: 35,
              height: 35,
              padding: 0,
              minWidth: 0,
            }}
          >
            <ArrowDownwardIcon sx={{ fontSize: 15, color: "text.secondary" }} />
          </Stack>

          <Stack
            justifyContent="space-between"
            direction="row"
            sx={{ width: "100%", borderRadius: 1, backgroundColor: "rgb(247, 248, 250)", px: 2 }}
          >
            <Typography sx={{ fontSize: 28 }}>{trade?.outputAmount.toSignificant(6)}</Typography>
            <Stack direction="row" gap={1}>
              <CurrencyLogo currency={trade?.outputAmount.currency} size={20} />
              <Typography sx={{ fontSize: 20 }}>{trade?.outputAmount.currency.symbol}</Typography>
            </Stack>
          </Stack>

          {showAcceptChanges && (
            <Stack
              justifyContent="space-between"
              direction="row"
              sx={{ backgroundColor: "warning.main", width: "100%", py: 1, px: 2, mt: 2, borderRadius: 2 }}
            >
              <Stack direction="row" gap={1}>
                <InfoIcon />
                <Typography>Price Updated</Typography>
              </Stack>
              <Button
                sx={{
                  width: "25%",
                  backgroundColor: "extra.button.background",
                  "&:hover": {
                    backgroundColor: "extra.button.background",
                  },
                  "&.Mui-disabled": {
                    opacity: 0.4,
                  },
                }}
                onClick={onAcceptChanges}
              >
                <Typography sx={{ color: "extra.button.text" }}>Accept</Typography>
              </Button>
            </Stack>
          )}
          {trade && (
            <Typography fontSize={12} textAlign={"center"} px={2} mt={2}>
              {`Output is estimated. You will receive at least ${trade.minimumAmountOut(allowedSlippage).toSignificant(6)} ${
                trade.outputAmount.currency.symbol
              } or the transaction will revert.`}
            </Typography>
          )}

          <Stack
            sx={{
              border: "1px solid #F2F3F3",
              borderRadius: "8px",
              p: "12px",
              my: 2,
              width: "100%",
            }}
          >
            <SwapDetail trade={trade} />
          </Stack>

          <Button
            disabled={showAcceptChanges}
            // onClick={}
            fullWidth
            sx={{
              backgroundColor: "extra.button.background",
              height: 50,
              borderRadius: "50px",
              "&:hover": {
                backgroundColor: "extra.button.background",
              },
              "&.Mui-disabled": {
                opacity: 0.4,
              },
            }}
            onClick={onConfirm}
          >
            <Typography fontWeight={600} fontSize={14} sx={{ color: "extra.button.text" }}>
              Confirm Swap
            </Typography>
          </Button>
        </Stack>
      ),
    [allowedSlippage, onAcceptChanges, onConfirm, onDismiss, showAcceptChanges, swapErrorMessage, trade]
  );

  return (
    <Stack>
      <TransactionConfirmationModal
        title={"Confirm Swap"}
        onDismiss={onDismiss}
        attemptingTxn={attemptingTxn}
        hash={txHash}
        content={ConfirmationContent}
        pendingText={pendingText}
        currencyToAdd={trade?.outputAmount.currency}
        open={open}
      />
    </Stack>
  );
};

export default ConfirmSwapModal;
