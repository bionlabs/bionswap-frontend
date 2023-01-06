import { MobileProp } from 'configs/Type/Mobile/type';
import React from 'react';
import { Box, Button, Stack, styled, Typography } from '@mui/material';
import Card from '../../components/Card';
import { useRouter } from 'next/router';

const FundSection = ({ isMobile }: MobileProp) => {
  const router = useRouter();
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        width: '100%',
      }}
    >
      <Stack alignItems="start">
        <Typography variant="h5Samsung">Fund Your Account</Typography>
        <Typography variant="caption6Poppins" sx={{ color: 'gray.400' }}>
          Get BION for multiple profits. Find a method that suits you the most.
        </Typography>
      </Stack>
      <Row>
        <Box>
          <Box>
            <Typography variant="body3Poppins">Buy Token</Typography>
          </Box>
          <Box>
            <Typography variant="captionPoppins" color="text.secondary">
              Get token with the best price.
            </Typography>
          </Box>
        </Box>
        <BuyButton
          variant="contained"
          onClick={(e) => {
            e.preventDefault();
            router.push('/swap');
          }}
        >
          Buy
        </BuyButton>
      </Row>
      <Row>
        <Box>
          <Box>
            <Typography variant="body3Poppins">Get sBION</Typography>
          </Box>
          <Box>
            <Typography variant="captionPoppins" color="text.secondary">
              Audit DAO Governance Credit provide you more power.
            </Typography>
          </Box>
        </Box>
        <StyledButton variant="contained" disabled>
          Stake
        </StyledButton>
      </Row>
      <Row>
        <Box>
          <Box>
            <Typography variant="body3Poppins">Get Game Ticket</Typography>
          </Box>
          <Box>
            <Typography variant="captionPoppins" color="text.secondary">
              Buy ticket and get super multiply profit.
            </Typography>
          </Box>
        </Box>
        <StyledButton variant="contained" disabled>
          Buy
        </StyledButton>
      </Row>
    </Card>
  );
};

const Row = styled(Box)`
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: space-between;
`;

const BuyButton = styled(Button)`
  height: fit-content;
  transition: 0.12s ease-in;
  width: 100px;
  :hover {
    background-color: ${(prop) => prop.theme.palette.primary.main};
    opacity: 0.8;
  }
`;
const StyledButton = styled(Button)`
  height: fit-content;
  transition: 0.12s ease-in;
  font-weight: 400;
  width: 100px;
`;

export default FundSection;
