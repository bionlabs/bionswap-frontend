import { NATIVE } from '@bionswap/core-sdk';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  MenuItem,
  OutlinedInput,
  Select,
  styled,
  Typography,
} from '@mui/material';
import { BaseModal } from 'components';
import { TOKEN_CREATION_FEE } from 'configs/fees';
import { parseEther } from 'ethers/lib/utils';
import { useChain } from 'hooks';
import { useStandardTokenContractFactory } from 'hooks/useContract';
import { useCallback, useState } from 'react';
import { ErrorLabel, InputCustom, RequireSymbol } from 'views/CreateLaunchpad/components';

const tokenTypes = [
  {
    value: 0,
    title: 'Standard Token',
  },
];

const CreateTokenModal = ({ open, onDismiss, onTokenCreated }: any) => {
  const Joi = require('joi');
  const standardTokenContractFactory = useStandardTokenContractFactory();
  const [errors, setErrors] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const { chainId } = useChain();
  const [dataCreated, setDataCreated] = useState({
    tokenType: 0,
    name: '',
    symbol: '',
    decimal: '',
    totalSupply: '',
  });

  const handleCreateStandardToken = async () => {
    if (!standardTokenContractFactory) return;
    const { name, symbol, decimal, totalSupply } = dataCreated;

    const token = await standardTokenContractFactory.deploy(
      name,
      symbol,
      decimal,
      parseEther(totalSupply),
      process.env.NEXT_PUBLIC_TOKEN_FEE_TO,
      parseEther(TOKEN_CREATION_FEE[chainId]),
      { value: parseEther(TOKEN_CREATION_FEE[chainId]!) },
    );

    setIsCreating(true);
    await token.deployed();
    setIsCreating(false);
    onTokenCreated(token.address);
    // onTokenCreated("0xf64f57e754c0cc641fcab2999ecc375016415a37")
    onDismiss();
  };

  const handleDismiss = useCallback(() => {
    onDismiss?.();
  }, [onDismiss]);

  const schema = Joi.object({
    tokenType: Joi.required(),
    name: Joi.string().max(30).required(),
    symbol: Joi.string().alphanum().pattern(/^[^0-9]+$/).max(6).min(2).required(),
    decimal: Joi.number().min(1).max(18).required(),
    totalSupply: Joi.string().required(),
  });

  const onCreateToken = async () => {
    try {
      setIsCreating(true);
      const value = await schema.validateAsync(
        {
          tokenType: dataCreated.tokenType,
          name: dataCreated.name,
          symbol: dataCreated.symbol,
          decimal: dataCreated.decimal,
          totalSupply: dataCreated.totalSupply,
        },
        { abortEarly: false },
      );
      setErrors([]);

      await handleCreateStandardToken();
      setIsCreating(false);
    } catch (err: any) {
      setIsCreating(false);
      setErrors(err?.details || []);
    }
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

  const handleChange = (prop: any) => (event: any) => {
    setDataCreated({ ...dataCreated, [prop]: event.target.value });
  };

  return (
    <BaseModal
      open={open}
      sx={{
        padding: '24px',
        maxWidth: '556px',
        width: '90%',
        height: '90vh',
        overflowY: 'auto',
      }}
    >
      <IconButton onClick={onDismiss} sx={{ position: 'absolute', right: 8, top: 8 }}>
        <CloseIcon />
      </IconButton>
      <FlexBox flexDirection="column" gap="24px">
        <Typography variant="h6Poppins" color="text.primary" fontWeight="500">
          Create token
        </Typography>
        <Typography variant="body4Poppins" color="error.main" fontWeight="500">
          (*) is required field.
        </Typography>
        <WrapForm fullWidth>
          <Typography component="label" fontWeight="500">
            Token Type <RequireSymbol>*</RequireSymbol>
          </Typography>
          {/* <InputCustom fullWidth
                        className={parseErrorMessage('tokenType') ? 'onError' : ''}
                        value={dataCreated.tokenType}
                        onChange={handleChange('tokenType')}
                        placeholder="Standard Token" /> */}
          <Select
            value={dataCreated.tokenType}
            onChange={handleChange('tokenType')}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            {tokenTypes?.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.title}
              </MenuItem>
            ))}
          </Select>
          <ErrorLabel>
            {parseErrorMessage('tokenType')}
          </ErrorLabel>
          <Typography variant="captionPoppins" color="primary.main" fontWeight="400">
            Fee: {TOKEN_CREATION_FEE[chainId]} {NATIVE[chainId].symbol}
          </Typography>
        </WrapForm>
        <WrapForm fullWidth>
          <Typography component="label" fontWeight="500">
            Name <RequireSymbol>*</RequireSymbol>
          </Typography>
          <InputCustom
            fullWidth
            className={parseErrorMessage('name') ? 'onError' : ''}
            value={dataCreated.name}
            onChange={handleChange('name')}
            placeholder="Enter token name"
          />
          <ErrorLabel>
            {parseErrorMessage('name')}
          </ErrorLabel>
        </WrapForm>
        <WrapForm fullWidth>
          <Typography component="label" fontWeight="500">
            Symbol <RequireSymbol>*</RequireSymbol>
          </Typography>
          <InputCustom
            fullWidth
            className={parseErrorMessage('symbol') ? 'onError' : ''}
            value={dataCreated.symbol}
            onChange={handleChange('symbol')}
            placeholder="Enter token symbol"
          />
          <ErrorLabel>
            {parseErrorMessage('symbol')}
          </ErrorLabel>
        </WrapForm>
        <WrapForm fullWidth>
          <Typography component="label" fontWeight="500">
            Decimals <RequireSymbol>*</RequireSymbol>
          </Typography>
          <InputCustom
            type="number"
            fullWidth
            className={parseErrorMessage('decimal') ? 'onError' : ''}
            value={dataCreated.decimal}
            onChange={handleChange('decimal')}
            placeholder="Enter decimal"
          />
          <ErrorLabel>
            {parseErrorMessage('decimal')}
          </ErrorLabel>
        </WrapForm>
        <WrapForm fullWidth>
          <Typography component="label" fontWeight="500">
            Total supply <RequireSymbol>*</RequireSymbol>
          </Typography>
          <InputCustom
            type="number"
            fullWidth
            className={parseErrorMessage('totalSupply') ? 'onError' : ''}
            value={dataCreated.totalSupply}
            onChange={handleChange('totalSupply')}
            placeholder="Enter token supply"
          />
          <ErrorLabel>
            {parseErrorMessage('totalSupply')}
          </ErrorLabel>
        </WrapForm>
        <FormGroup>
          <FormControlLabel
            control={<CheckboxCustom />}
            label={
              <Typography variant="body3Poppins" fontWeight="400">
                Implement Bion Anti-Bot System?
              </Typography>
            }
          />
        </FormGroup>
        <CreateToken variant='contained' onClick={onCreateToken} disabled={isCreating}>
          {isCreating ? 'Creating Token...' : 'Create Token'}
        </CreateToken>
      </FlexBox>
    </BaseModal>
  );
};

const FlexBox = styled(Box)`
  display: flex;
`;
const WrapForm = styled(FormControl)`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const CheckboxCustom = styled(Checkbox)`
  color: ${(props) => props.theme.palette.text.primary};
`;
const CreateToken = styled(Button)`
  width: 100%;
  height: 52px;
  border-radius: 4px;
`;

export default CreateTokenModal;
