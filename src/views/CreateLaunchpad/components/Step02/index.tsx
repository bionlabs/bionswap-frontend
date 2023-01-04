import { BUSD_ADDRESS, USDC_ADDRESS, USDT_ADDRESS } from '@bionswap/core-sdk';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  styled,
  Typography,
  Stack,
  Divider,
} from '@mui/material';
import CreateTokenModal from 'components/CreateTokenModal';
import { ethers } from 'ethers';
import { useChain } from 'hooks';
import { useToken } from 'hooks/useToken';
import { useCallback, useEffect, useRef, useState } from 'react';
import { setPresaleForm } from 'state/presale/action';
import Joi, { CustomHelpers, CustomValidator } from 'joi';
import HeaderSection from '../HeaderSection';
import { DescribeText, ErrorLabel, InputCustom, NextBackButton, RequireSymbol, Title, TitleText, WrapLine } from '..';

const currencyOpts = [
  {
    value: 'BUSD',
    label: 'BUSD',
  },
  {
    value: 'USDT',
    label: 'USDT',
  },
  {
    value: 'USDC',
    label: 'USDC',
  },
  {
    value: 'BNB',
    label: 'BNB',
  },
];

const Step02 = ({ data, setData, onNextStep, onBackStep }: any) => {
  const { chainId } = useChain();

  const feeOpts = [
    {
      value: 0,
      label: `5% ${data.currency} raised only`,
    },
    {
      value: 1,
      label: `2%  ${data.currency} raised + 2% token sold`,
    },
  ];

  const tokenContract = useToken(data.tokenContract, true);
  const [openModal, setOpenModal] = useState(false);
  const [errors, setErrors] = useState([]);
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

  const method: CustomValidator = (value: any, helpers: CustomHelpers) => {
    const res: any = helpers?.state?.path;

    res?.map((item: any, index: any) => {
      if (item == 'tokenContract') {
        if (value.toLowerCase() !== tokenContract?.address.toLowerCase()) {
          throw new Error('Invalid token address');
        }
      }
    });
  };

  const validate = async () => {
    try {
      const schemaStep02 = Joi.object({
        tokenContract: Joi.string().required().custom(method).label('Token contract'),
        currency: Joi.string().required().label('Currency'),
        saleFee: Joi.required().label('Sale fee option'),
      });

      const value = await schemaStep02.validateAsync(
        {
          tokenContract: data.tokenContract,
          currency: data.currency,
          saleFee: data.saleFee,
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

  const handleChangeInput = (prop: any) => (event: any) => {
    setData(setPresaleForm({ [prop]: event.target.value }));
    if (!isTyped.current) {
      isTyped.current = true;
    }
  };

  useEffect(() => {
    setErrors([]);
  }, [tokenContract?.address]);

  useEffect(() => {
    if (isTyped.current) {
      validate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    let payload;
    switch (data.currency) {
      case 'BNB': {
        payload = { quoteToken: ethers.constants.AddressZero, isQuoteETH: true };
        break;
      }
      case 'BUSD': {
        payload = { quoteToken: BUSD_ADDRESS[chainId], isQuoteETH: false };
        break;
      }
      case 'USDT': {
        payload = { quoteToken: USDT_ADDRESS[chainId], isQuoteETH: false };
        break;
      }
      case 'USDC': {
        payload = { quoteToken: USDC_ADDRESS[chainId], isQuoteETH: false };
        break;
      }
    }
    setData(setPresaleForm({ ...payload }));
  }, [chainId, data.currency, setData]);

  useEffect(() => {
    let payload;
    switch (data.saleFee) {
      case '0': {
        payload = { baseFee: 500, tokenFee: 0 };
        break;
      }
      case '1': {
        payload = { baseFee: 200, tokenFee: 200 };
        break;
      }
    }
    setData(setPresaleForm({ ...payload }));
  }, [data.saleFee, setData]);

  const handleOpenModal = () => setOpenModal(true);

  const handleCloseModal = () => setOpenModal(false);

  const handleNextStep = async () => {
    const isValid = await validate();

    if (isValid) {
      onNextStep();
    }
  };

  return (
    <>
      <HeaderSection data={data} activeStep={1} onBackStep={onBackStep} onNextStep={handleNextStep} />
      <FlexBox flexDirection="column" gap="46px" pt="40px" pb="40px">
        <FlexBox flexDirection="column" alignItems="center">
          <Title>2. Verify token</Title>
          <Typography color="text.secondary">Enter the token address and verify</Typography>
        </FlexBox>
        <Stack width='100%' alignItems='start' divider={<Divider flexItem/>}>
          <WrapLine>
            <WrapDescription>
              <TitleText>Token contract</TitleText>
              <DescribeText>
                You don&apos;t have one? <Button onClick={handleOpenModal}>Create token now</Button>
              </DescribeText>
            </WrapDescription>
            <WrapValue>
              <WrapForm fullWidth>
                <Typography component="label" fontWeight="500">
                  Contract <RequireSymbol>*</RequireSymbol>
                </Typography>
                <InputCustom
                  fullWidth
                  className={parseErrorMessage('tokenContract') ? 'onError' : ''}
                  value={data.tokenContract}
                  onChange={handleChangeInput('tokenContract')}
                  placeholder="Enter contract token"
                />
                <ErrorLabel>{parseErrorMessage('tokenContract')}</ErrorLabel>
              </WrapForm>
              {tokenContract && (
                <Stack width="100%" spacing={1} divider={<Divider flexItem />}>
                  <ContractItem>
                    <Typography variant="body4Poppins" color="text.secondary" fontWeight="400">
                      Name
                    </Typography>
                    <Typography variant="body4Poppins" color="text.secondary" fontWeight="400">
                      {tokenContract?.name}
                    </Typography>
                  </ContractItem>
                  <ContractItem>
                    <Typography variant="body4Poppins" color="text.secondary" fontWeight="400">
                      Symbol
                    </Typography>
                    <Typography variant="body4Poppins" color="text.secondary" fontWeight="400">
                      {tokenContract?.symbol}
                    </Typography>
                  </ContractItem>
                  <ContractItem>
                    <Typography variant="body4Poppins" color="text.secondary" fontWeight="400">
                      Decimal
                    </Typography>
                    <Typography variant="body4Poppins" color="text.secondary" fontWeight="400">
                      {tokenContract?.decimals}
                    </Typography>
                  </ContractItem>
                </Stack>
              )}
            </WrapValue>
          </WrapLine>
          <WrapLine>
            <WrapDescription>
              <TitleText>Which currency will you want to take</TitleText>
              <DescribeText>Users will pay with the currency they choose for your token</DescribeText>
            </WrapDescription>
            <WrapValue>
              <FormControl fullWidth>
                <Typography component="label" fontWeight="500" mb="10px">
                  Currency <RequireSymbol>*</RequireSymbol>
                </Typography>
                <Select
                  value={data.currency}
                  onChange={(event) => {
                    setData(setPresaleForm({ currency: event.target.value }));
                  }}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  {currencyOpts?.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
                <Typography variant="captionPoppins" color="red.500" fontWeight="400">
                  {parseErrorMessage('currency')}
                </Typography>
              </FormControl>
            </WrapValue>
          </WrapLine>
          <WrapLine>
            <WrapDescription>
              <TitleText>Sale fee option</TitleText>
              <DescribeText>This is the fee that you are required to pay to veify your token.</DescribeText>
            </WrapDescription>
            <WrapValue>
              <FormControl fullWidth>
                <RadioGroup
                  value={data.saleFee}
                  onChange={(event) => {
                    setData(setPresaleForm({ saleFee: event.target.value }));
                  }}
                  name="radio-buttons-group"
                >
                  {feeOpts?.map((item) => (
                    <FormControlLabel
                      key={item.value}
                      value={item.value}
                      label={
                        <Typography color={data.saleFee == item.value ? 'text.primary' : 'text.secondary'}>
                          {item.label}
                        </Typography>
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
                  ))}
                </RadioGroup>
              </FormControl>
              <Typography variant="captionPoppins" color="red.500" fontWeight="400">
                {parseErrorMessage('saleFee')}
              </Typography>
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
      <CreateTokenModal
        open={openModal}
        onDismiss={handleCloseModal}
        onTokenCreated={(tokenAddress: string) => setData(setPresaleForm({ ['tokenContract']: tokenAddress }))}
        chainId={chainId}
      />
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

const ContractItem = styled(Box)`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
const Line = styled(Box)`
  background-color: ${(props) => (props.theme.palette as any).extra.card.divider};
  height: 1px;
  widht: 100%;
`;
const WrapForm = styled(FormControl)`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export default Step02;
