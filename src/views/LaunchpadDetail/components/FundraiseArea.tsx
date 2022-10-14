import { Box, linearProgressClasses, LinearProgress, Button, styled, Typography } from '@mui/material';
import CountDownTime from './CountDownTime';
import { formatUnits } from 'ethers/lib/utils';
import { useSingleCallResult } from 'hooks/useCall';
import JoinIdoModal from 'components/JoinIdoModal';
import React, { useEffect, useState } from 'react';
import { useChain } from 'hooks';
import Link from 'next/link';

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
    backgroundColor: '#000A0D',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#22EB8A',
  },
}));

const FundraiseArea: React.FC<FundraiseAreaProps> = ({ data, token, quoteToken, presaleContract }) => {
  const [openModal, setOpenModal] = useState(false);
  const { account } = useChain();
  const [decimals, setDecimals] = useState(18);
  const currentCap = formatUnits(useSingleCallResult(presaleContract, 'currentCap')?.result?.[0] || 0, decimals);
  const yourPurchased = formatUnits(
    useSingleCallResult(presaleContract, 'purchaseDetails', [account])?.result?.[1] || 0,
    decimals,
  );
  const whitelisteds = useSingleCallResult(presaleContract, 'whitelisteds', [account])?.result?.[0] || false;
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
                {formatUnits(data?.minPurchase || 0, decimals)} {unit} - {formatUnits(data?.maxPurchase || 0, decimals)}{' '}
                {unit}
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
                {formatUnits(data?.price || 0, decimals)} {unit}
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
            {startTime > currentTime ? (
              <JoinButton disabled sx={{ backgroundColor: 'gray.200' }}>
                <Typography variant="body3Poppins" color="gray.400" fontWeight="600">
                  Not Available
                </Typography>
              </JoinButton>
            ) : Number(yourPurchased) !== 0 ? (
              <Link href={'/dashboard/allocation'}>
                <JoinButton sx={{ backgroundColor: 'primary.main', '&:hover': { backgroundColor: 'primary.main' } }}>
                  <Typography variant="body3Poppins" color="#000000" fontWeight="600">
                    View your allocation
                  </Typography>
                  <img src="/images/arrow_forward.png" alt="arrow_forward" width="20px" />
                </JoinButton>
              </Link>
            ) : currentTime > endTime ? (
              <Link href={`/swap?inputCurrency=ETH&outputCurrency=${token?.address}`}>
                <JoinButton sx={{ backgroundColor: 'primary.main', '&:hover': { backgroundColor: 'primary.main' } }}>
                  <Typography variant="body3Poppins" color="#000000" fontWeight="600">
                    View {token?.symbol} on Bionswap
                  </Typography>
                  <img src="/images/arrow_forward.png" alt="arrow_forward" width="20px" />
                </JoinButton>
              </Link>
            ) : whitelisteds && data?.isWhitelistEnabled ? (
              <JoinButton disabled sx={{ backgroundColor: 'gray.200' }}>
                <Typography variant="body3Poppins" color="gray.400" fontWeight="600">
                  You are not whitelisted
                </Typography>
              </JoinButton>
            ) : (
              <JoinButton
                onClick={handleOpenModal}
                sx={{ backgroundColor: 'success.main', '&:hover': { backgroundColor: 'success.main' } }}
              >
                <Typography variant="body3Poppins" color="#000000" fontWeight="600">
                  Join IDO Now!
                </Typography>
              </JoinButton>
            )}
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
  gap: 5px;
`;

export default FundraiseArea;
