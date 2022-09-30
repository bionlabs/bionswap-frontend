import { getAvatarListByTokenIds } from 'api/avatar';
import { BION_AVATAR_ADDRESS } from 'constants/addresses';
import { useChain, useNFTBalanceDetail } from 'hooks';
import { useEffect, useState } from 'react';

export function useBionAvatarBalanceDetail(account?: string) {
  const [avatarDetails, setAvatarDetails] = useState<any[]>([]);
  const { chainId } = useChain();
  const tokenIds = useNFTBalanceDetail(BION_AVATAR_ADDRESS[chainId], account);

  useEffect(() => {
    if (!tokenIds) return;

    const fetchAvatarList = async () => {
      const list = await getAvatarListByTokenIds(tokenIds);

      setAvatarDetails(list);
    };

    fetchAvatarList();
  }, [tokenIds]);

  return avatarDetails;
}
