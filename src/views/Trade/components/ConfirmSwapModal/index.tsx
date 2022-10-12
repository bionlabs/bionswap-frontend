import { minimum, Percent } from "@bionswap/core-sdk";
import { Box, Button, Stack, styled, Typography } from "@mui/material";
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
            sx={{ width: "100%", borderRadius: '8px', backgroundColor: "primary.dark", p: "17px 15px" }}
          >
            <Typography variant="h4Poppins" color="text.primary" fontWeight='400'>
              {trade?.inputAmount.toSignificant(6)}
            </Typography>
            <Stack direction="row" gap='5px'>
              <CurrencyLogo currency={trade?.inputAmount.currency} size={20} />
              <Typography variant="body2Poppins" color='#FFF3F3' fontWeight='500'>
                {trade?.inputAmount.currency.symbol}
              </Typography>
            </Stack>
          </Stack>

          <SwapIcon>
            <ArrowDownwardIcon sx={{ fontSize: 15, color: "primary.main" }} />
          </SwapIcon>

          <Stack
            justifyContent="space-between"
            direction="row"
            sx={{ width: "100%", borderRadius: '8px', backgroundColor: "primary.dark", p: "17px 15px" }}
          >
            <Typography variant="h4Poppins" color="text.primary" fontWeight='400'>
              {trade?.outputAmount.toSignificant(6)}
            </Typography>
            <Stack direction="row" gap='5px'>
              <CurrencyLogo currency={trade?.outputAmount.currency} size={20} />
              <Typography variant="body2Poppins" color='#FFF3F3' fontWeight='500'>
                {trade?.outputAmount.currency.symbol}
              </Typography>
            </Stack>
          </Stack>

          {showAcceptChanges && (
            <Stack
              justifyContent="space-between"
              direction="row"
              sx={{ 
                backgroundColor: "rgba(160, 236, 138, 0.05)", 
                width: "100%", 
                padding: '10px', 
                border: '1px solid', 
                borderColor: 'green.500', 
                borderRadius: '8px',
                marginTop: '10px'
              }}
            >
              <Stack direction="row" gap='11px'>
                <InfoIcon color="success" />
                <Typography variant="body4Poppins" color='green.400' fontWeight='400'>
                  Price Updated
                </Typography>
              </Stack>
              <Button
                sx={{
                  width: "90px",
                  backgroundColor: "green.400",
                  "&:hover": {
                    backgroundColor: "green.400",
                  },
                  "&.Mui-disabled": {
                    opacity: 0.4,
                  },
                }}
                onClick={onAcceptChanges}
              >
                <Typography variant="body4Poppins" color="text.secondary" fontWeight='600'>
                  Accept
                </Typography>
              </Button>
            </Stack>
          )}
          {trade && (
            <Typography variant="captionPoppins" textAlign={"center"} mt='20px' mb='20px' color="gray.300">
              {`Output is estimated. You will receive at least ${trade.minimumAmountOut(allowedSlippage).toSignificant(6)} ${
                trade.outputAmount.currency.symbol
              } or the transaction will revert.`}
            </Typography>
          )}

          <Stack
            sx={{
              border: "1px solid #F2F3F3",
              borderRadius: "8px",
              mb: '25px',
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
            onClick={onConfirm}
          >
            <Typography variant="body4Poppins" fontWeight={600} color="#000607">
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

const SwapIcon = styled(Stack)`
  border-radius: 50%;
  width: 35px;
  height: 35px;
  padding: 0;
  minWidth: 0;
  background: ${prop => prop.theme.palette.background.default};
  border: 1px solid;
  border-color: ${prop => prop.theme.palette.text.secondary};
  margin-top: 9px;
  margin-bottom: 9px;
`

export default ConfirmSwapModal;
