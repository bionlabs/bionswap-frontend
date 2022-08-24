import { Currency, CurrencyAmount, Percent, Trade, TradeType } from "@bionswap/core-sdk";
import { Box, Stack, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { useUserSlippageTolerance } from "state/user/hooks";
import { computeRealizedLPFeePercent } from "utils/prices";

type Props = {
  recipient?: string;
  trade?: Trade<Currency, Currency, TradeType.EXACT_INPUT | TradeType.EXACT_OUTPUT>;
  minimumAmountOut?: CurrencyAmount<Currency>;
};

const SwapDetail = ({ recipient, trade, minimumAmountOut }: Props) => {
  const [allowedSlippage] = useUserSlippageTolerance();

  const minReceived = minimumAmountOut || trade?.minimumAmountOut(allowedSlippage);

  const priceImpact = useMemo(() => {
    if (!trade) return 0;
    const realizedLpFeePercent = computeRealizedLPFeePercent(trade);
    const priceImpact = trade?.priceImpact.subtract(realizedLpFeePercent);
    return priceImpact;
  }, [trade]);
  const realizedLpFeePercent = trade ? computeRealizedLPFeePercent(trade) : undefined;

  const path = useMemo(() => {
    return trade?.route.path;
    return [];
  }, [trade]);

  return (
    <Stack sx={{ width: "100%", padding: '15px' }} gap='15px' alignItems='inherit'>
      <Stack direction="row" justifyContent={"space-between"} width='100%'>
        <Typography variant="body3Poppins" sx={{
          fontWeight: '500',
          color: 'extra.other.fifteenth'
        }}>
          {`Slippage tolerance`}
        </Typography>
        <Typography variant="body3Poppins" sx={{
          fontWeight: '500',
          color: 'primary.main'
        }}>
          {allowedSlippage.toFixed(2)}%
        </Typography>
      </Stack>
      {trade && (
        <Stack direction="row" justifyContent={"space-between"} width='100%'>
          <Typography variant="body3Poppins" sx={{
            fontWeight: '400',
            color: 'gray.400'
          }}>
            {`Minimum received`}
          </Typography>
          <Typography variant="body3Poppins" sx={{
            fontWeight: '400',
            color: 'text.primary'
          }}>
            {minReceived?.toSignificant(6)} {minReceived?.currency.symbol}
          </Typography>
        </Stack>
      )}
      {trade && (
        <Stack direction="row" justifyContent={"space-between"} width='100%'>
          <Typography variant="body3Poppins" sx={{
            fontWeight: '400',
            color: 'gray.400'
          }}>
            {`Price impact`}
          </Typography>
          <Typography variant="body3Poppins" sx={{
            fontWeight: '400',
            color: '#2BB673'
          }}>
            {priceImpact instanceof Percent ? `${priceImpact.multiply(-1).toFixed(2)}%` : null}
            {typeof priceImpact === "number" ? `${-priceImpact?.toFixed(2)}%` : null}
          </Typography>
        </Stack>
      )}
      {trade && (
        <Stack direction="row" justifyContent={"space-between"} width='100%'>
          <Typography variant="body3Poppins" sx={{
            fontWeight: '400',
            color: 'gray.400'
          }}>
            {`Liquidity provider fee`}
          </Typography>
          <Typography variant="body3Poppins" sx={{
            fontWeight: '400',
            color: 'text.primary'
          }}>
            {realizedLpFeePercent?.toFixed(2)}%
          </Typography>
        </Stack>
      )}
      {/* {path && (
        <Stack direction="row" justifyContent={"space-between"} width='100%'>
          <Typography variant="body3Poppins" sx={{
            fontWeight: '400',
            color: 'gray.400'
          }}>
            {`Route`}
          </Typography>
          <Typography variant="body3Poppins" sx={{
            fontWeight: '400',
            color: 'text.primary'
          }}>
            {path.map((el) => el.symbol).join(" > ")}
          </Typography>
        </Stack>
      )} */}
    </Stack>
  );
};

export default SwapDetail;
