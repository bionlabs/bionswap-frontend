import { Typography, styled, Box, Stack } from '@mui/material';
import ItemTab from './components/ItemTab';
import ResultBox from './components/ResultBox';

interface FinishedRoundProp {
  contracts: any;
}

const FinishedRound = ({ contracts }: FinishedRoundProp) => {
  return (
    <>
      <Typography variant="h3Samsung" fontWeight="500" color="success.contrastText">
        Finished round
      </Typography>
      <Stack>
        {contracts?.map((item: any) => (
          <ItemTab key={item.label} contract={item} />
        ))}
      </Stack>
      <Box>
        <ResultBox />
      </Box>
    </>
  );
};

export default FinishedRound;
