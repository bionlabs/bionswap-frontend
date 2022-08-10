import { ChainId, Currency, NATIVE, Token } from "@bionswap/core-sdk";
import CloseIcon from "@mui/icons-material/Close";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { IconButton, Stack, TextField, Tooltip, Typography } from "@mui/material";
import { BaseModal } from "components";
import {
  useAllTokens,
  useChain,
  useDebounce,
  useIsUserAddedToken,
  useSortedTokensByQuery,
  useToken,
  useTokenComparator,
} from "hooks";
import React, { memo, useCallback, useMemo, useState } from "react";
import { filterTokens } from "utils/filter";
import { isAddress } from "utils/validate";
import CommonBases from "./CommonBases";
import CurrencyList from "./CurrencyList";

type Props = {
  open: boolean;
  onClose: () => void;
  onCurrencySelect?: (currency: Currency) => void;
};

const CurrencySearchModal = ({ open, onClose, onCurrencySelect }: Props) => {
  const { chainId } = useChain();
  const allTokens = useAllTokens();
  const currencies = useMemo(() => Object.values(allTokens), [allTokens]);

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = React.useState("");

  const [, cancelSearch] = useDebounce(
    () => {
      setDebouncedSearchQuery(searchQuery);
    },
    200,
    [searchQuery]
  );

  const isAddressSearch = isAddress(debouncedSearchQuery);
  const searchToken = useToken(debouncedSearchQuery);
  const searchTokenIsAdded = useIsUserAddedToken(searchToken);
  const tokenComparator = useTokenComparator();

  const filteredTokens: Token[] = useMemo(() => {
    return filterTokens(Object.values(allTokens), debouncedSearchQuery);
  }, [allTokens, debouncedSearchQuery]);

  const sortedTokens: Token[] = useMemo(() => {
    return filteredTokens.sort(tokenComparator);
  }, [filteredTokens, tokenComparator]);

  const filteredSortedTokens = useSortedTokensByQuery(sortedTokens, debouncedSearchQuery);

  // @ts-ignore TYPE NEEDS FIXING
  const ether = useMemo(() => chainId && ![ChainId.CELO].includes(chainId) && NATIVE[chainId], [chainId]);

  const filteredSortedTokensWithETH: Currency[] = useMemo(() => {
    const s = debouncedSearchQuery.toLowerCase().trim();
    if (s === "" || s === "e" || s === "et" || s === "eth") {
      return ether ? [ether, ...filteredSortedTokens] : filteredSortedTokens;
    }
    return filteredSortedTokens;
  }, [debouncedSearchQuery, ether, filteredSortedTokens]);

  const handleInput = useCallback((event: any) => {
    const input = event.target.value;
    const checkSum = isAddress(input);
    setSearchQuery(checkSum || input);
  }, []);

  return (
    <BaseModal open={open} onClose={onClose}>
      <Stack sx={{ width: "470px" }}>
        <Stack direction="row" justifyContent="space-between" mb={1} width="100%">
          <Typography fontSize={16} fontWeight={700}>
            Select a token
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Stack
          sx={{
            borderRadius: 1,
            backgroundColor: "extra.input.background",
            px: 2,
            height: 50,
            width: "100%",
            mb: "8px",
            "&:focus-within": {
              border: "1px solid",
              borderColor: "primary.main",
            },
          }}
        >
          <TextField
            variant="standard"
            placeholder="Search name or paste address"
            fullWidth
            value={searchQuery}
            onChange={handleInput}
            sx={{
              borderRadius: 1,
            }}
            InputProps={{
              disableUnderline: true,
            }}
          />
        </Stack>

        <Stack sx={{ mt: 1, mb: 2 }}>
          <Stack direction="row" alignSelf="flex-start" gap={1} mb={1}>
            <Typography fontSize={12} sx={{ color: "text.secondary" }}>
              Common bases
            </Typography>
            <Tooltip title="These token are commonly paired with other tokens">
              <HelpOutlineIcon sx={{ fontSize: 15 }} />
            </Tooltip>
          </Stack>
          <CommonBases onCurrencySelect={onCurrencySelect} />
        </Stack>

        <CurrencyList currencies={filteredSortedTokensWithETH} onCurrencySelect={onCurrencySelect} />
      </Stack>
    </BaseModal>
  );
};

export default memo(CurrencySearchModal);
