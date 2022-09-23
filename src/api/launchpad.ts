import { apiClient } from 'api';

export async function createPresale(payload: {
  chainId: number;
  title: string;
  logo: string;
  banner: string;
  videoURL: string;
  socials: string;
  description: string;
  owner: string;
  feeTo: string;
  router: string;
  token: string;
  quoteToken: string;
  isQuoteETH: boolean;
  isWhitelistEnabled: boolean;
  isBurnUnsold: boolean;
  price: string;
  listingPrice: string;
  minPurchase: string;
  maxPurchase: string;
  startTime: number;
  endTime: number;
  lpPercent: number;
  softCap: string;
  hardCap: string;
  isAutoListing: boolean;
  baseFee: number;
  tokenFee: number;
  tgeDate: number;
  tgeReleasePercent: number;
  cycleDuration: number;
  cycleReleasePercent: number;
}) {
  const data = await apiClient.post<{ data: { salt: string } }>('launchpad/sale-info', payload);

  return data.data.data;
}

export async function uploadLaunchpadImage(base64: string) {
  const result = await apiClient.post<{ data: { url: string } }>('launchpad/upload-image', {
    image: base64,
  });

  return result.data.data;
}
