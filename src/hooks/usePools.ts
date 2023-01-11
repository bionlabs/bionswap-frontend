import { AddressMap } from "@bionswap/core-sdk"
import { formatUnits } from "ethers/lib/utils";
import { useAccount, useSingleCallResult, useSingleCallResultDynamicChain } from "hooks";
import { usePoolContract } from "./useContract"


const usePools = (addressOrAddressMap: AddressMap | string, chainId:number) => {
    const {address} = useAccount()
    const getContract = usePoolContract(addressOrAddressMap, chainId);

    const stakingToken = useSingleCallResultDynamicChain(chainId, getContract , "stakingToken");
    const rewardsToken = useSingleCallResultDynamicChain(chainId, getContract , "rewardsToken");
    const currentStaking = useSingleCallResultDynamicChain(chainId , getContract , "balanceOf" , [address]);
    const apr = useSingleCallResultDynamicChain(chainId, getContract , "viewAPR");
    const totalSupply = useSingleCallResultDynamicChain(chainId, getContract , "totalSupply");
    const earned = useSingleCallResultDynamicChain(chainId, getContract , "earned", [address]);
    const rewardPerToken = useSingleCallResultDynamicChain(chainId, getContract , "rewardPerToken");

    return {
        // stakingToken: stakingToken.result ? stakingToken.result[0] : undefined,
        // rewardsToken: rewardsToken.result ? rewardsToken.result[0] : undefined,
        apr: apr.result ? formatUnits(apr.result[0]) : undefined,
        currentStaking: currentStaking.result ? formatUnits(currentStaking.result[0]) : undefined,
        totalSupply: totalSupply.result ? formatUnits(totalSupply.result[0]) : undefined,
        earned: earned.result ? formatUnits(earned.result[0]) : undefined,
        rewardPerToken: rewardPerToken.result ? formatUnits(rewardPerToken.result[0]) : undefined
    }
}

export default usePools