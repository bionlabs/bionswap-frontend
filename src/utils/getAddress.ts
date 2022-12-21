import { AddressMap } from "@bionswap/core-sdk"

const getAddress = (address:AddressMap , chainId: number) => {
    return address[chainId] ? address[chainId] : ''
}

export default getAddress