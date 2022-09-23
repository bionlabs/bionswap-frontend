import { createReducer } from '@reduxjs/toolkit';
import { setPresaleForm, setStepLaunchpad } from './action';

export type PreSaleState = {
  dataConfig: {
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
    launchTime: string;
    preSaleDuration: number;
    endTime: string;
    unsoldToken: number;
    tokenDistributionTime: string;
    vestingToken: string;
    firstRelease: string;
    vestingPeriodEachCycle: string;
    tokenReleaseEachCycle: string;
    listing: number;
    isAutoListing: boolean;
    dex: string;
    pricePerToken: string;
    liquidityPercentage: string;
    lockupTime: string;
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

const initialState: PreSaleState = {
  dataConfig: {
    projectTitle: '',
    projectLogo: '',
    saleBanner: '',
    videoPromo: '',
    community: '',
    tokenContract: '',
    currency: 'busd',
    saleFee: 0,
    tokenPrice: '',
    whitelist: 0,
    minGoal: '',
    maxGoal: '',
    minSale: '',
    maxSale: '',
    launchTime: '',
    preSaleDuration: 0,
    endTime: '',
    unsoldToken: 0,
    tokenDistributionTime: '',
    vestingToken: '',
    firstRelease: '',
    vestingPeriodEachCycle: '',
    tokenReleaseEachCycle: '',
    listing: 0,
    isAutoListing: false,
    dex: '',
    pricePerToken: '',
    liquidityPercentage: '',
    lockupTime: '',
    description: '',
    quoteToken: '',
    isQuoteETH: false,
    baseFee: 0,
    tokenFee: 0,
    tgeDate: 0,
    router: '',
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
    }),
);
