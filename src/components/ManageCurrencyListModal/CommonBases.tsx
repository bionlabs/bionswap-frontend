import { Currency } from "@bionswap/core-sdk";
import { Button, Stack, styled, Typography } from "@mui/material";
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
      gap='10px'
      justifyContent="flex-start"
    >
      {bases.map((currency) => (
        <WrapButton
          key={currency.name}
          onClick={() => onCurrencySelect?.(currency)}
        >
          <Stack direction="row" gap='5px'>
            <CurrencyLogo currency={currency} />
            <Typography variant="body3Poppins" fontWeight='400' color='#FFF3F3'>
              {currency.symbol}
            </Typography>
          </Stack>
        </WrapButton>
      ))}
    </Stack>
  );
};

const WrapButton = styled(Button)`
  border-radius: 8px;
  border: 1px solid #373F47;
  padding: 10px;
`

export default CommonBases;
