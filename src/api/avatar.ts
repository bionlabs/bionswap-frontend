import { request } from 'api';

export const getAvatarListByTokenIds = async (tokenIds: number[]) => {
  const { data } = await request.get<{ data: { imageURL: string, tokenId: number }[] }>('/avatar/list-by-token-ids', {
    params: {
      tokenIds: tokenIds,
    },
  });

  return data.data;
};
