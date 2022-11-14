import { styled, Box, Typography, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const configs = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'Claimed',
    value: 'claimed',
  },
  {
    label: 'Unclaimed',
    value: 'unclaimed',
  },
];

const History = () => {
  return (
    <WrapBox>
      <Typography variant="body2Poppins" fontWeight="500" color="background.paper">
        History
      </Typography>
      <FormControl>
        <RadioGroup row>
          {configs.map((item: any) => (
            <FormControlLabel key={item.value} value={item.value} control={<Radio />} label={item.label} />
          ))}
        </RadioGroup>
      </FormControl>
    </WrapBox>
  );
};

const WrapBox = styled(Box)``;

export default History;
