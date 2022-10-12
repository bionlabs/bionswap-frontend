import { Box, linearProgressClasses, LinearProgress, Button, styled, Typography } from '@mui/material';
import CountDownTime from './CountDownTime';
import { formatUnits } from 'ethers/lib/utils';
import { useSingleCallResult } from 'hooks/useCall';
import JoinIdoModal from 'components/JoinIdoModal';
import React, { useEffect, useState } from 'react';
import { useChain } from 'hooks';

interface FundraiseAreaProps {
  data: any;
  token: any;
  quoteToken: any;
  presaleContract: any;
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

const FundraiseArea: React.FC<FundraiseAreaProps> = ({ data, token, quoteToken, presaleContract }) => {
  const [openModal, setOpenModal] = useState(false);
  const { account } = useChain();
  const [decimals, setDecimals] = useState(18)
  const currentCap = formatUnits(useSingleCallResult(presaleContract, 'currentCap')?.result?.[0] || 0, decimals);
  const yourPurchased = formatUnits(useSingleCallResult(presaleContract, 'purchaseDetails', [account])?.result?.[1] || 0, decimals)
  const startTime = data?.startTime * 1000;
  const endTime = data?.endTime * 1000;
  const linearProgress = (Number(currentCap) * 100) / Number(formatUnits(data?.hardCap || 0, decimals));
  const unit = data?.isQuoteETH ? 'BNB' : quoteToken?.symbol;
  const currentTime = +new Date();

  const handleOpenModal = () => setOpenModal(true);

  const handleCloseModal = () => setOpenModal(false);

  useEffect(() => {
    const handleCheckDecimal = () => {
      if (data?.isQuoteETH) {
        setDecimals(18);
      } else {
        setDecimals(quoteToken?.decimals || 9);
      }
    };

    handleCheckDecimal();
  }, [quoteToken, data]);

  return (
    <>
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
          <BorderLinearProgress variant="determinate" value={linearProgress} />
          <FlexBox flexDirection="column">
            <Typography variant="h0Poppins" color="gray.50" fontWeight="600">
              {currentCap} {unit}
            </Typography>
            <Typography variant="body2Poppins" color="primary.main" fontWeight="400">
              Pledged of {formatUnits(data?.hardCap || 0, decimals)} {unit} goal
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
                {formatUnits(data?.minPurchase || 0, decimals)} {unit} - {formatUnits(data?.maxPurchase || 0, decimals)} {unit}
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
                1 {token?.symbol} = {formatUnits(data?.price || 0, decimals)} {unit}
              </Typography>
            </FlexBox>
            {/* <FlexBox
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
            </FlexBox> */}
          </FlexBox>
          <Line />
          <FlexBox>
            <JoinButton disabled={currentTime < startTime || currentTime > endTime || currentCap === data?.hardCap || Number(yourPurchased) !== 0}
                        onClick={handleOpenModal}
                        sx={{
                          backgroundColor: 'success.main',
                          ...((currentTime < startTime || currentTime > endTime || currentCap === data?.hardCap || Number(yourPurchased) !== 0) && {
                            backgroundColor: 'gray.200',
                          })
                        }}>
              <Typography variant="body3Poppins" color="#000000" fontWeight="600">
                {currentTime < startTime || currentTime > endTime || currentCap === data?.hardCap || Number(yourPurchased) !== 0 ? 'Not Available' : 'Join IDO Now!'}
              </Typography>
            </JoinButton>
          </FlexBox>
          <Box>
            <CountDownTime endTime={endTime} startTime={startTime} />
          </Box>
        </WrapInforBox>
      </FlexBox>
      <JoinIdoModal data={data} open={openModal} onDismiss={handleCloseModal} unit={unit} currentCap={currentCap} />
    </>
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
  border-radius: 4px;
  width: 100%;
  text-align: center;
  padding: 8px;
`;

export default FundraiseArea;
