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
    whitelist: number,
    minGoal:string,
    maxGoal: string,
    minSale: string,
    maxSale: string,
    launchTime: string,
    preSaleDuration: number,
    endTime: string,
    unsoldToken: number,
    tokenDistributionTime: string,
    vestingToken: string,
    listing: number,
    dex: string,
    pricePerToken: string,
    liquidityPercentage: string,
    lockupTime: string,
    description: string,
}>("presale/setPresaleForm");

export const setStepLaunchpad = createAction<number>("presale/setStepLaunchpad");