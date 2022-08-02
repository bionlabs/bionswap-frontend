import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  Box,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Currency, CurrencyAmount, JSBI } from "@bionswap/core-sdk";
import { CurrencyLogo } from "components";
import CurrencySearchModal from "components/CurrencySearchModal";
import { useAccount, useCurrencyBalance, useUSDCValue } from "hooks";
import { useCallback, useState } from "react";
import { tryParseAmount } from "utils/parse";

type Props = {
  value: string;
  onUserInput: (value: string) => void;
  onInputBlur?: () => void;
  onCurrencySelect?: (currency: Currency) => void;
  currency?: Currency;
  otherCurrency?: Currency;
};

const CurrencyInputPanel = ({
  value,
  onUserInput,
  onInputBlur,
  onCurrencySelect,
  currency,
  otherCurrency,
}: Props) => {
  const { address: account } = useAccount();
  const currencyBalance = useCurrencyBalance(account, currency);
  const usdValue = useUSDCValue(tryParseAmount(value || "1", currency));

  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const handleCurrencySelect = useCallback(
    (currency: Currency) => {
      onCurrencySelect?.(currency);
      setSearchModalOpen(false);
    },
    [onCurrencySelect]
  );

  return (
    <Box>
      <Stack>
        <Stack direction="row" justifyContent="space-between" width={"100%"}>
          <Button
            onClick={() => setSearchModalOpen(true)}
            sx={{
              boxShadow: "none",
              justifyContent: "space-between",
            }}
            endIcon={
              <ArrowDropDownIcon
                sx={{
                  color: "text.secondary",
                }}
              />
            }
          >
            <Stack direction="row">
              <CurrencyLogo currency={currency} size={20} />
              <Typography
                sx={{
                  ml: 1,
                  fontWeight: 500,
                  fontSize: 16,
                }}
              >
                {currency?.symbol}
              </Typography>
            </Stack>
          </Button>

          <Typography
            sx={{ color: "text.secondary", fontWeight: 500, fontSize: 14 }}
          >
            Balance: {`${currencyBalance?.toFixed(2) || 0}`}
          </Typography>
        </Stack>
        <TextField
          type={"number"}
          variant="standard"
          value={value}
          onChange={(e) => {
            onUserInput(e.target.value);
          }}
          onBlur={() => {
            onInputBlur?.();
          }}
          sx={{
            width: 350,
            "& .MuiInputBase-input": {
              fontWeight: "500",
              fontSize: 28,
            },
            borderRadius: 1,
            backgroundColor: "rgb(247, 248, 250)",
            px: 2
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Typography color={"text.secondary"} fontSize={14}>{`~$${
                  usdValue?.toFixed(2) || 0
                }`}</Typography>
              </InputAdornment>
            ),
            disableUnderline: true,
          }}
        />
        <CurrencySearchModal
          open={searchModalOpen}
          onClose={() => setSearchModalOpen(false)}
          onCurrencySelect={handleCurrencySelect}
        />
      </Stack>
    </Box>
  );
};

export default CurrencyInputPanel;
