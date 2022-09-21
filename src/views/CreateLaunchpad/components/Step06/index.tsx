import React, { useState, useEffect } from "react";
import { Box, Typography, styled, FormControl, OutlinedInput, Button, Select, MenuItem, RadioGroup, FormControlLabel, Radio, TextField } from "@mui/material";
import { useToken } from "hooks/useToken";
import { setPresaleForm } from "state/presale/action";

const Step06 = ({ data, setData, onNextStep, onShowError }: any) => {
    const tokenContract = useToken(data.tokenContract);

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
                ,
                {
                    label: 'Token name',
                    value: `${tokenContract?.name}`
                },
            ]
        }
    ]

    return (
        <>
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
                                            item.items?.map(i => (
                                                <BoxItem key={i?.label}>
                                                    <Typography variant="body4Poppins" color="#717D8A" fontWeight="400" >
                                                        Total token
                                                    </Typography>
                                                    <Typography variant="body4Poppins" color="text.primary" fontWeight="500">
                                                        {tokenForSale + tokenForLiquidity} {tokenContract?.name}
                                                    </Typography>
                                                </BoxItem>
                                            ))
                                        }
                                    </FlexBox>
                                </WrapValue>
                            </WrapLine>
                        ))
                    }
                </FlexBox>
                <FlexBox justifyContent='flex-end'>
                    <Next onClick={() => onNextStep(4)}>
                        <Typography variant="body3Poppins" color="#000000" fontWeight="600">
                            Submit
                        </Typography>
                    </Next>
                </FlexBox>
            </FlexBox>
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