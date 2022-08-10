import {
  Box,
  CircularProgress,
  ListItem,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { Currency } from "@bionswap/core-sdk";
import CurrencyLogo from "components/CurrencyLogo";
import { WrappedTokenInfo } from "entities/WrappedTokenInfo";
import { useAccount, useCurrencyBalance } from "hooks";
import { CSSProperties, useCallback } from "react";
import { FixedSizeList, ListChildComponentProps } from "react-window";

type CurrencyRow = {
  currency: Currency;
  onCurrencySelect?: (currency: Currency) => void;
  style?: CSSProperties;
  index?: number;
};

type CurrencyListProps = {
  currencies: Currency[];
  otherListTokens?: WrappedTokenInfo[];
  selectedCurrency?: Currency | null;
  otherCurrency?: Currency | null;
  onCurrencySelect?: (currency: Currency) => void;
};

const CurrencyRow = ({
  currency,
  style,
  index,
  onCurrencySelect,
}: CurrencyRow) => {
  const { address: account } = useAccount();
  const balance = useCurrencyBalance(account ?? undefined, currency);

  return (
    <MenuItem style={style} onClick={() => onCurrencySelect?.(currency)}>
      <Stack direction="row" justifyContent="space-between" width="100%">
        <Stack direction="row">
          <CurrencyLogo currency={currency} />
          <Stack sx={{ ml: 2, alignItems: "flex-start" }}>
            <Typography sx={{ color: "text.secondary" }}>
              {currency.name}
            </Typography>
            <Typography>{currency.symbol}</Typography>
          </Stack>
        </Stack>
        {balance ? (
          <Typography sx={{ color: "text.secondary", mr: 2 }}>
            {balance.toFixed(2)}
          </Typography>
        ) : account ? (
          <CircularProgress
            size={15}
            sx={{
              mr: 2,
            }}
          />
        ) : null}
      </Stack>
    </MenuItem>
  );
};

const CurrencyList = ({
  currencies,
  otherCurrency,
  otherListTokens,
  selectedCurrency,
  onCurrencySelect,
}: CurrencyListProps) => {
  const renderCurrencyRow = useCallback(
    ({ data, style, index }: ListChildComponentProps) => {
      return (
        <CurrencyRow
          currency={data[index]}
          key={data.symbol}
          style={style}
          index={index}
          onCurrencySelect={onCurrencySelect}
        />
      );
    },
    [onCurrencySelect]
  );

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: 2,
        border: "1px solid #F2F3F3",
        overflow: "hidden",
      }}
    >
      <FixedSizeList
        height={400}
        width="100%"
        itemSize={55}
        itemCount={currencies.length}
        overscanCount={10}
        itemData={currencies}
      >
        {renderCurrencyRow}
      </FixedSizeList>
    </Box>
  );
};

export default CurrencyList;
