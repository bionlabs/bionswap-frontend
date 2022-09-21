import React, { useState, useEffect } from "react";
import { Box, Typography, styled, FormControl, OutlinedInput, Button, Select, MenuItem, RadioGroup, FormControlLabel, Radio, TextField } from "@mui/material";
import { useToken } from "hooks/useToken";
import { setPresaleForm } from "state/presale/action";

const Description = ({ html }: any) => {
    return (
        <Box
            dangerouslySetInnerHTML={{ __html: html }}
        />
    )
}

const Step06 = ({ data, setData, handleNext, onShowError }: any) => {
    const tokenContract = useToken(data.tokenContract);
    const [onpenDescription, setOpenDescription] = useState(false)

    const tokenForSale = Number(data.maxGoal) / Number(data.tokenPrice) || 0;
    const tokenForLiquidity = Number(data.liquidityPercentage) * Number(data.maxGoal) / Number(data.pricePerToken) || 0;

    const abc = [
        {
            head: 'Project information',
            subHead: 'Important information that you want people focus',
            items: [
                {
                    label: 'Total token',
                    value: `${tokenForSale + tokenForLiquidity} ${tokenContract?.name}`
                },
                {
                    label: 'Address',
                    value: `${data.tokenContract}`
                },
                {
                    label: 'Token name',
                    value: `${tokenContract?.name}`
                },
                {
                    label: 'Token symbol',
                    value: `${tokenContract?.symbol}`
                },
                {
                    label: 'Token decimais',
                    value: `${tokenContract?.decimals}`
                },
                {
                    label: 'Token price',
                    value: `${data.tokenPrice || 0} ${data.currency}`
                },
                {
                    label: 'Listing price',
                    value: `${data.pricePerToken || 0} ${data.currency}`
                },
            ]
        },
        {
            head: 'Sale Information',
            subHead: 'The Launchpad information that you want to raise',
            items: [
                {
                    label: 'Sale method',
                    value: `Not Available`
                },
                {
                    label: 'Softcap',
                    value: `${data.minGoal || 0} ${data.currency}`
                },
                {
                    label: 'Hardcap',
                    value: `${data.maxGoal || 0} ${data.currency}`
                },
                {
                    label: 'Unsold tokens',
                    value: `${data.unsoldToken === '0' ? 'Refund' : 'Burn'}`
                },
                {
                    label: 'Minimum buy',
                    value: `${data.minSale || 0} ${data.currency}`
                },
                {
                    label: 'Maximum buy',
                    value: `${data.maxSale || 0} ${data.currency}`
                },
            ]
        },
        {
            head: 'Liquidity information',
            subHead: 'Token Liquidity information that you want to raise',
            items: [
                {
                    label: 'Liquidity',
                    value: `${data.liquidityPercentage || 0}%`
                },
                {
                    label: 'Start time',
                    value: `${data.launchTime}`
                },
                {
                    label: 'End time',
                    value: `${data.preSaleDuration === '0' ? new Date(data.preSaleDuration).getDate() + 60 : data.endTime}`
                },
                {
                    label: 'Liquidity lockup time',
                    value: `${data.lockupTime} days`
                },
                {
                    label: 'Using vesting',
                    value: `${data.vestingToken === '0' ? 'No' : 'Yes'}`
                }
            ]
        },
        {
            head: 'Description',
            subHead: "Describe what you're raising funds to do, why you care about it, how you plan to make it happen, and who you are.",
            description: 'A wallet address is a string of letters and numbers from which cryptocurrencies or NFTs can be sent to and from. A wallet address is also known as a Public Key and can be shared with different contacts like an email address....'
        },
        {
            head: 'Community',
            subHead: 'Where people can follow, discuss and find more information about your project',
            items: [
                {
                    label: 'Website',
                    value: `${data.community}`
                },
                {
                    label: 'Telegram',
                    value: `${data.community}`
                },
                {
                    label: 'Discord',
                    value: `${data.community}`
                },
            ]
        },
    ]

    const showDescription = () => {
        setOpenDescription(!onpenDescription)
    }

    return (
        <>
            {
                onpenDescription
                    ?
                    <Box>
                        <FlexBox onClick={showDescription} sx={{cursor: "pointer"}} gap="16px">
                            <img src="/icons/keyboard_arrow_left.svg" alt="keyboard_arrow_left" />
                            <Typography variant="h3" fontWeight="500" color="text.primary">
                                Description
                            </Typography>
                        </FlexBox>
                        <Description html={data.description} />
                    </Box>
                    :
                    <FlexBox flexDirection='column' gap='46px' pt="40px" pb="40px">
                        <FlexBox flexDirection='column' alignItems='center'>
                            <Typography variant="h3" color="text.primary" fontWeight="400">
                                6. Preview and Comfirm Project
                            </Typography>
                            <Typography variant="body3Poppins" color="gray.400" fontWeight="400">
                                Get ready to launch your project
                            </Typography>
                        </FlexBox>
                        <FlexBox flexDirection="column">
                            {
                                abc.map(item => (
                                    <WrapLine key={item.head}>
                                        <WrapDescription>
                                            <Typography variant="body2Poppins" color="text.primary" fontWeight="400">
                                                {item.head}
                                            </Typography>
                                            <Typography variant="body4Poppins" className="content" color="#717D8A" fontWeight="400">
                                                {item.subHead}
                                            </Typography>
                                        </WrapDescription>
                                        <WrapValue>
                                            <FlexBox flexDirection='column' gap='12px'>
                                                {
                                                    item?.items?.map(i => (
                                                        <BoxItem key={i?.label}>
                                                            <Typography variant="body4Poppins" color="#717D8A" fontWeight="400" >
                                                                {i?.label}
                                                            </Typography>
                                                            <Typography variant="body4Poppins" color="text.primary" fontWeight="500" >
                                                                {i?.value}
                                                            </Typography>
                                                        </BoxItem>
                                                    ))
                                                }
                                                {
                                                    item?.description
                                                    &&
                                                    <Typography variant="body4Poppins" color="#717D8A" fontWeight="400" >
                                                        {item?.description}<Button onClick={showDescription}><Typography variant="body4Poppins" color="text.primary" fontWeight="400">See all</Typography></Button>
                                                    </Typography>
                                                }
                                            </FlexBox>
                                        </WrapValue>
                                    </WrapLine>
                                ))
                            }
                        </FlexBox>
                        <FlexBox justifyContent='flex-end'>
                            <Next onClick={() => handleNext(4)}>
                                <Typography variant="body3Poppins" color="#000000" fontWeight="600">
                                    Submit
                                </Typography>
                            </Next>
                        </FlexBox>
                    </FlexBox>
            }
        </>
    )
}

const FlexBox = styled(Box)`
    display: flex;
`
const WrapLine = styled(Box)`
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 30px 0;
    border-top: 1px solid;
    border-color: ${(props) => props.theme.palette.gray[600]};
`
const WrapDescription = styled(Box)`
    display: flex;
    flex-direction: column;
    max-width: 328px;
    width: 100%;
`
const WrapValue = styled(Box)`
    max-width: 617px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;
`
const Next = styled(Button)`
    max-width: 200px;
    width: 100%;
    height: 45px;
    align-item: center;
    justify-content: center;
    display: flex;
    background-color: ${(props) => props.theme.palette.primary.main};
    border-radius: 4px;
`
const WrapStartAdornment = styled(Box)`
    max-width: 67px;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid;
    border-color: ${(props) => props.theme.palette.gray[700]};
`
const WrapForm = styled(FormControl)`
    display: flex;
    flex-direction: column;
    gap: 6px;
`
const InputCustom = styled(OutlinedInput)`
    padding: 0;
    border: 1px solid;
    border-color: ${(props) => props.theme.palette.gray[700]};
    border-radius: 4px;

    fieldset {
        display: none
    }

    input {
        font-family: 'Poppins', sans-serif;
        padding: 12px 16px;
        font-weight: 400;
        font-size: 14px;
        line-height: 180%;
        color: ${(props) => props.theme.palette.text.primary};

        &::placeholder {
            font-family: 'Poppins', sans-serif;
            font-weight: 400;
            font-size: 14px;
            line-height: 180%;
            color: ${(props) => props.theme.palette.gray[700]};
            opacity: 1;
        }
    }

    &.Mui-focused {
        border-color: #9A6AFF;
        box-shadow: rgba(175, 137, 255, 0.4) 0px 0px 0px 2px, rgba(175, 137, 255, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
    }

    &.onError {
        border-color: ${(props) => props.theme.palette.red[500]};
        box-shadow: none;
    }
`
const RequireSymbol = styled(Box)`
    color: ${(props) => props.theme.palette.red[500]};
`
const BoxItem = styled(Box)`
    display: flex;
    justify-content: space-between;
    width: 100%;
`
const Line = styled(Box)`
    background-color: ${(props) => props.theme.palette.gray[800]};
    height: 1px;
    widht: 100%;
`

export default Step06