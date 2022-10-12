import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Box, Button, InputAdornment, Stack, styled, TextField, Typography } from "@mui/material";
import { Currency, CurrencyAmount, JSBI } from "@bionswap/core-sdk";
import { CurrencyLogo } from "components";
import CurrencySearch from "components/ManageCurrencyListModal/CurrencySearch";
import { useAccount, useCurrencyBalance, useUSDCValue } from "hooks";
import { useCallback, useState } from "react";
import { tryParseAmount } from "utils/parse";
import ManageCurrencyListModal from "components/ManageCurrencyListModal";

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
    onUserInput(currencyBalance?.toFixed(2)?.toString() || "");
  };

  const handleCloseSearchModal = useCallback(() => {
    setSearchModalOpen(false);
  }, []);

  return (
    <WrapCurrencyInputPanel>
      <Stack>
        <Stack direction="row" justifyContent="space-between" width={"100%"} mb="7px">
          <Typography variant="body3Poppins" sx={{
            color: 'gray.300',
            fontWeight: '400',
          }}>
            {`~$${usdValue?.toFixed(2) || 0}`}
          </Typography>
          <Typography variant="body3Poppins" sx={{
            color: 'gray.300',
            fontWeight: '400',
          }}>
            Balance: {`${currencyBalance?.toFixed(4) || 0}`}
          </Typography>
        </Stack>
        <TextField
          type={"number"}
          variant="standard"
          value={value}
          placeholder='0.0'
          onChange={(e) => {
            onUserInput(e.target.value);
          }}
          onBlur={() => {
            onInputBlur?.();
          }}
          sx={{
            backgroundColor: "transparent",
            width: '100%',

            "& .MuiInputBase-input": {
              fontWeight: "400",
              fontSize: "28px",
              lineHeight: "180%",
              padding: "0",
              color: 'text.primary'
            },
            borderRadius: 1,
          }}
          InputProps={{
            endAdornment: (
              // <InputAdornment position="end">

              // </InputAdornment>
              <Button
                onClick={() => setSearchModalOpen(true)}
                sx={{
                  boxShadow: "none",
                  justifyContent: "space-between",
                  minWidth: "auto",
                  backgroundColor: "gray.700",
                  borderRadius: '9px',
                  padding: "0 9px",

                  '&:hover': {
                    backgroundColor: "gray.700",
                  }
                }}
                endIcon={
                  <ArrowDropDownIcon
                    sx={{
                      color: "text.primary",
                    }}
                  />
                }
              >
                <Stack direction="row" gap='5px'>
                  <CurrencyLogo currency={currency} size={20} />
                  <Typography variant="body2Poppins" sx={{
                    fontWeight: '500',
                    color: '#FFF3F3',
                  }}>
                    {currency?.symbol}
                  </Typography>
                </Stack>
              </Button>
            ),
            disableUnderline: true,
          }}
        />
        <Stack alignItems='flex-start' width='100%' mt='8px'>
          {isMax && <MaxButton onClick={handleMaxBalance}>Max</MaxButton>}
        </Stack>
        <ManageCurrencyListModal
          open={searchModalOpen}
          onDismiss={handleCloseSearchModal}
          onCurrencySelect={handleCurrencySelect}
        />
      </Stack>
    </WrapCurrencyInputPanel>
  );
};

const WrapCurrencyInputPanel = styled(Box)`
  border-radius: 8px;
  background: ${(props) => props.theme.palette.primary.dark};
  padding: 15px;
  border: 1px solid;
  border-color: ${(props) => props.theme.palette.primary.dark};

  &:hover {
    border-color: ${(props) => props.theme.palette.gray[500]};
  }
`;
const MaxButton = styled(Button)`
  color: ${(props) => props.theme.palette.primary.main};;
  text-align: center;
  font-weight: 400;
  font-size: 12px;
  line-height: 24px;
  font-family: "Poppins", sans-serif;
  background: transparent;
  border: 1px solid rgba(141, 241, 250, .5);
  border-radius: 8px;
  width: 45px;
  padding: 1px;
`;

export default CurrencyInputPanel;
