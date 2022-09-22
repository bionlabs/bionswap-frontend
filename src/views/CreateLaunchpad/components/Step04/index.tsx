import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  styled,
  FormControl,
  OutlinedInput,
  Button,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from '@mui/material';
import { useToken } from 'hooks/useToken';
import { setPresaleForm } from 'state/presale/action';
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback';
import { tryParseAmount } from 'utils/parse';
import { Currency } from '@bionswap/core-sdk';
import { usePresaleFactoryContract } from 'hooks/useContract';

const listingOptions = [
  {
    value: 0,
    label: 'Manual listing',
    description: 'You can list token on other Dex with your own will',
  },
  {
    value: 1,
    label: 'Bionswap Auto listing',
    description:
      'We will take a part of your raised fund to automatively add liquidity. This process will be done after you complete pre-sale.',
  },
];

const dexs = [
  {
    value: 0,
    label: 'PancakeSwap',
  },
];

const Step04 = ({ data, setData, handleNext, handleBack, onShowError }: any) => {
  const token = useToken(data.tokenContract);
  const presaleFactoryContract = usePresaleFactoryContract();

  const tokenForSale = Number(data.maxGoal) / Number(data.tokenPrice) || 0;
  const tokenForLiquidity = (Number(data.liquidityPercentage) * Number(data.maxGoal)) / Number(data.pricePerToken) || 0;

  const parsedTotalTokenRequired = tryParseAmount((tokenForSale + tokenForLiquidity).toString(), token as Currency);
  const [approvalState, approveCallback] = useApproveCallback(
    parsedTotalTokenRequired,
    presaleFactoryContract?.address,
  );

  const handleChange = (prop: any) => (event: any) => {
    // setData({ ...data, [prop]: event.target.value })
    setData(setPresaleForm({ ...data, [prop]: event.target.value }));
  };

  return (
    <>
      <FlexBox flexDirection="column" gap="46px" pt="40px" pb="40px">
        <FlexBox flexDirection="column" alignItems="center">
          <Typography variant="h3" color="text.primary" fontWeight="400">
            4. Add Liquidity
          </Typography>
          <Typography variant="body3Poppins" color="gray.400" fontWeight="400">
            You need to add liquidity on a Dex to list that token
          </Typography>
        </FlexBox>
        <FlexBox flexDirection="column">
          <WrapLine>
            <WrapDescription>
              <Typography variant="body2Poppins" color="text.primary" fontWeight="400">
                Listings options
              </Typography>
              <Typography variant="body4Poppins" className="content" color="#717D8A" fontWeight="400">
                You can choose to list your token by yourself or we can help you.
              </Typography>
            </WrapDescription>
            <WrapValue>
              <FormControl fullWidth>
                <RadioGroup
                  value={data.listing}
                  onChange={handleChange('listing')}
                  name="radio-buttons-group"
                  sx={{ gap: '25px' }}
                >
                  {listingOptions?.map((item) => (
                    <BoxRadioButtonItem key={item.label}>
                      <FormControlLabel
                        value={item.value}
                        label={
                          <>
                            <Typography
                              variant="body4Poppins"
                              color={data.listing == item.value ? 'blue.100' : 'gray.700'}
                              fontWeight="400"
                            >
                              {item.label}
                            </Typography>
                            <RequireSymbol component="span">*</RequireSymbol>
                          </>
                        }
                        control={
                          <Radio
                            sx={{
                              color: 'gray.700',
                              '&.Mui-checked': {
                                color: 'blue.500',
                              },
                            }}
                          />
                        }
                      />
                      <Typography
                        variant="captionPoppins"
                        color={data.listing == item.value ? 'blue.100' : 'gray.700'}
                        fontWeight="400"
                      >
                        {item.description}
                      </Typography>
                    </BoxRadioButtonItem>
                  ))}
                  <Typography variant="captionPoppins" color="red.500" fontWeight="400">
                    {onShowError('listing')}
                  </Typography>
                </RadioGroup>
              </FormControl>
            </WrapValue>
          </WrapLine>
          <WrapLine>
            <WrapDescription>
              <Typography variant="body2Poppins" color="text.primary" fontWeight="400">
                Which Dex will your token be listed on ?
              </Typography>
              <Typography variant="body4Poppins" className="content" color="#717D8A" fontWeight="400">
                You need to add liquidity on a Dex to list that token
              </Typography>
            </WrapDescription>
            <WrapValue>
              <FormControl fullWidth>
                <Typography component="label" variant="body4Poppins" color="blue.100" fontWeight="500">
                  Dex <RequireSymbol component="span">*</RequireSymbol>
                </Typography>
                <Select
                  value={data.dex}
                  onChange={handleChange('dex')}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  {dexs?.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
                <Typography variant="captionPoppins" color="red.500" fontWeight="400">
                  {onShowError('dex')}
                </Typography>
              </FormControl>
            </WrapValue>
          </WrapLine>
          <WrapLine>
            <WrapDescription>
              <Typography variant="body2Poppins" color="text.primary" fontWeight="400">
                List price
              </Typography>
              <Typography variant="body4Poppins" className="content" color="#717D8A" fontWeight="400">
                Set a listing price for your token
              </Typography>
            </WrapDescription>
            <WrapValue>
              <WrapForm fullWidth>
                <Typography component="label" variant="body4Poppins" color="blue.100" fontWeight="500">
                  Price per token <RequireSymbol component="span">*</RequireSymbol>
                </Typography>
                <InputCustom
                  fullWidth
                  className={onShowError('pricePerToken') ? 'onError' : ''}
                  value={data.pricePerToken}
                  onChange={handleChange('pricePerToken')}
                  placeholder="Enter token price"
                  type="number"
                  startAdornment={
                    <WrapStartAdornment>
                      <Typography variant="body4Poppins" color="#2AC89F" fontWeight="400" textTransform="uppercase">
                        {data.currency}
                      </Typography>
                    </WrapStartAdornment>
                  }
                />
                <Typography variant="captionPoppins" color="red.500" fontWeight="400">
                  {onShowError('pricePerToken')}
                </Typography>
              </WrapForm>
            </WrapValue>
          </WrapLine>
          <WrapLine>
            <WrapDescription>
              <Typography variant="body2Poppins" color="text.primary" fontWeight="400">
                How much percentage of fund raised are you wish to spend on listing your token
              </Typography>
              <Typography variant="body4Poppins" className="content" color="#717D8A" fontWeight="400">
                Enter the percentage of raised funds that should be allocated to liquidity on BionSwap
              </Typography>
            </WrapDescription>
            <WrapValue gap="10px !important">
              <WrapForm fullWidth>
                <Typography component="label" variant="body4Poppins" color="blue.100" fontWeight="500">
                  Liquidity percentage <RequireSymbol component="span">*</RequireSymbol>
                </Typography>
                <InputCustom
                  fullWidth
                  className={onShowError('liquidityPercentage') ? 'onError' : ''}
                  value={data.liquidityPercentage}
                  onChange={handleChange('liquidityPercentage')}
                  placeholder="Enter liquidity percentage"
                  type="number"
                  startAdornment={
                    <WrapStartAdornment>
                      <Typography variant="body4Poppins" color="#2AC89F" fontWeight="400" textTransform="uppercase">
                        %
                      </Typography>
                    </WrapStartAdornment>
                  }
                />
                <Typography variant="captionPoppins" color="red.500" fontWeight="400">
                  {onShowError('liquidityPercentage')}
                </Typography>
              </WrapForm>
              <Typography variant="body6Poppins" fontWeight="400" color="blue.400">
                &#8226; Need to greater than 50%
              </Typography>
            </WrapValue>
          </WrapLine>
          <WrapLine>
            <WrapDescription>
              <Typography variant="body2Poppins" color="text.primary" fontWeight="400">
                Liquidity lockup
              </Typography>
              <Typography variant="body4Poppins" className="content" color="#717D8A" fontWeight="400">
                Set a lock-up time for liquidity pool
              </Typography>
            </WrapDescription>
            <WrapValue gap="10px !important">
              <WrapForm fullWidth>
                <Typography component="label" variant="body4Poppins" color="blue.100" fontWeight="500">
                  Lockup time <RequireSymbol component="span">*</RequireSymbol>
                </Typography>
                <InputCustom
                  fullWidth
                  className={onShowError('lockupTime') ? 'onError' : ''}
                  value={data.lockupTime}
                  onChange={handleChange('lockupTime')}
                  placeholder="Enter lockup time"
                  type="number"
                  startAdornment={
                    <WrapStartAdornment>
                      <Typography variant="body4Poppins" color="#2AC89F" fontWeight="400" textTransform="uppercase">
                        Days
                      </Typography>
                    </WrapStartAdornment>
                  }
                />
                <Typography variant="captionPoppins" color="red.500" fontWeight="400">
                  {onShowError('lockupTime')}
                </Typography>
              </WrapForm>
              <Typography variant="body6Poppins" fontWeight="400" color="blue.400">
                &#8226; Lock up time must be greater than 15 days
              </Typography>
            </WrapValue>
          </WrapLine>
          <WrapLine>
            <WrapDescription></WrapDescription>
            <WrapValue>
              <FlexBox flexDirection="column" gap="10px">
                <Typography variant="body4Poppins" color="blue.100" fontWeight="400">
                  {token?.symbol} Token needed to launch
                </Typography>
                <Typography variant="captionPoppins" color="#717D8A" fontWeight="400">
                  Token for sale:{' '}
                  <Typography variant="captionPoppins" color="blue.100">
                    {tokenForSale}
                  </Typography>
                </Typography>
                <Typography variant="captionPoppins" color="#717D8A" fontWeight="400">
                  Token for Auto liquidity:{' '}
                  <Typography variant="captionPoppins" color="blue.100">
                    {tokenForLiquidity}
                  </Typography>
                </Typography>
                <Line />
                <Typography variant="captionPoppins" color="#717D8A" fontWeight="400">
                  In total:{' '}
                  <Typography variant="captionPoppins" color="primary.main">
                    {tokenForSale + tokenForLiquidity} {token?.symbol}
                  </Typography>
                </Typography>
              </FlexBox>
            </WrapValue>
          </WrapLine>
        </FlexBox>
        <FlexBox justifyContent="flex-end" gap="14px">
          <Back onClick={() => handleBack(4)}>
            <Typography variant="body3Poppins" color="primary.main" fontWeight="600">
              Back
            </Typography>
          </Back>
          <Next
            onClick={approvalState === ApprovalState.APPROVED ? () => handleNext(4) : () => approveCallback()}
            disabled={approvalState === ApprovalState.PENDING}
          >
            <Typography variant="body3Poppins" color="#000000" fontWeight="600">
              {approvalState === ApprovalState.APPROVED ? 'Next' : 'Approve'}
            </Typography>
          </Next>
        </FlexBox>
      </FlexBox>
    </>
  );
};

const FlexBox = styled(Box)`
  display: flex;
`;
const WrapLine = styled(Box)`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 30px 0;
  border-top: 1px solid;
  border-color: ${(props) => props.theme.palette.gray[600]};
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
const Next = styled(Button)`
  max-width: 200px;
  width: 100%;
  height: 45px;
  align-item: center;
  justify-content: center;
  display: flex;
  background-color: ${(props) => props.theme.palette.primary.main};
  border-radius: 4px;
`;
const Back = styled(Button)`
  max-width: 200px;
  width: 100%;
  height: 45px;
  align-item: center;
  justify-content: center;
  display: flex;
  background-color: rgba(7, 224, 224, 0.15);
  border-radius: 4px;
`;
const WrapStartAdornment = styled(Box)`
  max-width: 67px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid;
  border-color: ${(props) => props.theme.palette.gray[700]};
`;
const WrapForm = styled(FormControl)`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
const InputCustom = styled(OutlinedInput)`
  padding: 0;
  border: 1px solid;
  border-color: ${(props) => props.theme.palette.gray[700]};
  border-radius: 4px;

  fieldset {
    display: none;
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
    border-color: #9a6aff;
    box-shadow: rgba(175, 137, 255, 0.4) 0px 0px 0px 2px, rgba(175, 137, 255, 0.65) 0px 4px 6px -1px,
      rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
  }

  &.onError {
    border-color: ${(props) => props.theme.palette.red[500]};
    box-shadow: none;
  }
`;
const RequireSymbol = styled(Box)`
  color: ${(props) => props.theme.palette.red[500]};
`;
const BoxRadioButtonItem = styled(Box)`
  border: 1px solid #373f47;
  border-radius: 4px;
  padding: 24px;
  display: flex;
  flex-direction: column;
`;
const Line = styled(Box)`
  background-color: ${(props) => props.theme.palette.gray[800]};
  height: 1px;
  widht: 100%;
`;

export default Step04;
