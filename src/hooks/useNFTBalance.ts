import { NEVER_RELOAD } from '@uniswap/redux-multicall';
import { useMemo } from 'react';
import { useSingleCallResult, useSingleContractWithCallData } from './useCall';
import { useEnumerableNFTContract } from './useContract';

export function useNFTBalanceDetail(collection: string, account?: string): number[] {
  const nftContract = useEnumerableNFTContract(collection, true);

  const balance = useSingleCallResult(nftContract, 'balanceOf', [account]).result?.[0] || 0;

  const callDatas = useMemo(() => {
    if (!balance || !nftContract) return [];

    return Array.from({ length: balance }, (_, i) =>
      nftContract.interface.encodeFunctionData('tokenOfOwnerByIndex', [account, i]),
    );
  }, [account, balance, nftContract]);

  const results = useSingleContractWithCallData(nftContract, callDatas);
  return results.map((result) => result.result?.[0].toNumber());
}
