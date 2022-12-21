import { AddressMap } from "@bionswap/core-sdk"
import { formatUnits } from "ethers/lib/utils";
import { useAccount, useSingleCallResult } from "hooks";
import { usePoolContract } from "./useContract"


const usePools = (addressOrAddressMap: AddressMap | string) => {
    const {address} = useAccount()
    const getContract = usePoolContract(addressOrAddressMap);
    const stakingToken = useSingleCallResult(getContract , "stakingToken");
    const rewardsToken = useSingleCallResult(getContract , "rewardsToken");
    const currentStaking = useSingleCallResult(getContract , "balanceOf" , [address]);
    const apr = useSingleCallResult(getContract , "viewAPR");
    const totalSupply = useSingleCallResult(getContract , "totalSupply");
    const earned = useSingleCallResult(getContract , "earned", [address]);
    const rewardPerToken = useSingleCallResult(getContract , "rewardPerToken");

    return {
        stakingToken: stakingToken.result ? stakingToken.result[0] : undefined,
        rewardsToken: rewardsToken.result ? rewardsToken.result[0] : undefined,
        apr: apr.result ? formatUnits(apr.result[0]) : undefined,
        currentStaking: currentStaking.result ? formatUnits(currentStaking.result[0]) : undefined,
        totalSupply: totalSupply.result ? formatUnits(totalSupply.result[0]) : undefined,
        earned: earned.result ? formatUnits(earned.result[0]) : undefined,
        rewardPerToken: rewardPerToken.result ? formatUnits(rewardPerToken.result[0]) : undefined
    }
}

export default usePools