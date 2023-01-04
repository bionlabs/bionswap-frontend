import { Currency, ROUTER_ADDRESS } from '@bionswap/core-sdk';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  Stack,
  styled,
  Typography,
} from '@mui/material';
import { ethers } from 'ethers';
import { useChain, useCurrencyBalance } from 'hooks';
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback';
import { usePresaleFactoryContract } from 'hooks/useContract';
import { toastWarn } from 'hooks/useToast';
import { useToken } from 'hooks/useToken';
import Joi from 'joi';
import { useEffect, useRef, useState } from 'react';
import { setPresaleForm } from 'state/presale/action';
import { PreSaleState } from 'state/presale/reducer';
import { tryParseAmount } from 'utils/parse';
import {
  InputCustom,
  NextBackButton,
  RequireSymbol,
  CurrencyText,
  TitleText,
  Title,
  DescribeText,
  ErrorLabel,
  WrapLine
} from '..';
import HeaderSection from '../HeaderSection';

const listingOpts = [
  {
    value: '0',
    label: 'Manual listing',
    description: 'You can list token on other Dex with your own will',
  },
  {
    value: '1',
    label: 'Auto listing',
    description:
      'We will take a part of your raised fund to automatively add liquidity. This process will be done after you complete pre-sale.',
  },
];

const dexs = [
  {
    value: '0',
    label: 'PancakeSwap',
  },
];

const Step04 = ({ data, setData, onNextStep, onBackStep }: any) => {
  const { chainId, account } = useChain();
  const token = useToken(data.tokenContract);
  const presaleFactoryContract = usePresaleFactoryContract();
  const [pending, setPending] = useState(false);

  const tokenFeePercent = data.saleFee === '1' ? 2 : 0;
  const tokenForSale = Number(data.maxGoal) / Number(data.tokenPrice) || 0;
  const tokenForLiquidity =
    data.listing === '0'
      ? 0
      : (Number(data.liquidityPercentage) * Number(data.maxGoal)) / Number(data.listingPrice) || 0;
  const tokenForFee = (Number(data.maxGoal) * Number(tokenFeePercent)) / 100 / Number(data.tokenPrice);
  const tokenInTotal = tokenForSale + tokenForLiquidity + tokenForFee;

  const parsedTotalTokenRequired = tryParseAmount(tokenInTotal.toString(), token as Currency);
  const [approvalState, approveCallback] = useApproveCallback(
    parsedTotalTokenRequired,
    presaleFactoryContract?.address,
  );
  const [errors, setErrors] = useState([]);
  const balance = useCurrencyBalance(account ?? undefined, token || undefined)?.toFixed(2);
  const isTyped = useRef(false);

  const parseErrorMessage = (key: string) => {
    let message = '';
    errors?.map((item: any, index) => {
      if (item?.context?.key == key) {
        message = item?.message;
      }
    });
    return message;
  };

  const validate = async () => {
    try {
      const schemaStep04 = Joi.object({
        listing: Joi.number().integer().min(0).max(1).required().label('Listings options'),
        dex: Joi.required().label('Dex'),
        listingPrice: Joi.number().min(0.000001).required().label('Listing price'),
        liquidityPercentage: Joi.number().min(50).max(100).required().label('Liquidity percentage'),
        lockupTime: Joi.number().min(1).required().label('Lockup time'),
      });

      if (data.listing === '1') {
        const value = await schemaStep04.validateAsync(
          {
            listing: data.listing,
            dex: data.dex,
            listingPrice: data.listingPrice,
            liquidityPercentage: data.liquidityPercentage,
            lockupTime: data.lockupTime,
          },
          { abortEarly: false },
        );
      }

      setErrors([]);
      return true;
    } catch (error: any) {
      setErrors(error?.details || []);
      return false;
    }
  };

  useEffect(() => {
    if (isTyped.current) {
      validate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleApprove = async () => {
    try {
      setPending(true);
      const balanceValidation = handleCheckBalanceToken();
      if (!balanceValidation) {
        setPending(false);
        return false;
      }
      const approve = await approveCallback();
      setPending(false);
    } catch (error) {
      setPending(false);
    }
  };

  const handleCheckBalanceToken = () => {
    if (Number(balance) < tokenInTotal) {
      toastWarn(
        `Not enough balance in your wallet. Need ${tokenInTotal} ${token?.symbol} to create launchpad. (Your balance: ${balance} ${token?.symbol})`,
      );
      return false;
    }
    return true;
  };

  const handleChange = (prop: any) => (event: any) => {
    setData(setPresaleForm({ [prop]: event.target.value }));
    if (!isTyped.current) {
      isTyped.current = true;
    }
  };

  useEffect(() => {
    switch (data.listing) {
      case '0': {
        setData(
          setPresaleForm({
            isAutoListing: false,
            router: ethers.constants.AddressZero,
            listingPrice: '1',
            liquidityPercentage: '0',
            lockupTime: 0,
          }),
        );
        break;
      }
      case '1': {
        setData(setPresaleForm({ isAutoListing: true }));
        break;
      }
    }
  }, [data.listing, setData]);

  useEffect(() => {
    switch (data.dex) {
      default: {
        setData(setPresaleForm({ router: ROUTER_ADDRESS[chainId] }));
        break;
      }
    }
  }, [chainId, data.dex, setData]);

  const handleNextStep = async () => {
    const isValid = await validate();

    if (isValid) {
      onNextStep();
    }
  };

  return (
    <>
      <HeaderSection
        data={data}
        activeStep={3}
        onBackStep={onBackStep}
        onNextStep={handleNextStep}
        approvalState={approvalState}
        handleApprove={handleApprove}
        pendingStep4={pending}
      />
      <FlexBox flexDirection="column" gap="46px" pt="40px" pb="40px">
        <FlexBox flexDirection="column" alignItems="center">
          <Title>4. Add Liquidity</Title>
          <Typography color="text.secondary">You need to add liquidity on a Dex to list that token</Typography>
        </FlexBox>
        <Stack width='100%' alignItems='start' divider={<Divider flexItem/>}>
          <WrapLine>
            <WrapDescription>
              <TitleText>Listings options</TitleText>
              <DescribeText>You can choose to list your token by yourself or we can help you.</DescribeText>
            </WrapDescription>
            <WrapValue>
              <FormControl fullWidth>
                <RadioGroup
                  value={data.listing}
                  onChange={handleChange('listing')}
                  name="radio-buttons-group"
                  sx={{ gap: '25px' }}
                >
                  {listingOpts?.map((item) => (
                    <BoxRadioButtonItem key={item.label}>
                      <FormControlLabel
                        value={item.value}
                        label={
                          <>
                            <Typography
                              variant="body4Poppins"
                              color={data.listing == item.value ? 'text.primary' : 'text.secondary'}
                              fontWeight="400"
                            >
                              {item.label}
                            </Typography>
                          </>
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
                      <Typography
                        variant="captionPoppins"
                        color={data.listing == item.value ? 'text.primary' : 'text.secondary'}
                        fontWeight="400"
                      >
                        {item.description}
                      </Typography>
                    </BoxRadioButtonItem>
                  ))}
                  <ErrorLabel>{parseErrorMessage('listing')}</ErrorLabel>
                </RadioGroup>
              </FormControl>
            </WrapValue>
          </WrapLine>
          {data.listing === '1' && (
            <>
              <WrapLine>
                <WrapDescription>
                  <TitleText>Which Dex will your token be listed on ?</TitleText>
                  <DescribeText>You need to add liquidity on a Dex to list that token</DescribeText>
                </WrapDescription>
                <WrapValue>
                  <FormControl fullWidth>
                    <Typography component="label" fontWeight="500">
                      Dex <RequireSymbol>*</RequireSymbol>
                    </Typography>
                    <SelectCustom value={data.dex} onChange={handleChange('dex')} displayEmpty>
                      {dexs?.map((item) => (
                        <MenuItem key={item.value} value={item.value}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </SelectCustom>
                    <ErrorLabel>{parseErrorMessage('dex')}</ErrorLabel>
                  </FormControl>
                </WrapValue>
              </WrapLine>
              <WrapLine>
                <WrapDescription>
                  <TitleText>Listing price</TitleText>
                  <DescribeText>Set a listing price for your token</DescribeText>
                </WrapDescription>
                <WrapValue>
                  <WrapForm fullWidth>
                    <Typography component="label" fontWeight="500">
                      Listing price <RequireSymbol>*</RequireSymbol>
                    </Typography>
                    <InputCustom
                      fullWidth
                      className={parseErrorMessage('listingPrice') ? 'onError' : ''}
                      value={data.listingPrice}
                      onChange={handleChange('listingPrice')}
                      placeholder="Enter token price"
                      type="number"
                      startAdornment={
                        <WrapStartAdornment>
                          <CurrencyText>{data.currency}</CurrencyText>
                        </WrapStartAdornment>
                      }
                    />
                    <ErrorLabel>{parseErrorMessage('listingPrice')}</ErrorLabel>
                  </WrapForm>
                </WrapValue>
              </WrapLine>
              <WrapLine>
                <WrapDescription>
                  <TitleText>How much percentage of fund raised are you wish to spend on listing your token</TitleText>
                  <DescribeText>
                    Enter the percentage of raised funds that should be allocated to liquidity on {dexs[data.dex].label}
                  </DescribeText>
                </WrapDescription>
                <WrapValue>
                  <WrapForm fullWidth>
                    <Typography component="label" fontWeight="500">
                      Liquidity percentage <RequireSymbol>*</RequireSymbol>
                    </Typography>
                    <InputCustom
                      fullWidth
                      className={parseErrorMessage('liquidityPercentage') ? 'onError' : ''}
                      value={data.liquidityPercentage}
                      onChange={handleChange('liquidityPercentage')}
                      placeholder="Enter liquidity percentage"
                      type="number"
                      startAdornment={
                        <WrapStartAdornment>
                          <CurrencyText>%</CurrencyText>
                        </WrapStartAdornment>
                      }
                    />
                    <ErrorLabel>{parseErrorMessage('liquidityPercentage')}</ErrorLabel>
                  </WrapForm>
                  <Typography variant="body6Poppins" fontWeight="400" color="primary.main">
                    Need to greater than 50%
                  </Typography>
                </WrapValue>
              </WrapLine>
              <WrapLine>
                <WrapDescription>
                  <TitleText>Liquidity lockup</TitleText>
                  <DescribeText>Set a lock-up time for liquidity pool</DescribeText>
                </WrapDescription>
                <WrapValue gap="10px !important">
                  <WrapForm fullWidth>
                    <Typography component="label" fontWeight="500">
                      Lockup time <RequireSymbol>*</RequireSymbol>
                    </Typography>
                    <InputCustom
                      fullWidth
                      className={parseErrorMessage('lockupTime') ? 'onError' : ''}
                      value={data.lockupTime}
                      onChange={handleChange('lockupTime')}
                      placeholder="Enter lockup time"
                      type="number"
                      startAdornment={
                        <WrapStartAdornment>
                          <CurrencyText>Days</CurrencyText>
                        </WrapStartAdornment>
                      }
                    />
                    <ErrorLabel>{parseErrorMessage('lockupTime')}</ErrorLabel>
                  </WrapForm>
                  <Typography variant="body6Poppins" fontWeight="400" color="primary.main">
                    Lock up time must be greater than 15 days
                  </Typography>
                </WrapValue>
              </WrapLine>
            </>
          )}
          <WrapLine>
            <WrapDescription></WrapDescription>
            <WrapValue>
              <FlexBox flexDirection="column" gap="10px">
                <TitleText>{token?.symbol} Token needed to launch</TitleText>
                <DescribeText>Token for sale: {tokenForSale}</DescribeText>
                <DescribeText>Token for Auto liquidity: {tokenForLiquidity}</DescribeText>
                <DescribeText>Token for fee: {tokenForFee}</DescribeText>
                <Line />
                <Typography color="primary.main">
                  Total: {tokenInTotal} {token?.symbol}
                </Typography>
              </FlexBox>
            </WrapValue>
          </WrapLine>
        </Stack>
        <FlexBox justifyContent="flex-end" gap="14px">
          <NextBackButton variant="contained" onClick={onBackStep}>
            Back
          </NextBackButton>
          <LoadingButton
            variant="contained"
            component={LoadingButton}
            loading={pending && approvalState === ApprovalState.NOT_APPROVED}
            onClick={approvalState === ApprovalState.APPROVED ? handleNextStep : handleApprove}
          >
            {!(pending && approvalState === ApprovalState.NOT_APPROVED) && (
              <>{approvalState === ApprovalState.APPROVED ? 'Next' : 'Enable'}</>
            )}
          </LoadingButton>
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
`;

const BoxRadioButtonItem = styled(Box)`
  border: 1px solid #373f47;
  border-radius: 4px;
  padding: 24px;
  display: flex;
  flex-direction: column;
`;
const Line = styled(Box)`
  background-color: ${(props) => (props.theme.palette as any).extra.card.divider};
  height: 1px;
  widht: 100%;
`;
const SelectCustom = styled(Select)`
  .MuiSelect-select {
    border: 1px solid;
    border-color: ${(props) => (props.theme.palette as any).extra.card.divider};
    border-radius: 4px;
    font-family: 'Poppins', sans-serif;
    padding: 12px 16px;
    font-weight: 400;
    font-size: 14px;
    line-height: 180%;
    color: ${(props) => props.theme.palette.text.primary};
  }

  fieldset {
    display: none;
  }
`;

export default Step04;
