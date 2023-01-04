import { minimum, Percent } from '@bionswap/core-sdk';
import { Box, Button, Stack, styled, Typography } from '@mui/material';
import { CurrencyLogo, TransactionConfirmationModal } from 'components';
import { TransactionErrorContent } from 'components/TransactionConfirmationModal';
import React, { useMemo } from 'react';
import { Trade } from 'types';
import { tradeMeaningfullyDiffers } from 'utils/trade';
import { FiArrowDown } from 'react-icons/fi';
import SwapDetail from '../SwapDetail';
import InfoIcon from '@mui/icons-material/Info';

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
    [originalTrade, trade],
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
  const pendingText = `Swapping ${trade?.inputAmount?.toSignificant(6) ?? ''} ${
    trade?.inputAmount?.currency?.symbol ?? ''
  } for ${trade?.outputAmount?.toSignificant(6) ?? ''} ${trade?.outputAmount?.currency?.symbol ?? ''}`;

  const ConfirmationContent = useMemo(
    () =>
      swapErrorMessage ? (
        <TransactionErrorContent onDismiss={onDismiss} message={swapErrorMessage} />
      ) : (
        <Stack width="100%" spacing={1}>
          <Stack width="100%">
            <Stack
              width="100%"
              justifyContent="space-between"
              direction="row"
              sx={{
                backgroundColor: (theme) => (theme.palette as any).extra.card.light,
                padding: '16px',
                borderRadius: '8px',
              }}
            >
              <Typography fontSize={20} color="text.primary" fontWeight={500}>
                {trade?.inputAmount.toSignificant(6)}
              </Typography>
              <Stack direction="row" gap="5px">
                <CurrencyLogo currency={trade?.inputAmount.currency} size={20} />
                <Typography color="text.primary" fontWeight="500">
                  {trade?.inputAmount.currency.symbol}
                </Typography>
              </Stack>
            </Stack>
            <SwapIcon>
              <FiArrowDown />
            </SwapIcon>
            <Stack
              width="100%"
              justifyContent="space-between"
              direction="row"
              sx={{
                backgroundColor: (theme) => (theme.palette as any).extra.card.light,
                padding: '16px',
                borderRadius: '8px',
              }}
            >
              <Typography fontSize={20} color="text.primary" fontWeight="500">
                {trade?.outputAmount.toSignificant(6)}
              </Typography>
              <Stack direction="row" gap="5px">
                <CurrencyLogo currency={trade?.outputAmount.currency} size={20} />
                <Typography color="text.primary" fontWeight="500">
                  {trade?.outputAmount.currency.symbol}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          {showAcceptChanges && (
            <Stack
              justifyContent="space-between"
              direction="row"
              sx={{
                width: '100%',
                padding: '0 10px',
              }}
            >
              <Stack direction="row" gap="11px">
                <InfoIcon color="success" />
                <Typography variant="body4Poppins" color="success.main" fontWeight="400">
                  Price Updated
                </Typography>
              </Stack>
              <Button variant="text" color="success" size="small" onClick={onAcceptChanges}>
                Accept
              </Button>
            </Stack>
          )}
          <Stack width="100%" spacing={2}>
            <Box width="100%">
              <SwapDetail trade={trade} />
            </Box>

            <Button disabled={showAcceptChanges} fullWidth variant="contained" onClick={onConfirm} sx={{padding: '10px 20px'}}>
              Confirm Swap
            </Button>
          </Stack>
        </Stack>
      ),
    [onAcceptChanges, onConfirm, onDismiss, showAcceptChanges, swapErrorMessage, trade],
  );

  return (
    <Stack>
      <TransactionConfirmationModal
        title={'Confirm Swap'}
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
  color: ${(props) => props.theme.palette.text.primary};
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: ${(props) => (props.theme.palette as any).extra.swapPanel.panel};
  border: 5px solid ${(props) => (props.theme.palette as any).extra.swapPanel.background};
  margin-top: -20px;
  margin-bottom: -20px;
  z-index: 1;
  position: relative;
  svg {
    width: 18px;
    height: 18px;
  }
`;

export default ConfirmSwapModal;
