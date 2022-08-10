import { Box, styled } from "@mui/material";
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
          <TokenValue mt="4px">$0.503</TokenValue>
        </Box>
        <Box display="flex" gap="24px">
          <WrapItem>
            <Title>24h Change</Title>
            <Value sx={{ color: "#2BB673 !important" }}>+0.97%</Value>
          </WrapItem>
          <Line />
          <WrapItem>
            <Title>Liquidity</Title>
            <Value>$204.14K</Value>
          </WrapItem>
          <Line />
          <WrapItem>
            <Title>Total Supply</Title>
            <Value>500.000.000</Value>
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
  gap: 4px;
`;
const Title = styled(Box)`
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: #a8b0b9;
`;
const Value = styled(Box)`
  font-family: "Poppins", sans-serif;
  color: #ffffff;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
`;
const Line = styled(Box)`
  background: #2b3247;
  height: 36px;
  width: 1px;
`;
const TokenValue = styled(Box)`
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 18px;
  color: #00eaff;
`;

export default PairStats;
