import { Token } from "@bionswap/core-sdk";
import { Box, Button, IconButton, OutlinedInput, Stack, styled, TextField, Typography } from "@mui/material";
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
        // <Stack
        //   key={token.address}
        //   direction="row"
        //   justifyContent="space-between"
        //   width="100%"
        // >
        //   <Stack direction="row" gap={1} justifyContent="space-between">
        //     <CurrencyLogo currency={token} />
        //     <Typography>{token.symbol}</Typography>
        //   </Stack>
        //   <Stack direction="row">
        //     <IconButton onClick={() => removeToken(chainId, token.address)}>
        //       <DeleteOutlineIcon />
        //     </IconButton>
        //     <IconButton href={getExplorerLink(chainId, token.address, "address")} target="_blank" rel="noopener noreferrer">
        //       <OpenInNewIcon />
        //     </IconButton>
        //   </Stack>
        // </Stack>
        <Stack key={token.address} direction="row" justifyContent="space-between" width="100%" sx={{ pl: '15px', pr: '15px' }}>
          <Stack direction="row">
            <CurrencyLogo currency={token} size='26px' />
            <Stack sx={{ ml: '10px', alignItems: "flex-start" }}>
              <Stack direction="row" gap='4px'>
                <Typography variant="body4Poppins" color='text.primary' fontWeight='500'>
                  {token.symbol}
                </Typography>
                <Typography variant="body6Poppins" color='#9A6AFF' fontWeight='500'>
                  {token.name}
                </Typography>
              </Stack>
              <Typography variant="body4Poppins" color='#717D8A' fontWeight='400'>
                Unknown Source
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row">
            <IconButton onClick={() => removeToken(chainId, token.address)}>
              <DeleteOutlineIcon />
            </IconButton>
            <IconButton href={getExplorerLink(chainId, token.address, "address")} target="_blank" rel="noopener noreferrer">
              <OpenInNewIcon sx={{
                color: "#9A6AFF",
              }} />
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
    <Stack width="100%" gap='20px' paddingBottom='23px'>
      <Box pl='15px' pr='15px' width='100%'>
        <TextField
          variant="standard"
          placeholder="Enter token name / address..."
          fullWidth
          value={searchQuery}
          onChange={handleInput}
          sx={{

            '.MuiInputBase-formControl': {
              borderRadius: '8px',
              padding: '13px 15px',
              backgroundColor: 'background.default',
              border: '1px solid',
              borderColor: 'gray.600',

              '&.Mui-focused': {
                borderColor: '#9A6AFF',
                boxShadow: 'rgba(175, 137, 255, 0.4) 0px 0px 0px 2px, rgba(175, 137, 255, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset',
              }
            },

            'input': {
              fontWeight: '400',
              fontSize: '16px',
              lineHeight: '180%',
            }
          }}
          InputProps={{
            endAdornment: <img src="/images/search.png" alt="search" />,
            disableUnderline: true,
          }}
        />
      </Box>
      <Line />
      <Stack direction="row" justifyContent="space-between" pl='15px' pr='15px' width="100%">
        <Typography variant="body3Poppins" color='gray.400' fontWeight='500'>
          {userAddedTokens?.length} Custom {userAddedTokens.length === 1 ? "Token" : "Tokens"}
        </Typography>
        <Button onClick={handleRemoveAll} sx={{
          padding: '0'
        }}>
          <Typography variant="body3Poppins" color='#9A6AFF' fontWeight='400'>
            Clear all
          </Typography>
        </Button>
      </Stack>
      {searchToken && <ImportRow token={searchToken} onClick={handleImport} />}
      {TokenList}
    </Stack>
  );
};

const Line = styled(Box)`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.palette.gray[800]};
`

export default ManageTokens;
