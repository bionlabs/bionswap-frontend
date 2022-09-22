import { apiClient } from 'api';

export async function createPresale(payload: {
  chainId: number;
  owner: string;
  title: string;
  logo: string;
  banner: string;
  videoURL: string;
  website: string;
  socials: string;
  description: string;
  router: string;
  token: string;
  quoteToken: string;
  isQuoteETH: boolean;
  price: string;
  listingPrice: string;
  minPurchase: string;
  maxPurchase: string;
  startTime: number;
  endTime: number;
  lpPercent: number;
  softCap: string;
  hardCap: string;
  tgeDate: number;
  tgeReleasePercent: number;
  cycleDuration: number;
  cycleReleasePercent: number;
}) {
  const data = await apiClient.post<{ data: { salt: string } }>('launchpad/sale-info');

  return data.data.data;
}

export async function uploadLaunchpadImage(base64: string) {
  const result = await apiClient.post<{ data: { url: string } }>('launchpad/upload-image', {
    image: base64
  });

  return result.data.data;
} 