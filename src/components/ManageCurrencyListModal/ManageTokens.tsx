import { Token } from "@bionswap/core-sdk";
import { Button, IconButton, OutlinedInput, Stack, Typography } from "@mui/material";
import { CurrencyLogo } from "components";
import { useChain, useToken } from "hooks";
import React, { useCallback, useMemo, useState } from "react";
import { useRemoveUserAddedToken, useUserAddedTokens } from "state/user/hooks";
import { isAddress } from "utils/validate";
import { ManageCurrencyListModalView, useManageCurrencyListModalContext } from ".";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { getExplorerLink } from "utils/explorer";
import ImportRow from "./ImportRow";

type Props = {};

const ManageTokens = (props: Props) => {
  const { setView, setImportToken } = useManageCurrencyListModalContext();
  const { chainId } = useChain();
  const [searchQuery, setSearchQuery] = useState<string>("");

  // manage focus on modal show
  const handleInput = useCallback((event: any) => {
    const input = event.target.value;
    const checkSum = isAddress(input);
    setSearchQuery(checkSum || input);
  }, []);

  // if they input an address, use it
  const isAddressSearch = isAddress(searchQuery);
  const searchToken = useToken(searchQuery);

  // all tokens for local list
  const userAddedTokens = useUserAddedTokens();
  const removeToken = useRemoveUserAddedToken();

  const handleRemoveAll = useCallback(() => {
    if (chainId && userAddedTokens) {
      userAddedTokens.map((token) => {
        return removeToken(chainId, token.address);
      });
    }
  }, [removeToken, userAddedTokens, chainId]);

  const TokenList = useMemo(() => {
    return (
      chainId &&
      userAddedTokens.map((token) => (
        <Stack
          key={token.address}
          direction="row"
          justifyContent="space-around"
          width="100%"
          sx={{ border: "1px solid rgba(32,34,49,.6)" }}
        >
          <Stack direction="row" gap={1} justifyContent="space-between">
            <CurrencyLogo currency={token} />
            <Typography>{token.symbol}</Typography>
          </Stack>
          <Stack direction="row">
            <IconButton onClick={() => removeToken(chainId, token.address)}>
              <DeleteOutlineIcon />
            </IconButton>
            <IconButton href={getExplorerLink(chainId, token.address, "address")} target="_blank" rel="noopener noreferrer">
              <OpenInNewIcon />
            </IconButton>
          </Stack>
        </Stack>
      ))
    );
  }, [userAddedTokens, chainId, removeToken]);

  const handleImport = useCallback(() => {
    if (searchToken) {
      setImportToken(searchToken);
    }

    setView(ManageCurrencyListModalView.importToken);
  }, [searchToken, setImportToken, setView]);

  return (
    <Stack width="100%" gap={2}>
      <OutlinedInput placeholder="0x" value={searchQuery} fullWidth onChange={handleInput} />
      <Stack direction="row" justifyContent="space-between" px={2} width="100%">
        <Typography>
          {userAddedTokens?.length} Custom {userAddedTokens.length === 1 ? "Token" : "Tokens"}
        </Typography>
        <Button onClick={handleRemoveAll}>
          <Typography>Clear all</Typography>
        </Button>
      </Stack>
      {searchToken && <ImportRow token={searchToken} onClick={handleImport} />}
      {TokenList}
    </Stack>
  );
};

export default ManageTokens;
