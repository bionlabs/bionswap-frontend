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
    <Box sx={{ width: "100%" }}>
      <Stack direction="row" justifyContent={"space-between"}>
        <Typography color="text.secondary">{`Slippage tolerance`}</Typography>
        <Typography color="text.secondary">{allowedSlippage.toFixed(2)}%</Typography>
      </Stack>
      {trade && (
        <Stack direction="row" justifyContent={"space-between"}>
          <Typography color="text.secondary">{`Minimum received after slippage`}</Typography>
          <Typography color="text.secondary">
            {minReceived?.toSignificant(6)} {minReceived?.currency.symbol}
          </Typography>
        </Stack>
      )}
      {trade && (
        <Stack direction="row" justifyContent={"space-between"}>
          <Typography color="text.secondary">{`Price impact`}</Typography>
          <Typography color="text.secondary">
            {priceImpact instanceof Percent ? `${priceImpact.multiply(-1).toFixed(2)}%` : null}
            {typeof priceImpact === "number" ? `${-priceImpact?.toFixed(2)}%` : null}
          </Typography>
        </Stack>
      )}
      {trade && (
        <Stack direction="row" justifyContent={"space-between"}>
          <Typography color="text.secondary">{`Liquidity provider fee`}</Typography>
          <Typography color="text.secondary">{realizedLpFeePercent?.toFixed(2)}%</Typography>
        </Stack>
      )}
      {path && (
        <Stack direction="row" justifyContent={"space-between"}>
          <Typography color="text.secondary">{`Route`}</Typography>
          <Typography color="text.secondary">{path.map((el) => el.symbol).join(" > ")}</Typography>
        </Stack>
      )}
    </Box>
  );
};

export default SwapDetail;
