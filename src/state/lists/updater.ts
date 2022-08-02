import { ChainId } from "@bionswap/core-sdk";
import {
  getVersionUpgrade,
  minVersionBump,
  VersionUpgrade,
} from "@uniswap/token-lists";
import {
  ARBITRUM_LIST,
  OPTIMISM_LIST,
  UNSUPPORTED_LIST_URLS,
} from "configs/token-lists";
import { useChain, useInterval, useIsWindowVisible } from "hooks";
import { useCallback, useEffect } from "react";
import { useAppDispatch } from "state";
import { acceptListUpdate, enableList } from "./actions";
import { useActiveListUrls, useAllLists, useFetchListCallback } from "./hooks";

export function ListsUpdater(): null {
  const { chainId, provider } = useChain();

  const dispatch = useAppDispatch();
  const isWindowVisible = useIsWindowVisible();

  // get all loaded lists, and the active urls
  const lists = useAllLists();
  const activeListUrls = useActiveListUrls();

  const fetchList = useFetchListCallback();
  const fetchAllListsCallback = useCallback(() => {
    if (!isWindowVisible) return;
    Object.keys(lists).forEach((url) =>
      fetchList(url).catch((error) =>
        console.debug("interval list fetching error", error)
      )
    );
  }, [fetchList, isWindowVisible, lists]);

  useEffect(() => {
    if (chainId && chainId === ChainId.ARBITRUM) {
      dispatch(enableList(ARBITRUM_LIST));
    }
    if (chainId && chainId === ChainId.OPTIMISM) {
      dispatch(enableList(OPTIMISM_LIST));
    }
  }, [chainId, dispatch]);
  // fetch all lists every 10 minutes, but only after we initialize library
  useInterval(fetchAllListsCallback, provider ? 1000 * 60 * 10 : null);

  // whenever a list is not loaded and not loading, try again to load it
  useEffect(() => {
    Object.keys(lists).forEach((listUrl) => {
      const list = lists[listUrl];
      if (!list.current && !list.loadingRequestId && !list.error) {
        fetchList(listUrl).catch((error) =>
          console.debug("list added fetching error", error)
        );
      }
    });
  }, [dispatch, fetchList, provider, lists]);

  // if any lists from unsupported lists are loaded, check them too (in case new updates since last visit)
  useEffect(() => {
    UNSUPPORTED_LIST_URLS.forEach((listUrl) => {
      const list = lists[listUrl];
      if (!list || (!list.current && !list.loadingRequestId && !list.error)) {
        fetchList(listUrl).catch((error) =>
          console.debug("list added fetching error", error)
        );
      }
    });
  }, [dispatch, fetchList, provider, lists]);

  // automatically update lists if versions are minor/patch
  useEffect(() => {
    Object.keys(lists).forEach((listUrl) => {
      const list = lists[listUrl];
      if (list.current && list.pendingUpdate) {
        const bump = getVersionUpgrade(
          list.current.version,
          list.pendingUpdate.version
        );
        switch (bump) {
          case VersionUpgrade.NONE:
            throw new Error("unexpected no version bump");
          case VersionUpgrade.PATCH:
          case VersionUpgrade.MINOR:
            const min = minVersionBump(
              list.current.tokens,
              list.pendingUpdate.tokens
            );
            // automatically update minor/patch as long as bump matches the min update
            if (bump >= min) {
              dispatch(acceptListUpdate(listUrl));
            } else {
              console.error(
                `List at url ${listUrl} could not automatically update because the version bump was only PATCH/MINOR while the update had breaking changes and should have been MAJOR`
              );
            }
            break;

          // update any active or inactive lists
          case VersionUpgrade.MAJOR:
            dispatch(acceptListUpdate(listUrl));
        }
      }
    });
  }, [dispatch, lists, activeListUrls]);

  return null;
}
