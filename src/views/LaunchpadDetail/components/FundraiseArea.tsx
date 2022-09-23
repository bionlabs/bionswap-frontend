import * as React from 'react';
import { Box, linearProgressClasses, LinearProgress, Button, styled, Typography } from '@mui/material';
import PrimaryButton from 'components/PrimaryButton';
import CountDownTime from './CountDownTime';
import { usePresaleContract } from 'hooks/useContract';
import { formatEther } from 'ethers/lib/utils';

interface FundraiseAreaProps {
  data: any;
  slug: string;
  unit: string;
  tokenContract: any;
}

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#F1F1F1',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#1C7744',
  },
}));

const FundraiseArea: React.FC<FundraiseAreaProps> = ({ data, slug, unit, tokenContract }) => {
  const presaleValue = usePresaleContract(slug);
  console.log('🚀 ~ file: FundraiseArea.tsx ~ line 26 ~ presaleValue', presaleValue);

  return (
    <FlexBox
      sx={{
        flexDirection: { xs: 'column', md: 'row' },
        gap: { xs: '20px', lg: '50px' },
      }}
    >
      <Box
        sx={{
          width: '100%',
          borderRadius: '8px',
          overflow: 'hidden',
          height: '560px',
        }}
      >
        <Box
          width="100%"
          height="100%"
          component="img"
          src={data?.banner}
          alt={data?.title}
          sx={{
            objectFit: 'cover',
          }}
        />
      </Box>
      <WrapInforBox
        sx={{
          maxWidth: { xs: '100%', md: '365px', lg: '430px' },
        }}
      >
        <BorderLinearProgress variant="determinate" value={70} />
        <FlexBox flexDirection="column">
          <Typography variant="h0Poppins" color="gray.50" fontWeight="600">
            46,800 {unit}
          </Typography>
          <Typography variant="body2Poppins" color="primary.main" fontWeight="400">
            Pledged of {formatEther(data?.hardCap || 0)} {unit} goal
          </Typography>
        </FlexBox>
        <FlexBox flexDirection="column" gap="15px">
          <FlexBox
            justifyContent="space-between"
            sx={{
              flexDirection: { xs: 'column', sm: 'row' },
            }}
          >
            <Typography variant="h6Poppins" color="gray.400" fontWeight="400">
              Allocation
            </Typography>
            <Typography variant="h6Poppins" color="gray.200" fontWeight="400">
              {formatEther(data?.minPurchase || 0)} {unit} - {formatEther(data?.maxPurchase || 0)} {unit}
            </Typography>
          </FlexBox>
          <FlexBox
            justifyContent="space-between"
            sx={{
              flexDirection: { xs: 'column', sm: 'row' },
            }}
          >
            <Typography variant="h6Poppins" color="gray.400" fontWeight="400">
              Price per token
            </Typography>
            <Typography variant="h6Poppins" color="gray.200" fontWeight="400">
              1 {tokenContract?.symbol} = {formatEther(data?.listingPrice || 0)} {unit}
            </Typography>
          </FlexBox>
          <FlexBox
            justifyContent="space-between"
            sx={{
              flexDirection: { xs: 'column', sm: 'row' },
            }}
          >
            <Typography variant="h6Poppins" color="gray.400" fontWeight="400">
              Participaters
            </Typography>
            <Typography variant="h6Poppins" color="gray.200" fontWeight="400">
              320
            </Typography>
          </FlexBox>
        </FlexBox>
        <Line />
        <FlexBox>
          <JoinButton>
            <Typography variant="body3Poppins" color="#000000" fontWeight="600">
              Join IDO Now!
            </Typography>
          </JoinButton>
        </FlexBox>
        <Box>
          <CountDownTime endTime={data?.endTime} startTime={data?.startTime} />
        </Box>
      </WrapInforBox>
    </FlexBox>
  );
};

const FlexBox = styled(Box)`
  display: flex;
`;
const WrapInforBox = styled(Box)`
  padding: 16px;
  background-color: ${(props) => props.theme.palette.gray[900]};
  border-radius: 8px;
  border: 1px solid;
  border-color: ${(props) => props.theme.palette.gray[700]};
  gap: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const Line = styled(Box)`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.palette.gray[800]};
`;
const JoinButton = styled(Button)`
  background: #2bb673;
  border-radius: 4px;
  width: 100%;
  text-align: center;
  padding: 8px;
`;

export default FundraiseArea;
