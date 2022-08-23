import { Box, styled, Typography } from "@mui/material";
import SelectTokens from "../SelectTokens";

type Props = {};

const PairStats = (props: Props) => {
  return (
    <Box
      sx={{
        width: { xs: "65%", md: "100%" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: { xs: "20px", md: "83px" },
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box>
          <SelectTokens />
        </Box>
        <Box display="flex" gap="24px" alignItems='center'>
          <WrapItem>
            <Typography variant="body4Poppins" sx={{
              fontWeight: '400',
              color: 'gray.400'
            }}>
              24h Change
            </Typography>
            <Typography variant="body3Poppins" sx={{
              fontWeight: '400',
              color: '#2BB673'
            }}>
              +0.97%
            </Typography>
          </WrapItem>
          <Line />
          <WrapItem>
            <Typography variant="body4Poppins" sx={{
              fontWeight: '400',
              color: 'gray.400'
            }}>
              Liquidity
            </Typography>
            <Typography variant="body3Poppins" sx={{
              fontWeight: '400',
              color: 'text.primary'
            }}>
              $204.14K
            </Typography>
          </WrapItem>
          <Line />
          <WrapItem>
            <Typography variant="body4Poppins" sx={{
              fontWeight: '400',
              color: 'gray.400'
            }}>
              Total Supply
            </Typography>
            <Typography variant="body3Poppins" sx={{
              fontWeight: '400',
              color: 'text.primary'
            }}>
              500.000.000
            </Typography>
          </WrapItem>
        </Box>
      </Box>
      <Box mt="33px"></Box>
    </Box>
  );
};

const WrapItem = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const Line = styled(Box)`
  background: #2b3247;
  height: 40px;
  width: 1px;
`;

export default PairStats;
