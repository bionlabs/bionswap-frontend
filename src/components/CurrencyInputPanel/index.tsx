import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  Box,
  Button,
  InputAdornment,
  Stack,
  styled,
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
  isMax?: boolean;
};

const CurrencyInputPanel = ({
  value,
  onUserInput,
  onInputBlur,
  onCurrencySelect,
  currency,
  otherCurrency,
  isMax = false,
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

  const handleMaxBalance = () => {
    onUserInput(currencyBalance?.toFixed(2)?.toString() || "")
  }

  const handleCloseSearchModal = useCallback(() => {
    setSearchModalOpen(false);
  }, []);

  return (
    <WrapCurrencyInputPanel>
      <Stack>
        <Stack direction="row" justifyContent={isMax ? 'space-between' : 'end'} width={"100%"} mb='15px'>
          {
            isMax
            &&
            <MaxButton onClick={handleMaxBalance}>
              Max
            </MaxButton>
          }

          <Typography
            sx={{ color: "#7A858C", fontWeight: 400, fontSize: 12, lineHeight: "12px", fontFamily: "'Poppins', sans-serif" }}
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
            backgroundColor: 'transparent',

            "& .MuiInputBase-input": {
              fontWeight: "500",
              fontSize: '24px',
              lineHeight: '16px',
              padding: '0'
            },
            borderRadius: 1,
          }}
          InputProps={{
            endAdornment: (
              // <InputAdornment position="end">
              //   <Typography color={"text.secondary"} fontSize={14}>{`~$${
              //     usdValue?.toFixed(2) || 0
              //   }`}</Typography>
              // </InputAdornment>
              <Button
                onClick={() => setSearchModalOpen(true)}
                sx={{
                  boxShadow: "none",
                  justifyContent: "space-between",
                  minWidth: 'auto',
                  background: '#202124',
                  padding: '7px 10px'
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
            ),
            disableUnderline: true,
          }}
        />
        <CurrencySearchModal
          open={searchModalOpen}
          onClose={handleCloseSearchModal}
          onCurrencySelect={handleCurrencySelect}
        />
      </Stack>
    </WrapCurrencyInputPanel>
  );
};

const WrapCurrencyInputPanel = styled(Box)`
  border-radius: 8px;
  background: #121315;
  padding: 15px;
`
const MaxButton = styled(Button)`
  color: #07E0E0;
  text-align: center;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  font-family: 'Poppins', sans-serif;
  background: rgba(141, 241, 250, 0.05);
  border: 1px solid rgba(141, 241, 250, 0.5);
  border-radius: 8px;
  max-width: 60px;
  width: 100%;
  padding: 1px;
`

export default CurrencyInputPanel;
