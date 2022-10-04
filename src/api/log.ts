import { request } from 'api';
import jwt from 'jsonwebtoken';

export async function swapLog(payload: {
  chainId: number;
  account: string;
  txHash: string;
  inputSymbol?: string;
  outputSymbol?: string;
  inputAmount?: string;
  outputAmount?: string;
}) {
  const sig = jwt.sign(payload, process.env.NEXT_PUBLIC_LOG_KEY!);

  const result = await request.post('/swap-log', {
    sig,
  });

  return result;
}
