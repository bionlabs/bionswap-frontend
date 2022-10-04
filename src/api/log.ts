import { request } from 'api';

export async function swapLog(payload: {
  chainId: number;
  account: string;
  txHash: string;
  inputSymbol?: string;
  outputSymbol?: string;
  inputAmount?: string;
  outputAmount?: string;
}) {
  const result = await request.post('/swap-log', payload);

  return result;
}
