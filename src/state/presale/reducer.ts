import { createReducer } from "@reduxjs/toolkit";
import { setPresaleForm } from "./action";

export type PreSaleState = {
    dataConfig: {
        projectTitle: string,
        projectLogo: string,
        saleBanner: string,
        videoPromo: string,
        community: string,
        tokenContract: string,
        currency: string,
        saleFee: number,
        tokenPrice: string,
        whitelist: number,
        minGoal: string,
        maxGoal: string,
        minSale: string,
        maxSale: string,
        launchTime: string,
        preSaleDuration: number,
        unsoldToken: number,
        tokenDistributionTime: string,
        vestingToken: string,
        listing: number,
        dex: string,
        pricePerToken: string,
        liquidityPercentage: string,
        lockupTime: string,
        description: string,
    };
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
        unsoldToken: 0,
        tokenDistributionTime: '',
        vestingToken: '',
        listing: 0,
        dex: '',
        pricePerToken: '',
        liquidityPercentage: '',
        lockupTime: '',
        description: '',
    },
};

export default createReducer<PreSaleState>(initialState, (builder) =>
    builder.addCase(setPresaleForm, (state, { payload: setPresaleForm }) => {
        state.dataConfig = setPresaleForm;
    })
);
