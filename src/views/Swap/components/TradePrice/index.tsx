import { Currency, Price } from "@bionswap/core-sdk";
import { Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import SyncAltIcon from "@mui/icons-material/SyncAlt";

type Props = {
  price?: Price<Currency, Currency>;
};

const TradePrice = ({ price }: Props) => {
  const [inverted, setInverted] = useState(false);

  const formattedPrice = inverted ? price?.invert()?.toSignificant(6) : price?.toSignificant(6);

  const labelInverted = inverted ? `${price?.baseCurrency?.symbol} ` : `${price?.quoteCurrency?.symbol}`;

  const label = inverted ? `${price?.quoteCurrency?.symbol}` : `${price?.baseCurrency?.symbol}`;

  return (
    <Stack direction="row">
      <Button
        onClick={() => setInverted(!inverted)}
        sx={{
          boxShadow: "none",
          "&:hover": {
            transform: "none",
            backgroundColor: "transparent",
          },
        }}
      >
        <Typography fontSize="14px" fontWeight={500} mr={1}>
          {`1 ${label} = ${formattedPrice} ${labelInverted}`}
        </Typography>
        <SyncAltIcon sx={{ fontSize: 15 }} />
      </Button>
    </Stack>
  );
};

export default TradePrice;
