import { Currency, Price } from "@bionswap/core-sdk";
import { Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import Image from "next/image"

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
          padding: '0',
          "&:hover": {
            transform: "none",
            backgroundColor: "transparent",
          },
        }}
      >
        <Typography variant="body3Poppins" sx={{
          fontWeight: '400',
          color: '#FFFCFC',
          marginRight: '8px'
        }}>
          {`1 ${label} = ${formattedPrice} ${labelInverted}`}
        </Typography>
        
        <Image src='/images/trade/swap_horizontal_circle.png' alt="swap_horizontal_circle" width={21} height={20} />
      </Button>
    </Stack>
  );
};

export default TradePrice;
