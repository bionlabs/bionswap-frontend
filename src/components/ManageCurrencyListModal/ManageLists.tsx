import { Box, Button, OutlinedInput, Stack, TextField, Typography } from '@mui/material';
import { Switch } from 'components';
import { TokenList } from '@uniswap/token-lists';
import ListLogo from 'components/ListLogo';
import { UNSUPPORTED_LIST_URLS } from 'configs/token-lists';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useAllLists, useFetchListCallback, useActiveListUrls, useIsListActive } from 'state/lists/hooks';
import { uriToHttp } from 'utils/convert';
import { parseENSAddress } from 'utils/ens';
import { listVersionLabel } from 'utils/lists';
import { ManageCurrencyListModalView, useManageCurrencyListModalContext } from '.';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { AppState, useAppDispatch, useAppSelector } from 'state';
import { acceptListUpdate, disableList, enableList, removeList } from 'state/lists/actions';

type Props = {};

const ListRow = memo(({ listUrl }: { listUrl: string }) => {
  const listsByUrl = useAppSelector<AppState['lists']['byUrl']>((state) => state.lists.byUrl);
  const dispatch = useAppDispatch();
  const { current: list, pendingUpdate: pending } = listsByUrl[listUrl];
  const isActive = useIsListActive(listUrl);

  const handleAcceptListUpdate = useCallback(() => {
    if (!pending) return;
    gtag('event', 'Update List from List Select', {
      event_category: 'Lists',
      event_label: listUrl,
    });
    dispatch(acceptListUpdate(listUrl));
  }, [dispatch, listUrl, pending]);

  const handleRemoveList = useCallback(() => {
    gtag('event', 'Start Remove List', {
      event_category: 'Lists',
      event_label: listUrl,
    });

    if (window.prompt(`Please confirm you would like to remove this list by typing REMOVE`) === `REMOVE`) {
      gtag('event', 'Confirm Remove List', {
        event_category: 'Lists',
        event_label: listUrl,
      });

      dispatch(removeList(listUrl));
    }
  }, [dispatch, listUrl]);

  const handleEnableList = useCallback(() => {
    gtag("event", "Enable List", {
      event_category: "Lists",
      event_label: listUrl,
    });

    dispatch(enableList(listUrl));
  }, [dispatch, listUrl]);

  const handleDisableList = useCallback(() => {
    gtag("event", "Disable List", {
      event_category: "Lists",
      event_label: listUrl,
    });

    dispatch(disableList(listUrl));
  }, [dispatch, listUrl]);

  if (!list) return null;

  return (
    <Stack
      direction="row"
      width="100%"
      justifyContent="start"
      gap="10px"
      sx={{
        background: 'rgba(160, 236, 138, 0.15)',
        border: '1px solid #44C13C',
        borderRadius: '8px',
        padding: '15px',
      }}
    >
      {list.logoURI && <ListLogo size="40px" logoURI={list.logoURI} alt={`${list.name} list logo`} />}
      <Stack alignItems="start">
        <Typography variant="body4Poppins" fontWeight="500" color="text.primary">
          {list.name} <Typography component="span">{listVersionLabel(list.version)}</Typography>
        </Typography>
        <Typography variant="body4Poppins" fontWeight="400" color="blue.100">
          {list.tokens.length} tokens
        </Typography>
      </Stack>
      <Stack flex={1} justifyContent="end" direction="row" mr={1}>
        <Switch checked={isActive} onChange={() => (isActive ? handleDisableList() : handleEnableList())} />
        {/* <Switch checked={isActive} onChange={() => (isActive ? handleDisableList() : handleEnableList())} /> */}
      </Stack>
    </Stack>
  );
});

const ManageLists = (props: Props) => {
  const { setView, setImportList, setListUrl } = useManageCurrencyListModalContext();
  const [listUrlInput, setListUrlInput] = useState<string>('');
  const lists = useAllLists();
  const activeListUrls = useActiveListUrls();
  const [activeCopy, setActiveCopy] = useState<string[] | undefined>();
  const fetchList = useFetchListCallback();
  const [tempList, setTempList] = useState<TokenList>();
  const [addError, setAddError] = useState<string | undefined>();

  useEffect(() => {
    if (!activeCopy && activeListUrls) {
      setActiveCopy(activeListUrls);
    }
  }, [activeCopy, activeListUrls]);

  const handleInput = useCallback((e: any) => {
    setListUrlInput(e.target.value);
  }, []);

  const validUrl: boolean = useMemo(() => {
    return uriToHttp(listUrlInput).length > 0 || Boolean(parseENSAddress(listUrlInput));
  }, [listUrlInput]);

  const sortedLists = useMemo(() => {
    const listUrls = Object.keys(lists);
    return listUrls
      .filter((listUrl) => {
        // only show loaded lists, hide unsupported lists
        return Boolean(lists[listUrl].current) && !UNSUPPORTED_LIST_URLS.includes(listUrl);
      })
      .sort((u1, u2) => {
        const { current: l1 } = lists[u1];
        const { current: l2 } = lists[u2];

        // first filter on active lists
        if (activeCopy?.includes(u1) && !activeCopy?.includes(u2)) {
          return -1;
        }
        if (!activeCopy?.includes(u1) && activeCopy?.includes(u2)) {
          return 1;
        }

        if (l1 && l2) {
          return l1.name.toLowerCase() < l2.name.toLowerCase()
            ? -1
            : l1.name.toLowerCase() === l2.name.toLowerCase()
            ? 0
            : 1;
        }
        if (l1) return -1;
        if (l2) return 1;
        return 0;
      });
  }, [lists, activeCopy]);

  useEffect(() => {
    async function fetchTempList() {
      fetchList(listUrlInput, false)
        .then((list) => setTempList(list))
        .catch(() => setAddError('Error importing list'));
    }
    // if valid url, fetch details for card
    if (validUrl) {
      fetchTempList();
    } else {
      setTempList(undefined);
      listUrlInput !== '' && setAddError('Enter valid list location');
    }

    // reset error
    if (listUrlInput === '') {
      setAddError(undefined);
    }
  }, [fetchList, listUrlInput, validUrl]);

  // check if list is already imported
  const isImported = Object.keys(lists).includes(listUrlInput);

  // set list values and have parent modal switch to import list view
  const handleImport = useCallback(() => {
    if (!tempList) return;
    setImportList(tempList);
    setView(ManageCurrencyListModalView.importList);
    setListUrl(listUrlInput);
  }, [listUrlInput, setImportList, setListUrl, setView, tempList]);

  return (
    <Stack width="100%" gap={2}>
      <Box padding="0 15px 15px" width="100%">
        <OutlinedInput
          fullWidth
          placeholder="Enter token name / address..."
          onChange={handleInput}
          sx={{
            background: 'primary.dark',
            border: '1px solid',
            borderColor: 'gray.600',
            borderRadius: '8px',

            '&.Mui-focused': {
              borderColor: '#9A6AFF',
              boxShadow:
                'rgba(175, 137, 255, 0.4) 0px 0px 0px 2px, rgba(175, 137, 255, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset',
            },

            fieldset: {
              display: 'none',
            },

            input: {
              fontWeight: '400',
              fontSize: '16px',
              lineHeight: '180%',
              color: 'text.primary',
              padding: '13px 15px',
            },
          }}
        />
        {addError ? (
          <Typography color="error" title={addError}>
            {addError}
          </Typography>
        ) : null}
      </Box>
      {tempList && !addError && (
        <Stack direction="row" gap={1} width="100%" my={2}>
          <ListLogo size="40px" logoURI={tempList.logoURI} alt={`${tempList.name} list logo`} />
          <Stack alignItems="start">
            <Typography>
              {tempList?.name}{' '}
              {tempList && <Typography component="span">{listVersionLabel(tempList.version)}</Typography>}
            </Typography>
            <Typography color="text.secondary">{tempList?.tokens.length} tokens</Typography>
          </Stack>
          <Stack sx={{ flex: 1 }}>
            {isImported ? (
              <Stack direction="row" gap={1}>
                <TaskAltIcon sx={{ color: 'text.disabled' }} />
                <Typography color="text.disabled">Loaded</Typography>
              </Stack>
            ) : (
              <Button onClick={handleImport}>Import</Button>
            )}
          </Stack>
        </Stack>
      )}
      <Stack
        gap="20px"
        width="100%"
        sx={{
          borderTop: '1px solid',
          borderTopColor: 'gray.800',
          padding: '15px',
          maxHeight: '370px',
          overflowY: 'auto',
          justifyContent: 'flex-start',
        }}
      >
        {sortedLists.map((listUrl) => (
          <ListRow key={listUrl} listUrl={listUrl} />
        ))}
      </Stack>
    </Stack>
  );
};

export default ManageLists;
