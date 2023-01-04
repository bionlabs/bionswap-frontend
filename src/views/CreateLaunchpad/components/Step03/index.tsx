import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  styled,
  FormControl,
  OutlinedInput,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Stack,
  Divider,
} from '@mui/material';
import { BsLightbulb } from 'react-icons/bs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { setPresaleForm } from 'state/presale/action';
import Joi, { CustomHelpers, CustomValidator } from 'joi';
import HeaderSection from '../HeaderSection';
import { CurrencyText, DescribeText, ErrorLabel, InputCustom, NextBackButton, RequireSymbol, Title, TitleText, WrapLine } from '..';

const whitelistOpts = [
  {
    value: '1',
    label: 'Enable',
  },
  {
    value: '0',
    label: 'Disable',
  },
];

// const preSaleDurations = [
//   {
//     value: 0,
//     label: 'Fixed number of days (1-60)',
//   },
//   {
//     value: 1,
//     label: 'End on a specific date & time',
//   },
// ];

const unsoldTokens = [
  {
    value: '0',
    label: 'Refund',
  },
  {
    value: '1',
    label: 'Burn',
  },
];

const vestingTokens = [
  {
    value: '0',
    label: '100% contribute',
    description: 'All of token sold will be released in the first release',
  },
  {
    value: '1',
    label: 'Vesting many time',
  },
];

const Step03 = ({ data, setData, onNextStep, onBackStep }: any) => {
  const [launchTime, setLaunchtime] = useState(new Date(data.launchTime) || 0);
  const [endLaunchTime, setEndLaunchTime] = useState(new Date(data.endTime) || 0);
  const [tokenDistributionTime, settokenDistributionTime] = useState(new Date(data.tokenDistributionTime) || 0);
  const [tgeDate, setTGEDate] = useState(new Date(data.tgeDate) || 0);
  const currentTime = +new Date();
  const [errors, setErrors] = useState([]);
  const isTyped = useRef(false);

  const method: CustomValidator = (value: any, helpers: CustomHelpers) => {
    const res: any = helpers?.state?.path;

    res?.map((item: any, index: any) => {
      if (item == 'minGoal') {
        if (Number(value) >= Number(data?.maxGoal)) {
          throw new Error('Minimum goal must be less than maximum goal');
        }
        if (Number(value) < Number(data?.maxGoal) / 2) {
          throw new Error('Minimum goal must be greater than or equal 50% of Maximum goal');
        }
      }

      if (item == 'minSale') {
        if (Number(value) >= Number(data?.maxSale)) {
          throw new Error('Minimum buy must be less than maximum buy');
        }
      }

      if (item == 'maxSale') {
        if (Number(value) > Number(data?.maxGoal)) {
          throw new Error('Maximum buy must be less than or equal to maximum buy');
        }
      }

      if (item == 'launchTime') {
        if (value >= data.endTime) {
          throw new Error('Launch time must be less than pre-sale end time');
        }
        if (value < currentTime) {
          throw new Error('Launch time must be greater than current time');
        }
      }

      if (item == 'endTime') {
        if (value <= data.launchTime) {
          throw new Error('Pre-sale end time must be greater than launch time');
        }
        if (value < currentTime) {
          throw new Error('Launch time must be greater than current time');
        }
      }

      if (item == 'tokenDistributionTime') {
        if (value < currentTime) {
          throw new Error('Token distribution time must be greater than current time');
        }
      }

      if (item == 'tgeDate') {
        if (value < currentTime) {
          throw new Error('TGE Date must be greater than current time');
        }

        if (value <= data.endTime) {
          throw new Error('TGE Date must be greater than pre-sale end time');
        }
      }

      if (item == 'tokenReleaseEachCycle') {
        if (Number(value) + Number(data.firstRelease) > 100) {
          throw new Error(
            'Total "First release percent" and "Token release each cycle" must be less than or equal to 100%',
          );
        }
      }
    });
  };

  const parseErrorMessage = (key: string) => {
    let message = '';
    errors?.map((item: any, index) => {
      if (item?.context?.key == key) {
        message = item?.message;
      }
    });
    return message;
  };

  useEffect(() => {
    if (isTyped.current) {
      validate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const validate = async () => {
    try {
      const schemaStep03 = Joi.object({
        tokenPrice: Joi.number().min(0.000001).required().label('Token price'),
        whitelist: Joi.number().integer().min(0).max(1).required().label('Whitelist'),
        minGoal: Joi.number().min(0.000001).required().custom(method).label('Minimum goal'),
        maxGoal: Joi.number().min(0.000001).required().custom(method).label('Maximum goal'),
        minSale: Joi.number().min(0.000001).required().custom(method).label('Minimum buy'),
        maxSale: Joi.number().min(0.000001).required().custom(method).label('Maximum buy'),
        launchTime: Joi.required().custom(method).label('Launch time'),
        endTime: Joi.required().custom(method).label('Pre-sale end time'),
        unsoldToken: Joi.number().integer().min(0).max(1).required().label('Unsold token'),
        tokenDistributionTime: Joi.required().custom(method).label('Token distribution date'),
        vestingToken: Joi.required().label('Vesting token'),
        tgeDate: Joi.required().custom(method).label('First release date'),
        firstRelease: Joi.when('vestingToken', {
          is: '1',
          then: Joi.number().integer().min(1).max(99).label('First release percent'),
        }),
        vestingPeriodEachCycle: Joi.when('vestingToken', {
          is: '1',
          then: Joi.number().integer().min(1).label('Vesting period each cycle'),
        }),
        tokenReleaseEachCycle: Joi.when('vestingToken', {
          is: '1',
          then: Joi.number().integer().min(1).max(99).custom(method).label('Token release each cycle'),
        }),
      });

      const value = await schemaStep03.validateAsync(
        {
          tokenPrice: data.tokenPrice,
          whitelist: data.whitelist,
          minGoal: data.minGoal,
          maxGoal: data.maxGoal,
          minSale: data.minSale,
          maxSale: data.maxSale,
          launchTime: data.launchTime,
          endTime: data.endTime,
          unsoldToken: data.unsoldToken,
          tokenDistributionTime: data.tokenDistributionTime,
          vestingToken: data.vestingToken,
          tgeDate: data.tgeDate,
          firstRelease: data.firstRelease,
          vestingPeriodEachCycle: data.vestingPeriodEachCycle,
          tokenReleaseEachCycle: data.tokenReleaseEachCycle,
        },
        { abortEarly: false },
      );
      setErrors([]);
      return true;
    } catch (error: any) {
      setErrors(error?.details || []);
      return false;
    }
  };

  useEffect(() => {
    setData(setPresaleForm({ ['launchTime']: new Date(launchTime).getTime() }));
  }, [launchTime, setData]);

  useEffect(() => {
    if (data.preSaleDuration === '0') {
      setData(setPresaleForm({ ['endTime']: new Date(launchTime).getTime() + 86400000 }));
    } else {
      setData(setPresaleForm({ ['endTime']: new Date(endLaunchTime).getTime() }));
    }
  }, [endLaunchTime, data.preSaleDuration, setData, launchTime]);

  useEffect(() => {
    setData(setPresaleForm({ ['tokenDistributionTime']: new Date(tokenDistributionTime).getTime() }));
  }, [setData, tokenDistributionTime]);

  useEffect(() => {
    setData(setPresaleForm({ ['tgeDate']: new Date(tgeDate).getTime() }));
  }, [setData, tgeDate]);

  useEffect(() => {
    if (data.vestingToken === '0') {
      setData(setPresaleForm({ ['firstRelease']: '100' }));
    }
  }, [data.vestingToken, setData]);

  const handleChangeInput = (prop: any) => (event: any) => {
    setData(setPresaleForm({ [prop]: event.target.value }));

    if (!isTyped.current) {
      isTyped.current = true;
    }
  };

  const handleNextStep = async () => {
    const isValid = await validate();

    if (isValid) {
      onNextStep();
    }
  };

  return (
    <>
      <HeaderSection data={data} activeStep={2} onBackStep={onBackStep} onNextStep={handleNextStep} />
      <FlexBox flexDirection="column" gap="46px" pt="40px" pb="40px">
        <FlexBox flexDirection="column" alignItems="center">
          <Title>3. Pool sale info</Title>
          <Typography color="text.secondary">
            Enter the launchpad information that you want to raise , that should be enter all details about your presale
          </Typography>
        </FlexBox>
        <Stack width='100%' alignItems='start' divider={<Divider flexItem/>}>
          <WrapLine>
            <WrapDescription>
              <TitleText>At which price are you want to sale</TitleText>
              <DescribeText>The rate of currency that buyers have to pay for your token.</DescribeText>
            </WrapDescription>
            <WrapValue>
              <WrapForm fullWidth>
                <Typography component="label" fontWeight="500">
                  Token price <RequireSymbol>*</RequireSymbol>
                </Typography>
                <InputCustom
                  fullWidth
                  className={parseErrorMessage('tokenPrice') ? 'onError' : ''}
                  value={data.tokenPrice}
                  onChange={handleChangeInput('tokenPrice')}
                  placeholder="Enter token price"
                  type="number"
                  startAdornment={
                    <WrapStartAdornment>
                      <CurrencyText>{data.currency}</CurrencyText>
                    </WrapStartAdornment>
                  }
                />
                <ErrorLabel>{parseErrorMessage('tokenPrice')}</ErrorLabel>
              </WrapForm>
            </WrapValue>
          </WrapLine>
          <WrapLine>
            <WrapDescription>
              <TitleText>Whitelist</TitleText>
              <DescribeText>
                Choose &ldquo;Enable&ldquo; if you have a whitelist of presale contributors. You can enable/disable
                whitelist anytime
              </DescribeText>
            </WrapDescription>
            <WrapValue>
              <FormControl fullWidth>
                <RadioGroup value={data.whitelist} onChange={handleChangeInput('whitelist')} name="radio-buttons-group">
                  {whitelistOpts?.map((item) => (
                    <FormControlLabel
                      key={item.value}
                      value={item.value}
                      label={
                        <Typography
                          variant="body4Poppins"
                          color={data.whitelist == item.value ? 'text.primary' : 'text.secondary'}
                          fontWeight="400"
                        >
                          {item.label}
                        </Typography>
                      }
                      control={
                        <Radio
                          sx={{
                            color: 'text.secondary',
                            '&.Mui-checked': {
                              color: 'primary.main',
                            },
                          }}
                        />
                      }
                    />
                  ))}
                </RadioGroup>
              </FormControl>
              <ErrorLabel>{parseErrorMessage('whitelist')}</ErrorLabel>
            </WrapValue>
          </WrapLine>
          <WrapLine>
            <WrapDescription>
              <TitleText>How much are you looking to raise with Bionswap?</TitleText>
              <DescribeText>Set an achievable goal that covers what you need to complete your project.</DescribeText>
            </WrapDescription>
            <WrapValue gap="10px !important">
              <FlexBox justifyContent="space-between">
                <WrapForm fullWidth sx={{ maxWidth: '300px', width: '100%' }}>
                  <Typography component="label" fontWeight="500">
                    Minimum goal <RequireSymbol>*</RequireSymbol>
                  </Typography>
                  <InputCustom
                    fullWidth
                    className={parseErrorMessage('minGoal') ? 'onError' : ''}
                    value={data.minGoal}
                    onChange={handleChangeInput('minGoal')}
                    placeholder="Enter minimum goal"
                    type="number"
                    startAdornment={
                      <WrapStartAdornment>
                        <CurrencyText>{data.currency}</CurrencyText>
                      </WrapStartAdornment>
                    }
                  />
                  <ErrorLabel>{parseErrorMessage('minGoal')}</ErrorLabel>
                </WrapForm>
                <WrapForm fullWidth sx={{ maxWidth: '300px', width: '100%' }}>
                  <TitleText>
                    Maximum goal <RequireSymbol>*</RequireSymbol>
                  </TitleText>
                  <InputCustom
                    fullWidth
                    className={parseErrorMessage('maxGoal') ? 'onError' : ''}
                    value={data.maxGoal}
                    onChange={handleChangeInput('maxGoal')}
                    placeholder="Enter maximum goal"
                    type="number"
                    startAdornment={
                      <WrapStartAdornment>
                        <CurrencyText>{data.currency}</CurrencyText>
                      </WrapStartAdornment>
                    }
                  />
                  <ErrorLabel>{parseErrorMessage('maxGoal')}</ErrorLabel>
                </WrapForm>
              </FlexBox>
              <Typography
                variant="body6Poppins"
                fontWeight="400"
                color="primary.main"
                sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}
              >
                <BsLightbulb />
                Give backers the best first impression of your project with great titles. Learn more...
              </Typography>
              <Typography variant="body6Poppins" fontWeight="400" color="primary.main">
                Minimum goal must be greater than or equal 50% of Maximum goal
              </Typography>
            </WrapValue>
          </WrapLine>
          <WrapLine>
            <WrapDescription>
              <TitleText>Sale allocation</TitleText>
              <DescribeText>The limit rate when the buyer want to hold your token</DescribeText>
            </WrapDescription>
            <WrapValue gap="10px !important">
              <FlexBox justifyContent="space-between">
                <WrapForm fullWidth sx={{ maxWidth: '300px', width: '100%' }}>
                  <Typography component="label" fontWeight="500">
                    Minimum buy <RequireSymbol>*</RequireSymbol>
                  </Typography>
                  <InputCustom
                    fullWidth
                    className={parseErrorMessage('minSale') ? 'onError' : ''}
                    value={data.minSale}
                    onChange={handleChangeInput('minSale')}
                    placeholder="Enter minimum buy"
                    type="number"
                    startAdornment={
                      <WrapStartAdornment>
                        <CurrencyText>{data.currency}</CurrencyText>
                      </WrapStartAdornment>
                    }
                  />
                  <ErrorLabel>{parseErrorMessage('minSale')}</ErrorLabel>
                </WrapForm>
                <WrapForm fullWidth sx={{ maxWidth: '300px', width: '100%' }}>
                  <Typography component="label" fontWeight="500">
                    Maximum buy <RequireSymbol>*</RequireSymbol>
                  </Typography>
                  <InputCustom
                    fullWidth
                    className={parseErrorMessage('maxSale') ? 'onError' : ''}
                    value={data.maxSale}
                    onChange={handleChangeInput('maxSale')}
                    placeholder="Enter maximum buy"
                    type="number"
                    startAdornment={
                      <WrapStartAdornment>
                        <CurrencyText>{data.currency}</CurrencyText>
                      </WrapStartAdornment>
                    }
                  />
                  <ErrorLabel>{parseErrorMessage('maxSale')}</ErrorLabel>
                </WrapForm>
              </FlexBox>
            </WrapValue>
          </WrapLine>
          <WrapLine>
            <WrapDescription>
              <TitleText>When would you like to launch?</TitleText>
              <DescribeText>
                We will provide you with recommendations on when to complete steps that may take a few days to process.
                You can edit this date up until the moment you launch your project, which must always be done manually.
              </DescribeText>
            </WrapDescription>
            <WrapValue>
              <WrapForm className={parseErrorMessage('launchTime') ? 'onError datepicker' : 'datepicker'}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    value={launchTime}
                    onChange={(newValue: any) => {
                      setLaunchtime(newValue);
                      if (!isTyped.current) {
                        isTyped.current = true;
                      }
                    }}
                  />
                </LocalizationProvider>
                <ErrorLabel>{parseErrorMessage('launchTime')}</ErrorLabel>
              </WrapForm>
            </WrapValue>
          </WrapLine>
          <WrapLine>
            <WrapDescription>
              <TitleText>Pre-sale end time</TitleText>
              <DescribeText>
                Set a time limit for your pre-sale. You won’t be able to change this after you launch.
              </DescribeText>
            </WrapDescription>
            <WrapValue gap="10px !important">
              <WrapForm className={parseErrorMessage('endTime') ? 'onError datepicker' : 'datepicker'}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    value={endLaunchTime}
                    onChange={(newValue: any) => {
                      setEndLaunchTime(newValue);
                      if (!isTyped.current) {
                        isTyped.current = true;
                      }
                    }}
                  />
                </LocalizationProvider>
                <ErrorLabel>{parseErrorMessage('endTime')}</ErrorLabel>
              </WrapForm>
            </WrapValue>
          </WrapLine>
          <WrapLine>
            <WrapDescription>
              <TitleText>Unsold token</TitleText>
              <DescribeText>
                After the end of the token sale, the remaining tokens that are not sold can be refunded or burned.
              </DescribeText>
            </WrapDescription>
            <WrapValue>
              <WrapForm>
                <FormControl fullWidth>
                  <RadioGroup
                    value={data.unsoldToken}
                    onChange={handleChangeInput('unsoldToken')}
                    name="radio-buttons-group"
                  >
                    {unsoldTokens?.map((item) => (
                      <FormControlLabel
                        key={item.label}
                        value={item.value}
                        label={
                          <Typography
                            variant="body4Poppins"
                            color={data.unsoldToken == item.value ? 'text.primary' : 'text.secondary'}
                            fontWeight="400"
                          >
                            {item.label}
                          </Typography>
                        }
                        control={
                          <Radio
                            sx={{
                              color: 'text.secondary',
                              '&.Mui-checked': {
                                color: 'primary.main',
                              },
                            }}
                          />
                        }
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
                <ErrorLabel>{parseErrorMessage('unsoldToken')}</ErrorLabel>
              </WrapForm>
            </WrapValue>
          </WrapLine>
          <WrapLine>
            <WrapDescription>
              <TitleText>Token distribution date</TitleText>
              <DescribeText>Notice to people the date and time that your token will be launched</DescribeText>
            </WrapDescription>
            <WrapValue>
              <WrapForm className={parseErrorMessage('tokenDistributionTime') ? 'onError datepicker' : 'datepicker'}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    value={tokenDistributionTime}
                    onChange={(newValue: any) => {
                      settokenDistributionTime(newValue);
                      if (!isTyped.current) {
                        isTyped.current = true;
                      }
                    }}
                  />
                </LocalizationProvider>
                <ErrorLabel>{parseErrorMessage('tokenDistributionTime')}</ErrorLabel>
              </WrapForm>
            </WrapValue>
          </WrapLine>
          <WrapLine>
            <WrapDescription>
              <TitleText>Vesting token</TitleText>
              <DescribeText>
                How many tokens will be released each cycle following the First Token Release batch and how long, in
                days, between each batch of vested tokens is released.
              </DescribeText>
            </WrapDescription>
            <WrapValue>
              <WrapForm>
                <FormControl fullWidth>
                  <RadioGroup
                    value={data.vestingToken}
                    onChange={handleChangeInput('vestingToken')}
                    sx={{ gap: '25px' }}
                  >
                    {vestingTokens?.map((item) => (
                      <BoxRadioButtonItem key={item.label}>
                        <FormControlLabel
                          value={item.value}
                          label={
                            <Typography
                              variant="body4Poppins"
                              color={data.vestingToken == item.value ? 'text.primary' : 'text.secondary'}
                              fontWeight="400"
                            >
                              {item.label}
                            </Typography>
                          }
                          control={
                            <Radio
                              sx={{
                                color: 'text.primary',
                                '&.Mui-checked': {
                                  color: 'primary.main',
                                },
                              }}
                            />
                          }
                        />
                        <Typography variant="captionPoppins" color="text.primary">
                          {item.description}
                        </Typography>
                        {item.value == data.vestingToken && (
                          <FlexBox
                            flexDirection="column"
                            gap="15px"
                            sx={{
                              paddingTop: '24px',
                              marginTop: '24px',
                              borderTop: (theme) => `1px solid ${(theme.palette as any).extra.card.divider}`,
                            }}
                          >
                            <WrapForm className={parseErrorMessage('tgeDate') ? 'onError datepicker' : 'datepicker'}>
                              <Typography component="label" fontWeight="500">
                                First release date <RequireSymbol>*</RequireSymbol>
                              </Typography>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                  renderInput={(props) => <TextField {...props} />}
                                  value={tgeDate}
                                  onChange={(newValue: any) => {
                                    setTGEDate(newValue);
                                    if (!isTyped.current) {
                                      isTyped.current = true;
                                    }
                                  }}
                                />
                              </LocalizationProvider>
                              <ErrorLabel>{parseErrorMessage('tgeDate')}</ErrorLabel>
                            </WrapForm>
                            {item.value == '1' && data.vestingToken === '1' && (
                              <>
                                <WrapForm fullWidth>
                                  <Typography component="label" fontWeight="500">
                                    First release percent <RequireSymbol>*</RequireSymbol>
                                  </Typography>
                                  <InputCustom
                                    fullWidth
                                    className={parseErrorMessage('firstRelease') ? 'onError' : ''}
                                    value={data.firstRelease}
                                    onChange={handleChangeInput('firstRelease')}
                                    placeholder="Eg: 25"
                                    type="number"
                                    startAdornment={
                                      <WrapStartAdornment>
                                        <CurrencyText>%</CurrencyText>
                                      </WrapStartAdornment>
                                    }
                                  />
                                  <Typography variant="captionPoppins" color="red.500" fontWeight="400">
                                    {parseErrorMessage('firstRelease')}
                                  </Typography>
                                </WrapForm>
                                <WrapForm fullWidth>
                                  <Typography component="label" fontWeight="500">
                                    Vesting period each cycle <RequireSymbol>*</RequireSymbol>
                                  </Typography>
                                  <InputCustom
                                    fullWidth
                                    className={parseErrorMessage('vestingPeriodEachCycle') ? 'onError' : ''}
                                    value={data.vestingPeriodEachCycle}
                                    onChange={handleChangeInput('vestingPeriodEachCycle')}
                                    placeholder="Eg: 30"
                                    type="number"
                                    startAdornment={
                                      <WrapStartAdornment>
                                        <CurrencyText>Days</CurrencyText>
                                      </WrapStartAdornment>
                                    }
                                  />
                                  <Typography variant="captionPoppins" color="red.500" fontWeight="400">
                                    {parseErrorMessage('vestingPeriodEachCycle')}
                                  </Typography>
                                </WrapForm>
                                <WrapForm fullWidth>
                                  <Typography component="label" fontWeight="500">
                                    Token release each cycle <RequireSymbol>*</RequireSymbol>
                                  </Typography>
                                  <InputCustom
                                    fullWidth
                                    className={parseErrorMessage('tokenReleaseEachCycle') ? 'onError' : ''}
                                    value={data.tokenReleaseEachCycle}
                                    onChange={handleChangeInput('tokenReleaseEachCycle')}
                                    placeholder="Eg: 25%"
                                    type="number"
                                    startAdornment={
                                      <WrapStartAdornment>
                                        <CurrencyText>%</CurrencyText>
                                      </WrapStartAdornment>
                                    }
                                  />
                                  <ErrorLabel>{parseErrorMessage('tokenReleaseEachCycle')}</ErrorLabel>
                                </WrapForm>
                              </>
                            )}
                          </FlexBox>
                        )}
                      </BoxRadioButtonItem>
                    ))}
                  </RadioGroup>
                </FormControl>
              </WrapForm>
            </WrapValue>
          </WrapLine>
        </Stack>
        <FlexBox justifyContent="flex-end" gap="14px">
          <NextBackButton variant="contained" onClick={onBackStep}>
            Back
          </NextBackButton>
          <NextBackButton variant="contained" onClick={handleNextStep}>
            Next
          </NextBackButton>
        </FlexBox>
      </FlexBox>
    </>
  );
};

const FlexBox = styled(Box)`
  display: flex;
`;

const WrapDescription = styled(Box)`
  display: flex;
  flex-direction: column;
  max-width: 328px;
  width: 100%;
`;
const WrapValue = styled(Box)`
  max-width: 617px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
const WrapStartAdornment = styled(Box)`
  max-width: 67px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid;
  border-color: ${(props) => (props.theme.palette as any).extra.card.divider};
`;
const WrapForm = styled(FormControl)`
  display: flex;
  flex-direction: column;
  gap: 6px;

  &.datepicker {
    fieldset {
      display: none;
    }

    .MuiOutlinedInput-root {
      border: 1px solid;
      border-color: ${(props) => (props.theme.palette as any).extra.card.divider};
      border-radius: 4px;

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
          color: ${(props) => props.theme.palette.text.secondary};
          opacity: 1;
        }
      }
    }
  }
`;

const BoxRadioButtonItem = styled(Box)`
  border: 1px solid ${(props) => (props.theme.palette as any).extra.card.divider};
  border-radius: 4px;
  padding: 24px;
  display: flex;
  flex-direction: column;
`;


export default Step03;
