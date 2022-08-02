import { parse, ParsedQs } from "qs";
import { useMemo } from "react";

export function useParsedQueryString(): ParsedQs {
  const search = typeof location !== "undefined" ? location.search : undefined;
  return useMemo(
    () =>
      search && search.length > 1
        ? parse(search, { parseArrays: false, ignoreQueryPrefix: true })
        : {},
    [search]
  );
}
