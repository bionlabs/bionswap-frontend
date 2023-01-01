/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { Box, styled, Typography, linearProgressClasses, LinearProgress, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { formatUnits } from 'ethers/lib/utils';
import { BUSD_ADDRESS, USDT_ADDRESS, USDC_ADDRESS } from '@bionswap/core-sdk';
import { useSingleCallResult, useToken } from 'hooks';
import { usePresaleContract } from 'hooks/useContract';

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
        <BannerBox
          sx={{
            backgroundImage: `url(${data?.banner})`,
          }}
        />
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

        <WrapDetail alignItems="start">
          <Stack direction="row" width="100%" justifyContent="start" spacing={2} alignItems="center">
            <WrapTopArea>
              <WrapLogo>
                <img src={data?.logo} alt={data?.title} />
              </WrapLogo>
            </WrapTopArea>
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
              <Typography fontSize="12px" color="text.secondary" lineHeight={1}>
                ${data?.tokenMetadata.symbol} token
              </Typography>
            </Stack>
            {/* <Box>
              <Image src={`/icons/coins/${unit}.svg`} alt={unit} width="20px" height="20px" />
            </Box> */}
          </Stack>
          <Stack spacing={1} width="100%" alignItems="start">
            <Stack direction="row" width="100%" justifyContent="space-between">
              <Typography fontSize="14px" color="text.secondary">
                Current raised:
              </Typography>
              <Typography fontWeight={500} fontSize="14px">
                {linearProgress}%
              </Typography>
            </Stack>

            <BorderLinearProgress variant="determinate" value={linearProgress} />
          </Stack>
          <Stack width="100%" alignItems="start" spacing={1}>
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
  width: 100%;
  height: 120px;
  object-fit: cover;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  border-top: 1px solid ${(props) => (props.theme.palette as any).extra.card.divider};
  border-right: 1px solid ${(props) => (props.theme.palette as any).extra.card.divider};
  border-left: 1px solid ${(props) => (props.theme.palette as any).extra.card.divider};
  border-radius: 8px 8px 0 0;
`;
const WrapDetail = styled(Stack)`
  border-left: 1px solid ${(props) => (props.theme.palette as any).extra.card.divider};
  border-right: 1px solid ${(props) => (props.theme.palette as any).extra.card.divider};
  width: 100%;
  gap: 20px;
  padding: 16px;
`;
const WrapLogo = styled(Box)`
  // border: 4px solid ${(props) => (props.theme.palette as any).extra.card.background};
  // background-color: ${(props) => (props.theme.palette as any).background.default};
  border-radius: 8px;
  position: relative;
  width: fit-content;
  // margin-left: 12px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 6px;
  }
`;
const WrapTopArea = styled(Box)`
  // margin-top: -38px;
  // margin-bottom: 15px;
`;
const TimeLineBg = styled(Stack)`
  background: ${(props) => (props.theme.palette as any).extra.card.light};
  width: 100%;
  height: auto;
  padding: 10px 16px;
  border-bottom: 1px solid ${(props) => (props.theme.palette as any).extra.card.divider};
  border-right: 1px solid ${(props) => (props.theme.palette as any).extra.card.divider};
  border-left: 1px solid ${(props) => (props.theme.palette as any).extra.card.divider};
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
const Footer = styled(Stack)`
  width: 100%;
  border-top: 1px solid ${(props) => (props.theme.palette as any).extra.card.divider};
  padding: 10px 0 0;
  justify-content: start;
`;

export default Card;
