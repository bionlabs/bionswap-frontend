import { Currency } from "@bionswap/core-sdk";
import { Button, Stack, Typography } from "@mui/material";
import CurrencyLogo from "components/CurrencyLogo";
import { COMMON_BASES } from "configs/routing";
import { useChain } from "hooks";
import React from "react";

type Props = {
  onCurrencySelect?: (currency: Currency) => void;
};

const CommonBases = ({ onCurrencySelect }: Props) => {
  const { chainId } = useChain();
  const bases =
    typeof chainId !== "undefined" ? COMMON_BASES[chainId] ?? [] : [];

  return (
    <Stack
      flexWrap={"wrap"}
      direction="row"
      gap={1}
      justifyContent="flex-start"
    >
      {bases.map((currency) => (
        <Button
          key={currency.name}
          sx={{ borderRadius: 8 }}
          onClick={() => onCurrencySelect?.(currency)}
        >
          <Stack direction="row" gap={1}>
            <CurrencyLogo currency={currency} />
            <Typography>{currency.symbol}</Typography>
          </Stack>
        </Button>
      ))}
    </Stack>
  );
};

export default CommonBases;
