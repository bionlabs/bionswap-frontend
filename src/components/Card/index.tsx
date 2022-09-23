/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Box, styled, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import Countdown from './Countdown';
import { formatEther } from 'ethers/lib/utils'
import { BUSD_ADDRESS, USDT_ADDRESS, USDC_ADDRESS } from '@bionswap/core-sdk';

interface ProjectItemProps {
  data: any;
}

const Card: React.FC<ProjectItemProps> = ({ data }) => {
  const router = useRouter();
  const currentTime = +new Date();

  const map = {
    [USDT_ADDRESS[data?.chainId]]: "USDT",
    [BUSD_ADDRESS[data?.chainId]]: "BUSD",
    [USDC_ADDRESS[data?.chainId]]: "USDC",
  }
  const unit = data?.isQuoteETH ? 'BNB' : map[data?.quoteToken]

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
          backgroundColor: 'gray.500',
          ...(currentTime < data?.startTime && {
            backgroundColor: 'gray.800',
          }),
          ...(currentTime < data?.endTime && {
            backgroundColor: '#08878E',
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
          {currentTime < data?.startTime ? 'Coming Soon' : currentTime < data?.endTime ? 'Sale Open' : 'Sale Closed'}
        </Typography>
      </Status>
      <WrapTopArea>
        <WrapLogo>
          <img src={data?.logo} alt={data?.title} width="57px" height="57px" />
        </WrapLogo>
        <TimeLineBg>
          <Countdown endTime={data?.endTime} startTime={data?.startTime} />
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
            <Typography
              variant="captionPoppins"
              sx={{
                fontWeight: '400',
                color: 'extra.other.twelfth',
              }}
            >
              {data?.saleType}
            </Typography>
            <Typography
              variant="h5Samsung"
              sx={{
                fontWeight: '700',
                color: 'background.paper',
              }}
            >
              {data?.title}
            </Typography>
          </FlexBox>
          <Box>
            <img
              src="/icons/coins/0x8301f2213c0eed49a7e28ae4c3e91722919b8b47.svg"
              alt="0x8301f2213c0eed49a7e28ae4c3e91722919b8b47.svg"
              width="38px"
              height="38px"
            />
          </Box>
        </FlexBox>
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
            {formatEther(data?.hardCap || 0)} {unit}
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
            {formatEther(data?.minPurchase)} {unit} - {formatEther(data?.maxPurchase)} {unit}
          </Typography>
        </FlexBox>
        <Line />
        <FlexBox gap="12px">
          <Tag
            sx={{
              backgroundColor: 'extra.other.fourteenthOpacity',
            }}
          >
            <Typography
              variant="captionPoppins"
              sx={{
                fontWeight: '400',
                color: 'extra.other.fourteenth',
              }}
            >
              Verified
            </Typography>
          </Tag>
          <Tag
            sx={{
              backgroundColor: 'extra.other.fifteenthOpacity',
            }}
          >
            <Typography
              variant="captionPoppins"
              sx={{
                fontWeight: '400',
                color: 'extra.other.fifteenth',
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
  background: ${(props) => (props.theme.palette as any).extra.other.nineth};
  width: 100%;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: 0.15s ease-in;
  border: 1px solid ${(props) => (props.theme.palette as any).extra.other.tenth};

  :hover {
    transform: scale3d(0.99, 0.99, 1);
    transform-style: preserve-3d;
  }
`;
const WrapLogo = styled(Box)`
  border: 2.75px solid ${(props) => (props.theme.palette as any).extra.other.nineth};
  background: linear-gradient(180deg, #008a61 0%, #033039 100%);
  border-radius: 8px;
  transform: matrix(-1, 0, 0, 1, 0, 0);
  max-width: 88px;
  width: 100%;
  height: 100%;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 15px;
`;
const WrapTopArea = styled(Box)`
  margin-top: -38px;
`;
const TimeLineBg = styled(Box)`
  background: ${(props) => (props.theme.palette as any).extra.other.eleventh};
  width: 100%;
  padding: 4px 5px 6px;
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
const Line = styled(Box)`
  width: 95%;
  height: 1px;
  margin: auto;
  background-color: ${(props) => (props.theme.palette as any).extra.other.thirteenth}; ;
`;
const Tag = styled(Box)`
  border-radius: 4px;
  padding: 1px 10px 3px;
`;

export default Card;
