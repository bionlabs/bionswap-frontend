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
        whitelist: boolean,
        goal: {
            min: string,
            max: string
        },
        sale: {
            min: string,
            max: string
        },
        launchTime: string,
        preSaleDuration: number,
        listing: number,
        dex: string,
        pricePerToken: string,
        liquidityPercentage: string,
        lockupTime: number,
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
        whitelist: true,
        goal: {
            min: '',
            max: ''
        },
        sale: {
            min: '',
            max: ''
        },
        launchTime: '',
        preSaleDuration: 0,
        listing: 0,
        dex: '',
        pricePerToken: '',
        liquidityPercentage: '',
        lockupTime: 0,
        description: '',
    },
};

export default createReducer<PreSaleState>(initialState, (builder) =>
    builder.addCase(setPresaleForm, (state, { payload: setPresaleForm }) => {
        state.dataConfig = setPresaleForm;
    })
);
