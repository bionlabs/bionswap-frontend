/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useCallback } from 'react';
import { Box, styled, Typography, linearProgressClasses, LinearProgress, Stack, Skeleton } from '@mui/material';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Countdown from './Countdown';
import { formatEther, formatUnits } from 'ethers/lib/utils';
import { BUSD_ADDRESS, USDT_ADDRESS, USDC_ADDRESS } from '@bionswap/core-sdk';
import { useSingleCallResult, useToken } from 'hooks';
import { usePresaleContract } from 'hooks/useContract';
import {BsStarFill, BsStarHalf} from 'react-icons/bs'
import Image from 'next/image';

interface ProjectItemProps {
  data: any;
}

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: (theme.palette as any).extra.card.light,
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.primary.main,
  },
}));

const Card: React.FC<ProjectItemProps> = ({ data }) => {
  const presaleContract = usePresaleContract(data?.saleAddress);
  const router = useRouter();
  const currentTime = +new Date();
  const startTime = data?.startTime * 1000;
  const endTime = data?.endTime * 1000;
  const quoteToken = useToken(data?.quoteToken);

  const endedTime = new Date(endTime);
  // const decimals = data?.isQuoteETH ? 18 : quoteToken?.decimals;
  const [decimals, setDecimals] = useState(18);
  const getCurrentCap = useSingleCallResult(presaleContract, 'currentCap')?.result?.[0];
  const currentCap = formatUnits(getCurrentCap ?? 0, decimals);
  const linearProgress = (Number(currentCap) * 100) / Number(formatUnits(data?.hardCap || 0, decimals));

  const map = {
    [USDT_ADDRESS[data?.chainId]?.toLowerCase()]: 'USDT',
    [BUSD_ADDRESS[data?.chainId]?.toLowerCase()]: 'BUSD',
    [USDC_ADDRESS[data?.chainId]?.toLowerCase()]: 'USDC',
  };
  const unit = data?.isQuoteETH ? 'BNB' : map[data?.quoteToken];

  

  useEffect(() => {
    const handleCheckDecimal = () => {
      if (data?.isQuoteETH) {
        setDecimals(18);
      } else {
        setDecimals(quoteToken?.decimals || 9);
      }
    };

    handleCheckDecimal();
  }, [quoteToken, data, getCurrentCap, decimals]);

  return (
    <Link href={`/launchpad/${data?.saleAddress}`}>
      <WrapBox>
        {data ? (
          <Stack
            sx={{
              width: '100%',
              height: '180px',
              img: {
                objectFit: 'cover',
                borderRadius: '7px 7px 0 0'
              },
            }}
          >
            <img src={data?.banner} alt={data?.title} width="100%" height="100%" />
          </Stack>
        ) : (
          <Skeleton width="100%" height="180px" />
        )}

        <WrapTopArea>
          {data ? (
            <WrapLogo>
              <img src={data?.logo} alt={data?.title} />
            </WrapLogo>
          ) : (
            <Skeleton width="80px" height="80px" />
          )}

          <TimeLineBg>
            <Stack alignItems="end" width="100%" pr="10px">
              <Typography color="text.secondary" fontSize="12px">
                Ended in {endedTime.toLocaleString()}
              </Typography>
            </Stack>
          </TimeLineBg>
        </WrapTopArea>
        <FlexBox
          flexDirection="column"
          gap="20px"
          sx={{
            padding: '16px',
          }}
        >
          <Stack direction='row' width='100%' justifyContent="space-between" spacing={4}>
            <Stack alignItems="start" spacing={1}>
              <Typography
                sx={{
                  fontWeight: '700',
                  fontSize: '24px',
                  lineHeight: '1',
                  color: 'text.primary',
                }}
              >
                {data?.title}
              </Typography>
              <Typography
                sx={{
                  color: 'primary.main',
                  lineHeight: '1',
                  fontSize: '14px',
                }}
              >
                ${data?.tokenMetadata.symbol}
              </Typography>
            </Stack>
            <Box>
              <Image
                src={`/icons/coins/${unit}.svg`}
                alt={unit}
                width="38px"
                height="38px"
              />
            </Box>
          </Stack>
          <Stack width='100%' alignItems='start' spacing={1}>
            <FlexBox justifyContent="space-between">
              <Typography
                sx={{
                  fontSize: '14px',
                  color: 'text.secondary',
                }}
              >
                Total Goal
              </Typography>
              <Typography
                sx={{
                  fontWeight: '600',
                  fontSize: '14px',
                  color: 'text.primary',
                }}
              >
                {data?.fHardCap.toFixed(2) ?? 0} {unit}
              </Typography>
            </FlexBox>
            <FlexBox justifyContent="space-between">
              <Typography
                sx={{
                  fontSize: '14px',
                  color: 'text.secondary',
                }}
              >
                Total Raised
              </Typography>
              <Typography
                sx={{
                  fontWeight: '600',
                  fontSize: '14px',
                  color: 'text.primary',
                }}
              >
                {currentCap} {unit}
              </Typography>
            </FlexBox>
          </Stack>
          <Stack width='100%' direction='row' justifyContent='start'>
            <Status
              sx={{
                backgroundColor: (theme) => (theme.palette as any).extra.button.backgroundGreenOpacity,
                color: 'primary.main',
                ...(currentTime > startTime && {
                  backgroundColor: 'extra.button.backgroundGreenOpacity',
                  color: 'primary.main',
                }),
                ...(currentTime > endTime && {
                  backgroundColor: (theme) => (theme.palette as any).extra.card.hover,
                  color: 'text.secondary',
                }),
              }}
            >
              <Typography
                sx={{
                  color: 'inherit',
                  fontWeight: '500',
                  fontSize: '10px',
                }}
              >
                {currentTime < startTime ? 'Coming Soon' : currentTime < endTime ? 'Sale Open' : 'Sale Closed'}
              </Typography>
            </Status>
          </Stack>
        </FlexBox>
      </WrapBox>
    </Link>
  );
};
const FlexBox = styled(Box)`
  display: flex;
  width: 100%;
`;
const WrapBox = styled(Box)`
  border-radius: 8px;
  background-color: ${(props) => (props.theme.palette as any).extra.card.background};
  width: 100%;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: 0.15s ease-in;

  :hover {
    transform: scale3d(1.01, 1.01, 1);
    transform-style: preserve-3d;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }
`;
const WrapLogo = styled(Box)`
  border: 5px solid ${(props) => (props.theme.palette as any).extra.card.background};
  background-color: ${(props) => (props.theme.palette as any).background.default};
  border-radius: 8px;
  position: relative;
  max-width: 88px;
  width: 100%;
  height: 100%;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 15px;

  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 8px;
  }
`;
const WrapTopArea = styled(Box)`
  margin-top: -30px;
  margin-bottom: 25px;
`;
const TimeLineBg = styled(Box)`
  background: ${(props) => (props.theme.palette as any).extra.card.light};
  width: 100%;
  padding: 6px;
  margin-top: -60px;
`;
const Status = styled(Box)`
  padding: 4px 12px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  max-width: 100px;
`;

export default Card;
