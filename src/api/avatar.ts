import { authRequest, request } from 'api';

export async function getMyList(walletAddress: string) {
  const result = await request.get('/avatar/my-list', {
    params: {
      address: walletAddress,
    },
  });

  return result.data.data;
}

