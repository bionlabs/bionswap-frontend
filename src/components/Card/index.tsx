/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { Box, styled, Typography, linearProgressClasses, LinearProgress, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { formatUnits } from 'ethers/lib/utils';
import { BUSD_ADDRESS, USDT_ADDRESS, USDC_ADDRESS } from '@bionswap/core-sdk';
import { useSingleCallResult, useToken } from 'hooks';
import { usePresaleContract } from 'hooks/useContract';
import { nFormatter } from 'utils/format';
import Image from 'next/image';
import useMediaQuery from 'hooks/useMediaQuery';

interface ProjectItemProps {
  data: any;
}

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  width: '100%',
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
  const {isMobile} = useMediaQuery();
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
    <Link href={`/launchpad/${data?.saleAddress}`} legacyBehavior>
      <WrapBox>
        <Stack
          sx={{
            width: '100%',
            height: '100%',
            position: 'relative',
            objectFit: 'cover',
          }}
        >
          <BannerBox />
          <BannerImage>
            <Image src={data?.banner} alt="" fill />
          </BannerImage>
          {/* <ShadeBox/> */}
        </Stack>
        <Status
          sx={{
            backgroundColor: 'primary.main',
            color: '#FFF',
            ...(currentTime > startTime && {
              backgroundColor: 'success.main',
              color: '#FFF',
            }),
            ...(currentTime > endTime && {
              backgroundColor: (theme) => (theme.palette as any).extra.card.disable,
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
        <WrapTopArea>
          <WrapLogo>
            <img src={data?.logo} alt={data?.title} />
          </WrapLogo>
        </WrapTopArea>
        <WrapDetail alignItems="start">
          <Stack direction="row" width="100%" spacing={2} justifyContent="space-between" alignItems='start'>
            <Stack alignItems="start">
              <Typography
                sx={{
                  fontWeight: '700',
                  fontSize: isMobile ? '24px' :  '28px',
                  lineHeight: '1',
                  color: 'text.primary',
                }}
              >
                {data?.title}
              </Typography>
              <Typography fontSize="14px" color="primary.main" fontWeight={500}>
                ${data?.tokenMetadata.symbol}
              </Typography>
            </Stack>
            <Box>
              <Image src={`/icons/coins/${unit}.svg`} alt={unit} width={30} height={30} />
            </Box>
          </Stack>
          <Stack spacing={1} width="100%" alignItems="start">
            <Stack direction="row" width="100%" justifyContent="space-between">
              <Typography color="text.secondary">
                Current raised:
              </Typography>
              <Typography fontWeight={500}>
                {linearProgress}%
              </Typography>
            </Stack>

            <BorderLinearProgress variant="determinate" value={linearProgress} />
          </Stack>
          <Stack width="100%" alignItems="start" spacing={1}>
            <FlexBox justifyContent="space-between">
              <Typography
                sx={{
                  color: 'text.secondary',
                }}
              >
                Total Goal
              </Typography>
              <Typography
                sx={{
                  fontWeight: '600',
                  color: 'text.primary',
                }}
              >
                {nFormatter(data?.fHardCap.toFixed(2) ?? 0)} {unit}
              </Typography>
            </FlexBox>
            <FlexBox justifyContent="space-between">
              <Typography
                sx={{
                  color: 'text.secondary',
                }}
              >
                Total Raised
              </Typography>
              <Typography
                sx={{
                  fontWeight: '600',
                  color: 'text.primary',
                }}
              >
                {nFormatter(currentCap)} {unit}
              </Typography>
            </FlexBox>
          </Stack>
          {/* <Footer direction="row">
            <VerifiedTag>Verified</VerifiedTag>
          </Footer> */}
        </WrapDetail>
        <TimeLineBg>
          <Stack alignItems="end" width="100%">
            <Typography color="text.secondary" fontSize="12px" lineHeight={1}>
              Ended in: {endedTime.toUTCString()}
            </Typography>
          </Stack>
        </TimeLineBg>
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
  box-shadow: ${(props) => (props.theme.palette as any).extra.card.boxShadow};
  border: 1px solid ${(props) => (props.theme.palette as any).extra.card.divider};
  width: 100%;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: 0.15s ease-in;
  :hover {
    transform: scale3d(1.01, 1.01, 1);
    transform-style: preserve-3d;
  }
`;
const BannerBox = styled(Box)`
  display: block;
  width: initial;
  height: initial;
  background: none;
  opacity: 1;
  margin: 0px;
  padding: 50% 0px 0px;
`;
const WrapDetail = styled(Stack)`
  width: 100%;
  gap: 15px;
  padding: 16px 20px;
`;
const WrapLogo = styled(Box)`
  border: 4px solid ${(props) => (props.theme.palette as any).extra.card.background};
  background-color: ${(props) => (props.theme.palette as any).background.default};
  border-radius: 50%;
  position: relative;
  width: 88px;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 50%;
  }
`;
const WrapTopArea = styled(Box)`
  margin-top: -46px;
  margin-left: 16px;
`;
const TimeLineBg = styled(Stack)`
  background: ${(props) => (props.theme.palette as any).extra.card.light};
  width: 100%;
  height: auto;
  padding: 10px 16px;
  border-radius: 0 0 8px 8px;
`;
const Status = styled(Box)`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 4px 12px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  max-width: 100px;
`;
const BannerImage = styled(Box)`
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
  }
`;
const ShadeBox = styled(Box)`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(9, 11, 20, 0.3) 0%, rgba(11, 14, 19, 0) 30.22%);
`

export default Card;
