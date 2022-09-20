import { createAction } from "@reduxjs/toolkit";

export const setPresaleForm = createAction<{
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
}>("presale/setPresaleForm");