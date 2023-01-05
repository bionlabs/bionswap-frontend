import { Box, linearProgressClasses, LinearProgress, Button, styled, Typography, Stack } from '@mui/material';
import CountDownTime from './CountDownTime';
import { formatUnits } from 'ethers/lib/utils';
import { useSingleCallResult } from 'hooks/useCall';
import JoinIdoModal from 'components/JoinIdoModal';
import React, { useEffect, useState } from 'react';
import { useChain } from 'hooks';
import Link from 'next/link';
import useMediaQuery from 'hooks/useMediaQuery';
import { nFormatter } from 'utils/format';
import Image from 'next/image';

interface FundraiseAreaProps {
  data: any;
  token: any;
  quoteToken: any;
  presaleContract: any;
}

// const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
//   height: 10,
//   width: '100%',
//   borderRadius: 5,
//   [`&.${linearProgressClasses.colorPrimary}`]: {
//     backgroundColor: (theme.palette as any).extra.card.hover,
//   },
//   [`& .${linearProgressClasses.bar}`]: {
//     borderRadius: 5,
//     backgroundColor: 'success.main',
//   },
// }));

const FundraiseArea: React.FC<FundraiseAreaProps> = ({ data, token, quoteToken, presaleContract }) => {
  const [openModal, setOpenModal] = useState(false);
  const {isMobile, isTablet, isDesktop} = useMediaQuery();
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
      <Box
        sx={{
          display: 'grid', width: '100%',
          gridTemplateColumns: isDesktop ? '1fr' : '7fr 4fr',
          gap: '20px'
        }}
      >
        <ImageContainer>
          <ImagePositioningBox/>
          <ImageBox>
            <Image
              src={data?.banner}
              alt={data?.title}
              fill
            />
          </ImageBox>
        </ImageContainer>
        <WrapInfoBox
          sx={{
            maxWidth: '100%',
          }}
        >
          <Stack alignItems='start' spacing={1}>
            <Typography color='text.secondary'>
              Fundraise Goal
            </Typography>
            <Typography fontSize='40px' color="text.primary" fontWeight="700" sx={{textShadow: 'rgb(255 255 255 / 30%) 0px 0px 12px'}} lineHeight='1'>
              {nFormatter(formatUnits(data?.hardCap || 0, decimals))} {unit}
            </Typography>
          </Stack>
          <Stack alignItems='start' spacing={1} width='100%'>
            <Stack
              direction={ isMobile ? 'column' : 'row' }
              justifyContent="space-between"
              alignItems='baseline'
              width='100%'
            >
              <Typography fontSize='16px' color="text.secondary">
                Max Allocation
              </Typography>
              {/* <Typography fontSize='19px' color="text.primary">
                {formatUnits(data?.minPurchase || 0, decimals)} {unit} - {formatUnits(data?.maxPurchase || 0, decimals)}{' '}
                {unit}
              </Typography> */}
              <Typography fontSize='19px' color="text.primary">
                {nFormatter(formatUnits(data?.maxPurchase || 0, decimals))}{' '}
                {unit}
              </Typography>
            </Stack>
            <Stack
              direction={ isMobile ? 'column' : 'row' }
              justifyContent="space-between"
              alignItems='baseline'
              width='100%'
            >
              <Typography fontSize='16px' color="text.secondary">
                Price per token
              </Typography>
              <Typography fontSize='19px' color="text.primary">
                {nFormatter(formatUnits(data?.price || 0, decimals))} {unit}
              </Typography>
            </Stack>
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
            <Stack
              direction={ isMobile ? 'column' : 'row' }
              justifyContent="space-between"
              alignItems='baseline'
              width='100%'
            >
              <Typography fontSize='16px' color="text.secondary">
                Current raised
              </Typography>
              <Typography fontSize='19px' color="text.primary">
                {nFormatter(currentCap)} {unit}
              </Typography>
            </Stack>
            {/* <BorderLinearProgress variant="determinate" value={linearProgress} /> */}
          </Stack>
          <FlexBox>
            {startTime > currentTime ? (
              <JoinButton variant='contained' disabled>
                Not Available
              </JoinButton>
            ) : Number(yourPurchased) !== 0 ? ( 
              <Link href={'/dashboard/allocation'}>
                <JoinButton variant='contained'>
                  View your allocation
                  <img src="/images/arrow_forward.png" alt="arrow_forward" width="20px" />
                </JoinButton>
              </Link>
            ) : currentTime > endTime ? (
              <Link href={`/swap?inputCurrency=ETH&outputCurrency=${token?.address}`}>
                <JoinButton
                  variant='contained'
                >
                  View ${token?.symbol} on Bionswap
                </JoinButton>
              </Link>
            ) : whitelisteds && data?.isWhitelistEnabled ? (
              <JoinButton disabled variant='contained'>
                You are not whitelisted
              </JoinButton>
            ) : (
              <JoinButton
                variant='contained'
                onClick={handleOpenModal}
                sx={{
                  background: theme => (theme.palette as any).extra.button.linear,
                  transition: '0.12s ease-in'
                }}
              >
                Join Now
              </JoinButton>
            )}
          </FlexBox>
          <Box>
            <CountDownTime endTime={endTime} startTime={startTime} />
          </Box>
        </WrapInfoBox>
      </Box>
      <JoinIdoModal data={data} open={openModal} onDismiss={handleCloseModal} unit={unit} currentCap={currentCap} />
    </>
  );
};

const FlexBox = styled(Box)`
  display: flex;
`;
const WrapInfoBox = styled(Box)`
  padding: 32px;
  background-color: ${(props) => (props.theme.palette as any).extra.card.background};
  border: 1px solid ${(props) => (props.theme.palette as any).extra.card.divider};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 30px;
`;

const JoinButton = styled(Button)`
  border-radius: 8px;
  width: 100%;
  text-align: center;
  padding: 12px 25px;
  gap: 5px;
`;
const ImageContainer = styled(Box)`
  box-sizing: border-box;
  display: block;
  overflow: hidden;
  width: initial;
  height: initial;
  background: none;
  opacity: 1;
  border: 0px;
  margin: 0px;
  padding: 0px;
  position: relative;
`
const ImagePositioningBox = styled(Box)`
  box-sizing: border-box;
  display: block;
  width: 100%;
  height: initial;
  background: none;
  opacity: 1;
  border: 0px;
  margin: 0px;
  padding: 56.1358% 0px 0px;
`
const ImageBox = styled(Box)`
  img {
    position: absolute;
    inset: 0px;
    box-sizing: border-box;
    padding: 0px;
    border: none;
    margin: auto;
    display: block;
    width: 0px;
    height: 0px;
    min-width: 100%;
    max-width: 100%;
    min-height: 100%;
    max-height: 100%;
    object-fit: cover;
    border-radius: 8px;
    aspect-ratio: 16 / 9;
    border: 1px solid ${props => (props.theme.palette as any).extra.card.divider};
  }
`

export default FundraiseArea;
