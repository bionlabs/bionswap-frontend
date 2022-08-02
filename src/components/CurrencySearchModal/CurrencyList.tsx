import {
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
          <Stack sx={{ ml: 2 }}>
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
        ) : (
          <CircularProgress
            size={15}
            sx={{
              mr: 2,
            }}
          />
        )}
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
    <FixedSizeList
      height={400}
      width={360}
      itemSize={55}
      itemCount={currencies.length}
      overscanCount={5}
      itemData={currencies}
    >
      {renderCurrencyRow}
    </FixedSizeList>
  );
};

export default CurrencyList;
