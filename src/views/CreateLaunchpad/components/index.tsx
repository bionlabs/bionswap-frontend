import { styled, OutlinedInput, Typography, Button, Box } from '@mui/material';

export const Title = styled(Typography)`
  font-family: 'SamsungSharpSans';
  font-weight: 700;
  font-size: 24px;
`

export const InputCustom = styled(OutlinedInput)`
  fieldset {
    // display: none;
  }

  input {
    padding: 12px 16px;
    border: 1px solid;
    border-color: ${(props) => (props.theme.palette as any).extra.card.divider};
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
      color: ${(props) => props.theme.palette.text.secondary};
      opacity: 1;
    }
  }
`;
export const RequireSymbol = styled(Typography)`
  color: ${(props) => props.theme.palette.error.main};
`;

export const TitleText = styled(Typography)`
  font-size: 18px;
  font-weight: 500;
`;
export const DescribeText = styled(Typography)`
  font-size: 14px;
  color: ${(props) => props.theme.palette.text.secondary};
`;
export const ErrorLabel = styled(Typography)`
  color: ${(props) => props.theme.palette.error.main};
  font-size: 10px;
`;
export const NextBackButton = styled(Button)`
  max-width: 200px;
  height: 45px;
`;
export const CurrencyText = styled(Typography)`
  color: ${(props) => props.theme.palette.text.primary};
  text-transform: uppercase;
`;
export const WrapLine = styled(Box)`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 30px 0;
`;