import React, { useState, useEffect } from "react";
import { Box, Typography, styled, FormControl, OutlinedInput, Button, Select, MenuItem, RadioGroup, FormControlLabel, Radio, TextField } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { setPresaleForm } from "state/presale/action";

const whiteOptions = [
    {
        value: 0,
        label: 'Enable'
    },
    {
        value: 1,
        label: 'Disable'
    },
]

const preSaleDurations = [
    {
        value: 0,
        label: 'Fixed number of days (1-60)'
    },
    {
        value: 1,
        label: 'End on a specific date & time'
    }
]

const unsoldTokens = [
    {
        value: 0,
        label: 'Refund'
    },
    {
        value: 1,
        label: 'Burn'
    }
]

const vestingTokens = [
    {
        value: 0,
        label: '100% contribute',
        description: 'All of token sold will be released in the frist release',
    },
    {
        value: 1,
        label: 'End on a specific date & time'
    }
]

const Step03 = ({ data, setData, onNextStep, onShowError }: any) => {
    const handleChange = (prop: any) => (event: any) => {
        // setData({ ...data, [prop]: event.target.value })
        setData(setPresaleForm({ ...data, [prop]: event.target.value }))

    }

    return (
        <>
            <FlexBox flexDirection='column' gap='46px' pt="40px" pb="40px">
                <FlexBox flexDirection='column' alignItems='center'>
                    <Typography variant="h3" color="text.primary" fontWeight="400">
                        3. Pool sale info
                    </Typography>
                    <Typography variant="body3Poppins" color="gray.400" fontWeight="400">
                        Enter the launchpad information that you want to raise , that should be enter all details about your presale
                    </Typography>
                </FlexBox>
                <FlexBox flexDirection="column">
                    <WrapLine>
                        <WrapDescription>
                            <Typography variant="body2Poppins" color="text.primary" fontWeight="400">
                                At which price are you want to sale
                            </Typography>
                            <Typography variant="body4Poppins" className="content" color="#717D8A" fontWeight="400">
                                The rate of currency that buyers have to pay for your token.
                            </Typography>
                        </WrapDescription>
                        <WrapValue>
                            <WrapForm fullWidth>
                                <Typography component="label" variant="body4Poppins" color="blue.100" fontWeight="500">
                                    Token price <RequireSymbol component='span'>*</RequireSymbol>
                                </Typography>
                                <InputCustom fullWidth
                                    className={onShowError('tokenPrice') ? 'onError' : ''}
                                    value={data.tokenPrice}
                                    onChange={handleChange('tokenPrice')}
                                    placeholder="Enter token price"
                                    startAdornment={
                                        <WrapStartAdornment>
                                            <Typography variant="body4Poppins" color="#2AC89F" fontWeight="400" textTransform="uppercase">
                                                {data.currency}
                                            </Typography>
                                        </WrapStartAdornment>
                                    } />
                                <Typography variant="captionPoppins" color="red.500" fontWeight="400">
                                    {onShowError('tokenPrice')}
                                </Typography>
                            </WrapForm>
                        </WrapValue>
                    </WrapLine>
                    <WrapLine>
                        <WrapDescription>
                            <Typography variant="body2Poppins" color="text.primary" fontWeight="400">
                                Whitelist
                            </Typography>
                            <Typography variant="body4Poppins" className="content" color="#717D8A" fontWeight="400">
                                Choose &ldquo;Enable&ldquo;  if you have a whitelist of presale contributors. You can enable/disable whitelist anytime
                            </Typography>
                        </WrapDescription>
                        <WrapValue>
                            <FormControl fullWidth>
                                <RadioGroup
                                    value={data.whitelist}
                                    onChange={handleChange('whitelist')}
                                    name="radio-buttons-group"
                                >
                                    {
                                        whiteOptions?.map(item => (
                                            <FormControlLabel key={item.value} value={item.value} label={
                                                <Typography variant="body4Poppins" color={data.whitelist == item.value ? 'blue.100' : 'gray.700'} fontWeight="400">
                                                    {item.label}
                                                </Typography>
                                            }
                                                control={
                                                    <Radio sx={{
                                                        color: 'gray.700',
                                                        '&.Mui-checked': {
                                                            color: 'blue.500',
                                                        },
                                                    }} />
                                                } />
                                        ))
                                    }
                                </RadioGroup>
                            </FormControl>
                        </WrapValue>
                    </WrapLine>
                    <WrapLine>
                        <WrapDescription>
                            <Typography variant="body2Poppins" color="text.primary" fontWeight="400">
                                How much are you looking to raise with Bionswap?
                            </Typography>
                            <Typography variant="body4Poppins" className="content" color="#717D8A" fontWeight="400">
                                Set an achievable goal that covers what you need to complete your project.
                            </Typography>
                        </WrapDescription>
                        <WrapValue gap='10px !important'>
                            <FlexBox justifyContent='space-between'>
                                <WrapForm fullWidth sx={{ maxWidth: '300px', width: '100%' }}>
                                    <Typography component="label" variant="body4Poppins" color="blue.100" fontWeight="500">
                                        Minimum goal <RequireSymbol component='span'>*</RequireSymbol>
                                    </Typography>
                                    <InputCustom fullWidth
                                        className={onShowError('minGoal') ? 'onError' : ''}
                                        value={data.tokenPrice}
                                        onChange={handleChange('minGoal')}
                                        placeholder="Enter minimum goal"
                                        startAdornment={
                                            <WrapStartAdornment>
                                                <Typography variant="body4Poppins" color="#2AC89F" fontWeight="400" textTransform="uppercase">
                                                    {data.currency}
                                                </Typography>
                                            </WrapStartAdornment>
                                        } />
                                    <Typography variant="captionPoppins" color="red.500" fontWeight="400">
                                        {onShowError('minGoal')}
                                    </Typography>
                                </WrapForm>
                                <WrapForm fullWidth sx={{ maxWidth: '300px', width: '100%' }}>
                                    <Typography component="label" variant="body4Poppins" color="blue.100" fontWeight="500">
                                        Maximum goal <RequireSymbol component='span'>*</RequireSymbol>
                                    </Typography>
                                    <InputCustom fullWidth
                                        className={onShowError('maxGoal') ? 'onError' : ''}
                                        value={data.tokenPrice}
                                        onChange={handleChange('maxGoal')}
                                        placeholder="Enter maximum goal"
                                        startAdornment={
                                            <WrapStartAdornment>
                                                <Typography variant="body4Poppins" color="#2AC89F" fontWeight="400" textTransform="uppercase">
                                                    {data.currency}
                                                </Typography>
                                            </WrapStartAdornment>
                                        } />
                                    <Typography variant="captionPoppins" color="red.500" fontWeight="400">
                                        {onShowError('maxGoal')}
                                    </Typography>
                                </WrapForm>
                            </FlexBox>
                            <Typography variant="body6Poppins" fontWeight="400" color="primary.main" sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <img src="/icons/lightbulb_outline.svg" alt="lightbulb_outline" />
                                Give backers the best first impression of your project with great titles. Learn more...
                            </Typography>
                            <Typography variant="body6Poppins" fontWeight="400" color="blue.400">
                                &#8226; Minimum goal must be greater than or equal 50% of Maximum goal
                            </Typography>
                        </WrapValue>
                    </WrapLine>
                    <WrapLine>
                        <WrapDescription>
                            <Typography variant="body2Poppins" color="text.primary" fontWeight="400">
                                Sale allocation
                            </Typography>
                            <Typography variant="body4Poppins" className="content" color="#717D8A" fontWeight="400">
                                The limit rate when the buyer want to hold your token
                            </Typography>
                        </WrapDescription>
                        <WrapValue gap='10px !important'>
                            <FlexBox justifyContent='space-between'>
                                <WrapForm fullWidth sx={{ maxWidth: '300px', width: '100%' }}>
                                    <Typography component="label" variant="body4Poppins" color="blue.100" fontWeight="500">
                                        Minimum buy <RequireSymbol component='span'>*</RequireSymbol>
                                    </Typography>
                                    <InputCustom fullWidth
                                        className={onShowError('minSale') ? 'onError' : ''}
                                        value={data.tokenPrice}
                                        onChange={handleChange('minSale')}
                                        placeholder="Enter minimum buy"
                                        startAdornment={
                                            <WrapStartAdornment>
                                                <Typography variant="body4Poppins" color="#2AC89F" fontWeight="400" textTransform="uppercase">
                                                    {data.currency}
                                                </Typography>
                                            </WrapStartAdornment>
                                        } />
                                    <Typography variant="captionPoppins" color="red.500" fontWeight="400">
                                        {onShowError('minSale')}
                                    </Typography>
                                </WrapForm>
                                <WrapForm fullWidth sx={{ maxWidth: '300px', width: '100%' }}>
                                    <Typography component="label" variant="body4Poppins" color="blue.100" fontWeight="500">
                                        Maximum buy <RequireSymbol component='span'>*</RequireSymbol>
                                    </Typography>
                                    <InputCustom fullWidth
                                        className={onShowError('maxSale') ? 'onError' : ''}
                                        value={data.tokenPrice}
                                        onChange={handleChange('maxSale')}
                                        placeholder="Enter maximum buy"
                                        startAdornment={
                                            <WrapStartAdornment>
                                                <Typography variant="body4Poppins" color="#2AC89F" fontWeight="400" textTransform="uppercase">
                                                    {data.currency}
                                                </Typography>
                                            </WrapStartAdornment>
                                        } />
                                    <Typography variant="captionPoppins" color="red.500" fontWeight="400">
                                        {onShowError('maxSale')}
                                    </Typography>
                                </WrapForm>
                            </FlexBox>
                        </WrapValue>
                    </WrapLine>
                    <WrapLine>
                        <WrapDescription>
                            <Typography variant="body2Poppins" color="text.primary" fontWeight="400">
                                When would you like to launch?
                            </Typography>
                            <Typography variant="body4Poppins" className="content" color="#717D8A" fontWeight="400">
                                We’ll provide you with recommendations on when to complete steps that may take a few days to process. You can edit this date up until the moment you launch your project, which must always be done manually.
                            </Typography>
                        </WrapDescription>
                        <WrapValue gap='10px !important'>
                            <WrapForm>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker
                                        renderInput={(props) =>
                                            <TextField {...props} />
                                        }
                                        value={data.launchTime}
                                        onChange={(newValue) => {
                                            setData(setPresaleForm({ ...data, ['launchTime']: newValue }));
                                        }}
                                    />
                                </LocalizationProvider>
                                <Typography variant="captionPoppins" color="red.500" fontWeight="400">
                                    {onShowError('launchTime')}
                                </Typography>
                            </WrapForm>
                        </WrapValue>
                    </WrapLine>
                    <WrapLine>
                        <WrapDescription>
                            <Typography variant="body2Poppins" color="text.primary" fontWeight="400">
                                Pre-sale duration
                            </Typography>
                            <Typography variant="body4Poppins" className="content" color="#717D8A" fontWeight="400">
                                Set a time limit for your pre-sale. You won’t be able to change this after you launch.
                            </Typography>
                        </WrapDescription>
                        <WrapValue gap='10px !important'>
                            <WrapForm>
                                <FormControl fullWidth>
                                    <RadioGroup
                                        value={data.preSaleDuration}
                                        onChange={handleChange('preSaleDuration')}
                                        name="radio-buttons-group"
                                    >
                                        {
                                            preSaleDurations?.map(item => (
                                                <FormControlLabel key={item.label} value={item.value} label={
                                                    <Typography variant="body4Poppins" color={data.preSaleDuration == item.value ? 'blue.100' : 'gray.700'} fontWeight="400">
                                                        {item.label}
                                                    </Typography>
                                                }
                                                    control={
                                                        <Radio sx={{
                                                            color: 'gray.700',
                                                            '&.Mui-checked': {
                                                                color: 'blue.500',
                                                            },
                                                        }} />
                                                    } />
                                            ))
                                        }
                                    </RadioGroup>
                                    {
                                        data.preSaleDuration === '1'
                                        &&
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DateTimePicker
                                                renderInput={(props) =>
                                                    <TextField {...props} />
                                                }
                                                value={data.endTime}
                                                onChange={(newValue) => {
                                                    setData(setPresaleForm({ ...data, ['endTime']: newValue }));
                                                }}
                                            />
                                        </LocalizationProvider>
                                    }
                                    <Typography variant="captionPoppins" color="red.500" fontWeight="400">
                                        {onShowError('preSaleDuration')}
                                    </Typography>
                                    <Typography variant="captionPoppins" color="red.500" fontWeight="400">
                                        {onShowError('endTime')}
                                    </Typography>
                                </FormControl>
                            </WrapForm>
                        </WrapValue>
                    </WrapLine>
                    <WrapLine>
                        <WrapDescription>
                            <Typography variant="body2Poppins" color="text.primary" fontWeight="400">
                                Unsold token
                            </Typography>
                            <Typography variant="body4Poppins" className="content" color="#717D8A" fontWeight="400">
                                After the end of the token sale, the remaining tokens that are not sold can be refunded or burned.
                            </Typography>
                        </WrapDescription>
                        <WrapValue gap='10px !important'>
                            <WrapForm>
                                <FormControl fullWidth>
                                    <RadioGroup
                                        value={data.unsoldToken}
                                        onChange={handleChange('unsoldToken')}
                                        name="radio-buttons-group"
                                    >
                                        {
                                            unsoldTokens?.map(item => (
                                                <FormControlLabel key={item.label} value={item.value} label={
                                                    <Typography variant="body4Poppins" color={data.unsoldToken == item.value ? 'blue.100' : 'gray.700'} fontWeight="400">
                                                        {item.label}
                                                    </Typography>
                                                }
                                                    control={
                                                        <Radio sx={{
                                                            color: 'gray.700',
                                                            '&.Mui-checked': {
                                                                color: 'blue.500',
                                                            },
                                                        }} />
                                                    } />
                                            ))
                                        }
                                    </RadioGroup>
                                </FormControl>
                            </WrapForm>
                        </WrapValue>
                    </WrapLine>
                    <WrapLine>
                        <WrapDescription>
                            <Typography variant="body2Poppins" color="text.primary" fontWeight="400">
                                Token distribution date
                            </Typography>
                            <Typography variant="body4Poppins" className="content" color="#717D8A" fontWeight="400">
                                Notice to people the date and time that your token will be launched
                            </Typography>
                        </WrapDescription>
                        <WrapValue gap='10px !important'>
                            <WrapForm>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker
                                        renderInput={(props) =>
                                            <TextField {...props} />
                                        }
                                        value={data.tokenDistributionTime}
                                        onChange={(newValue) => {
                                            setData(setPresaleForm({ ...data, ['tokenDistributionTime']: newValue }));
                                        }}
                                    />
                                </LocalizationProvider>
                                <Typography variant="captionPoppins" color="red.500" fontWeight="400">
                                    {onShowError('tokenDistributionTime')}
                                </Typography>
                            </WrapForm>
                        </WrapValue>
                    </WrapLine>
                    <WrapLine>
                        <WrapDescription>
                            <Typography variant="body2Poppins" color="text.primary" fontWeight="400">
                                Vesting token
                            </Typography>
                            <Typography variant="body4Poppins" className="content" color="#717D8A" fontWeight="400">
                                How many tokens will be released each cycle following the First Token Release batch and how long, in days, between each batch of vested tokens is released.
                            </Typography>
                        </WrapDescription>
                        <WrapValue gap='10px !important'>
                            <WrapForm>
                                <FormControl fullWidth>
                                    <RadioGroup
                                        value={data.vestingToken}
                                        onChange={handleChange('vestingToken')}
                                        name="radio-buttons-group"
                                        sx={{ gap: '25px' }}
                                    >
                                        {
                                            vestingTokens?.map(item => (
                                                <BoxRadioButtonItem key={item.label}>
                                                    <FormControlLabel value={item.value} label={
                                                        <Typography variant="body4Poppins" color={data.vestingToken == item.value ? 'blue.100' : 'gray.700'} fontWeight="400">
                                                            {item.label}
                                                        </Typography>
                                                    }
                                                        control={
                                                            <Radio sx={{
                                                                color: 'gray.700',
                                                                '&.Mui-checked': {
                                                                    color: 'blue.500',
                                                                },
                                                            }} />
                                                        } />
                                                    <Typography variant="captionPoppins" color="blue.100">
                                                        {item.description}
                                                    </Typography>
                                                </BoxRadioButtonItem>
                                            ))
                                        }
                                    </RadioGroup>
                                </FormControl>
                            </WrapForm>
                        </WrapValue>
                    </WrapLine>
                </FlexBox>
                <FlexBox justifyContent='flex-end'>
                    <Next onClick={() => onNextStep(3)}>
                        <Typography variant="body3Poppins" color="#000000" fontWeight="600">
                            Next
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
const BoxRadioButtonItem = styled(Box)`
    border: 1px solid #373F47;
    border-radius: 4px;
    padding: 24px;
    display: flex;
    flex-direction: column;
`

export default Step03 