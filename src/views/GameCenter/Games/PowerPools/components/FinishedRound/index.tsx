import { Typography, styled, Box, Stack } from '@mui/material';
import ItemTab from './components/ItemTab';
import ResultBox from './components/ResultBox';

interface FinishedRoundProp {
  contracts: any;
}

const FinishedRound = ({ contracts }: FinishedRoundProp) => {
  return (
    <Stack width='100%' gap='25px'>
      <Typography variant="h3Samsung" fontWeight="500" color="success.contrastText">
        Finished round
      </Typography>
      <Stack width='100%'>
        {contracts?.map((item: any) => (
          <ItemTab key={item.label} contract={item} />
        ))}
      </Stack>
      <Box width='100%'>
        {contracts?.map((item: any) => (
          <ResultBox key={item.label} parentContract={item} />
        ))}
      </Box>
    </Stack>
  );
};

export default FinishedRound;
