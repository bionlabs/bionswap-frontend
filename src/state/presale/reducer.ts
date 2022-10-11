import { createReducer } from '@reduxjs/toolkit';
import { ethers } from 'ethers';
import { clearPresaleForm, setPresaleForm, setStepLaunchpad } from './action';

export type PreSaleState = {
  dataConfig: {
    projectTitle: string;
    projectLogo: string;
    saleBanner: string;
    videoPromo: string;
    community: string;
    tokenContract: string;
    currency: string;
    saleFee: string;
    tokenPrice: string;
    whitelist: string;
    minGoal: string;
    maxGoal: string;
    minSale: string;
    maxSale: string;
    launchTime: number;
    preSaleDuration: number;
    endTime: number;
    unsoldToken: string;
    tokenDistributionTime: number;
    vestingToken: string;
    firstRelease: string;
    vestingPeriodEachCycle: string;
    tokenReleaseEachCycle: string;
    listing: string;
    isAutoListing: boolean;
    dex: string;
    listingPrice: string;
    liquidityPercentage: string;
    lockupTime: number;
    description: string;
    quoteToken: string;
    isQuoteETH: boolean;
    baseFee: number;
    tokenFee: number;
    tgeDate: number;
    router: string;
  };

  step: number;
};

export const initialState: PreSaleState = {
  dataConfig: {
    projectTitle: '',
    projectLogo: '',
    saleBanner: '',
    videoPromo: '',
    community: '',
    tokenContract: '',
    currency: 'BUSD',
    saleFee: '0',
    tokenPrice: '0',
    whitelist: '0',
    minGoal: '0',
    maxGoal: '0',
    minSale: '0',
    maxSale: '0',
    launchTime: +new Date(),
    preSaleDuration: 0,
    endTime: +new Date(),
    unsoldToken: '0',
    tokenDistributionTime: +new Date(),
    vestingToken: '0',
    firstRelease: '0',
    vestingPeriodEachCycle: '0',
    tokenReleaseEachCycle: '0',
    listing: '0',
    isAutoListing: false,
    dex: '0',
    listingPrice: '1',
    liquidityPercentage: '0',
    lockupTime: 0,
    description: '',
    quoteToken: ethers.constants.AddressZero,
    isQuoteETH: false,
    baseFee: 0,
    tokenFee: 0,
    tgeDate: +new Date(),
    router: ethers.constants.AddressZero,
  },
  step: 0,
};

export default createReducer<PreSaleState>(initialState, (builder) =>
  builder
    .addCase(setPresaleForm, (state, { payload: setPresaleForm }) => {
      state.dataConfig = { ...state.dataConfig, ...setPresaleForm };
    })
    .addCase(setStepLaunchpad, (state, { payload: setStepLaunchpad }) => {
      state.step = setStepLaunchpad;
    })
    .addCase(clearPresaleForm, (state) => {
      state.step = 0;
      state.dataConfig = initialState.dataConfig;
    }),
);
