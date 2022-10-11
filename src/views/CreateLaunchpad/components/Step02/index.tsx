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
} from '@mui/material';
import CreateTokenModal from 'components/CreateTokenModal';
import { ethers } from 'ethers';
import { useChain } from 'hooks';
import { useToken } from 'hooks/useToken';
import { useCallback, useEffect, useRef, useState } from 'react';
import { setPresaleForm } from 'state/presale/action';
import Joi, { CustomHelpers, CustomValidator } from 'joi';
import HeaderSection from '../HeaderSection';

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

  const tokenContract = useToken(data.tokenContract);
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

      console.log('🚀 ~ file: index.tsx ~ line 107 ~ validate ~ data.tokenContract', data.tokenContract);

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
          <Typography variant="h3" color="text.primary" fontWeight="400">
            2. Verify token
          </Typography>
          <Typography variant="body3Poppins" color="gray.400" fontWeight="400">
            Enter the token address and verify
          </Typography>
        </FlexBox>
        <FlexBox flexDirection="column">
          <WrapLine>
            <WrapDescription>
              <Typography variant="body2Poppins" color="text.primary" fontWeight="400">
                Token contract
              </Typography>
              <Typography variant="body4Poppins" className="content" color="#717D8A" fontWeight="400">
                You don’t have one? <Button onClick={handleOpenModal}>Create token now</Button>
              </Typography>
            </WrapDescription>
            <WrapValue>
              <WrapForm fullWidth>
                <Typography component="label" variant="body4Poppins" color="blue.100" fontWeight="500">
                  Contract <RequireSymbol component="span">*</RequireSymbol>
                </Typography>
                <InputCustom
                  fullWidth
                  className={parseErrorMessage('tokenContract') ? 'onError' : ''}
                  value={data.tokenContract}
                  onChange={handleChangeInput('tokenContract')}
                  placeholder="Enter contract token"
                />
                <Typography variant="captionPoppins" color="red.500" fontWeight="400">
                  {parseErrorMessage('tokenContract')}
                </Typography>
              </WrapForm>
              {tokenContract && (
                <FlexBox flexDirection="column" gap="9px">
                  <ContractItem>
                    <Typography variant="body4Poppins" color="gray.400" fontWeight="400">
                      Name
                    </Typography>
                    <Typography variant="body4Poppins" color="gray.400" fontWeight="400">
                      {tokenContract?.name}
                    </Typography>
                  </ContractItem>
                  <Line />
                  <ContractItem>
                    <Typography variant="body4Poppins" color="gray.400" fontWeight="400">
                      Symbol
                    </Typography>
                    <Typography variant="body4Poppins" color="gray.400" fontWeight="400">
                      {tokenContract?.symbol}
                    </Typography>
                  </ContractItem>
                  <Line />
                  <ContractItem>
                    <Typography variant="body4Poppins" color="gray.400" fontWeight="400">
                      Decimal
                    </Typography>
                    <Typography variant="body4Poppins" color="gray.400" fontWeight="400">
                      {tokenContract?.decimals}
                    </Typography>
                  </ContractItem>
                </FlexBox>
              )}
            </WrapValue>
          </WrapLine>
          <WrapLine>
            <WrapDescription>
              <Typography variant="body2Poppins" color="text.primary" fontWeight="400">
                Which currency will you want to take
              </Typography>
              <Typography variant="body4Poppins" className="content" color="#717D8A" fontWeight="400">
                Users will pay with the currency they choose for your token
              </Typography>
            </WrapDescription>
            <WrapValue>
              <FormControl fullWidth>
                <Typography component="label" variant="body4Poppins" color="blue.100" fontWeight="500">
                  Currency <RequireSymbol component="span">*</RequireSymbol>
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
          <WrapLine
            sx={{
              borderBottom: '1px solid',
              borderColor: 'gray.600',
            }}
          >
            <WrapDescription>
              <Typography variant="body2Poppins" color="text.primary" fontWeight="400">
                Sale fee option
              </Typography>
              <Typography variant="body4Poppins" className="content" color="#717D8A" fontWeight="400">
                This is the fee that you are required to pay to veify your token.
              </Typography>
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
                        <Typography
                          variant="body4Poppins"
                          color={data.saleFee == item.value ? 'blue.100' : 'gray.700'}
                          fontWeight="400"
                        >
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
        </FlexBox>
        <FlexBox justifyContent="flex-end" gap="14px">
          <Back onClick={onBackStep}>
            <Typography variant="body3Poppins" color="primary.main" fontWeight="600">
              Back
            </Typography>
          </Back>
          <Next onClick={handleNextStep}>
            <Typography variant="body3Poppins" color="#000000" fontWeight="600">
              Next
            </Typography>
          </Next>
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
const ContractItem = styled(Box)`
  display: flex;
  justify-content: space-between;
`;
const Line = styled(Box)`
  background-color: ${(props) => props.theme.palette.gray[800]};
  height: 1px;
  widht: 100%;
`;
const WrapForm = styled(FormControl)`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
const InputCustom = styled(OutlinedInput)`
  fieldset {
    display: none;
  }

  input {
    font-family: 'Poppins', sans-serif;
    padding: 12px 16px;
    border: 1px solid;
    border-color: ${(props) => props.theme.palette.gray[700]};
    border-radius: 4px;
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
    input {
      border-color: #9a6aff;
      box-shadow: rgba(175, 137, 255, 0.4) 0px 0px 0px 2px, rgba(175, 137, 255, 0.65) 0px 4px 6px -1px,
        rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
    }
  }

  &.onError {
    input {
      border-color: ${(props) => props.theme.palette.red[500]};
      box-shadow: none;
    }
  }
`;
const RequireSymbol = styled(Box)`
  color: ${(props) => props.theme.palette.red[500]};
`;

export default Step02;
