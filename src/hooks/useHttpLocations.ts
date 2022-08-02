import { useENSContentHash } from "hooks";
import { useMemo } from "react";
import { contenthashToUri, uriToHttp } from "utils/convert";
import { parseENSAddress } from "utils/ens";

export function useHttpLocations(uri: string | undefined): string[] {
  const ens = useMemo(() => (uri ? parseENSAddress(uri) : undefined), [uri]);
  const resolvedContentHash = useENSContentHash(ens?.ensName);
  return useMemo(() => {
    if (ens) {
      return resolvedContentHash.contenthash
        ? uriToHttp(contenthashToUri(resolvedContentHash.contenthash))
        : [];
    } else {
      return uri ? uriToHttp(uri) : [];
    }
  }, [ens, resolvedContentHash.contenthash, uri]);
}
