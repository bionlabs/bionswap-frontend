/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { Box, styled, Typography, linearProgressClasses, LinearProgress } from '@mui/material';
import { useRouter } from 'next/router';
import Countdown from './Countdown';
import { formatEther, formatUnits } from 'ethers/lib/utils';
import { BUSD_ADDRESS, USDT_ADDRESS, USDC_ADDRESS } from '@bionswap/core-sdk';
import { useSingleCallResult, useToken } from 'hooks';
import { usePresaleContract } from 'hooks/useContract';

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
    backgroundColor: theme.palette.success.main,
  },
}));

const Card: React.FC<ProjectItemProps> = ({ data }) => {
  const presaleContract = usePresaleContract(data?.saleAddress);
  const router = useRouter();
  const currentTime = +new Date();
  const startTime = data?.startTime * 1000;
  const endTime = data?.endTime * 1000;
  const quoteToken = useToken(data?.quoteToken);
  // const decimals = data?.isQuoteETH ? 18 : quoteToken?.decimals;
  const [decimals, setDecimals] = useState(18);
  const currentCap = formatUnits(useSingleCallResult(presaleContract, 'currentCap')?.result?.[0] || 0, decimals);
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
  }, [quoteToken, data]);

  console.log(data)

  return (
    <WrapBox
      onClick={() => {
        router.push(`/launchpad/${data?.saleAddress}`);
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '123px',

          img: {
            objectFit: 'cover',
          },
        }}
      >
        <img src={data?.banner} alt={data?.title} width="100%" height="100%" />
      </Box>
      <Status
        sx={{
          backgroundColor: 'gray.800',
          ...(currentTime > startTime && {
            backgroundColor: 'success.main',
          }),
          ...(currentTime > endTime && {
            backgroundColor: 'text.secondary',
          }),
        }}
      >
        <Typography
          variant="captionPoppins"
          sx={{
            color: 'background.paper',
            fontWeight: '500',
          }}
        >
          {currentTime < startTime ? 'Coming Soon' : currentTime < endTime ? 'Sale Open' : 'Sale Closed'}
        </Typography>
      </Status>
      <WrapTopArea>
        <WrapLogo>
          <img src={data?.logo} alt={data?.title} />
        </WrapLogo>
        <TimeLineBg>
          <Countdown endTime={endTime} startTime={startTime} />
        </TimeLineBg>
      </WrapTopArea>
      <FlexBox
        flexDirection="column"
        gap="20px"
        sx={{
          padding: '28px 15px 22px',
        }}
      >
        <FlexBox justifyContent="space-between" alignItems="center">
          <FlexBox flexDirection="column" gap="5px">
            {/* <Typography
              variant="captionPoppins"
              sx={{
                fontWeight: '400',
                color: '#717D8A',
              }}
            >
              {data?.saleType}
            </Typography> */}
            <Typography
              sx={{
                fontWeight: '600', fontSize: '24px', lineHeight: '1.2',
                color: 'text.primary',
              }}
            >
              {data?.title}
            </Typography>
            <Typography
              sx={{
                color: 'primary.main', lineHeight: '1.2',
                fontSize: '14px'
              }}
            >
              ${data?.tokenMetadata.symbol}
            </Typography>
          </FlexBox>
          <Box>
            <img
              src={`/icons/coins/${unit}.svg`}
              alt={unit}
              width="38px"
              height="38px"
            />
          </Box>
        </FlexBox>
        <BorderLinearProgress variant="determinate" value={linearProgress} />
        <FlexBox justifyContent="space-between">
          <Typography
            variant="caption6Poppins"
            sx={{
              fontWeight: '400',
              color: 'primary.main',
            }}
          >
            Total Goal
          </Typography>
          <Typography
            variant="caption6Poppins"
            sx={{
              fontWeight: '600',
              color: 'text.primary',
            }}
          >
            {formatUnits(data?.hardCap || 0, decimals || 0)} {unit}
          </Typography>
        </FlexBox>
        <FlexBox justifyContent="space-between">
          <Typography
            variant="caption6Poppins"
            sx={{
              fontWeight: '400',
              color: 'primary.main',
            }}
          >
            Allocation
          </Typography>
          <Typography
            variant="caption6Poppins"
            sx={{
              fontWeight: '600',
              color: 'text.primary',
            }}
          >
            {formatUnits(data?.minPurchase || 0, decimals)} {unit} - {formatUnits(data?.maxPurchase || 0, decimals)}{' '}
            {unit}
          </Typography>
        </FlexBox>
        <FlexBox gap="12px">
          <Tag
            sx={{
              backgroundColor: 'rgba(160, 236, 138, 0.15)',
            }}
          >
            <Typography
              variant="captionPoppins"
              sx={{
                fontWeight: '400',
                color: 'green.300',
              }}
            >
              Verified
            </Typography>
          </Tag>
          <Tag
            sx={{
              backgroundColor: 'rgba(154, 106, 255, 0.15)',
            }}
          >
            <Typography
              variant="captionPoppins"
              sx={{
                fontWeight: '400',
                color: '#9A6AFF',
              }}
            >
              Loved by Bionswap
            </Typography>
          </Tag>
        </FlexBox>
      </FlexBox>
    </WrapBox>
  );
};
const FlexBox = styled(Box)`
  display: flex;
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
  border: 2.75px solid ${(props) => (props.theme.palette as any).extra.card.background};
  background-color: ${(props) => (props.theme.palette as any).extra.card.background};
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
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
`;
const WrapTopArea = styled(Box)`
  margin-top: -38px;
`;
const TimeLineBg = styled(Box)`
  background: ${props => (props.theme.palette as any).extra.card.light};
  width: 100%;
  padding: 6px;
  margin-top: -50px;
`;
const Status = styled(Box)`
  position: absolute;
  padding: 4px 19px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  top: 13px;
  right: 13px;
`;
const Tag = styled(Box)`
  border-radius: 4px;
  padding: 1px 10px 3px;
`;

export default Card;
