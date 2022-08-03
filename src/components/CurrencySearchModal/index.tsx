import { TextField } from "@mui/material";
import { ChainId, Currency, NATIVE, Token } from "@bionswap/core-sdk";
import { BaseModal } from "components";
import {
  useAllTokens,
  useChain,
  useDebounce,
  useIsUserAddedToken,
  useNetwork,
  useSortedTokensByQuery,
  useToken,
  useTokenComparator,
} from "hooks";
import React, { memo, useCallback, useMemo, useState } from "react";
import CurrencyList from "./CurrencyList";
import { isAddress } from "utils/validate";
import { filterTokens } from "utils/filter";

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

  const filteredSortedTokens = useSortedTokensByQuery(
    sortedTokens,
    debouncedSearchQuery
  );

  // @ts-ignore TYPE NEEDS FIXING
  const ether = useMemo(
    () => chainId && ![ChainId.CELO].includes(chainId) && NATIVE[chainId],
    [chainId]
  );

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
      <TextField
        placeholder="Search name or paste address"
        fullWidth
        value={searchQuery}
        onChange={handleInput}
      ></TextField>
      <CurrencyList
        currencies={filteredSortedTokensWithETH}
        onCurrencySelect={onCurrencySelect}
      ></CurrencyList>
    </BaseModal>
  );
};

export default memo(CurrencySearchModal);
