import { createAction } from '@reduxjs/toolkit';

export const setPresaleForm = createAction<
  Partial<{
    projectTitle: string;
    projectLogo: string;
    saleBanner: string;
    videoPromo: string;
    community: string;
    tokenContract: string;
    currency: string;
    saleFee: number;
    tokenPrice: string;
    whitelist: number;
    minGoal: string;
    maxGoal: string;
    minSale: string;
    maxSale: string;
    launchTime: number;
    preSaleDuration: number;
    endTime: number;
    unsoldToken: number;
    tokenDistributionTime: number;
    vestingToken: string;
    firstRelease: string;
    vestingPeriodEachCycle: string;
    tokenReleaseEachCycle: string;
    listing: number;
    dex: string;
    pricePerToken: string;
    liquidityPercentage: string;
    lockupTime: number;
    description: string;
    quoteToken: string;
    isQuoteETH: boolean;
    baseFee: number;
    tokenFee: number;
    tgeDate: number;
    isAutoListing: boolean;
    router: string;
  }>
>('presale/setPresaleForm');

export const setStepLaunchpad = createAction<number>('presale/setStepLaunchpad');
