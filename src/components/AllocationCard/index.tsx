/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Box, Button, styled, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { formatEther } from 'ethers/lib/utils';
import { BUSD_ADDRESS, USDT_ADDRESS, USDC_ADDRESS } from '@bionswap/core-sdk';

interface ProjectItemProps {
  data: any;
}

const AllocationCard: React.FC<ProjectItemProps> = ({ data }) => {
  const router = useRouter();
  const currentTime = +new Date();
  const startTime = data?.startTime * 1000;
  const endTime = data?.endTime * 1000;

  const map = {
    [USDT_ADDRESS[data?.chainId]?.toLowerCase()]: 'USDT',
    [BUSD_ADDRESS[data?.chainId]?.toLowerCase()]: 'BUSD',
    [USDC_ADDRESS[data?.chainId]?.toLowerCase()]: 'USDC',
  };
  const unit = data?.isQuoteETH ? 'BNB' : map[data?.quoteToken];

  return (
    <WrapBox>
      <Avatar>
        <img
          src="https://bionswap.sgp1.digitaloceanspaces.com/dev/launchpad/2022-09-23/632dd57d18ac3c3efa6d8371.jpg"
          alt="ABC"
        />
      </Avatar>
      <WrapText>
        <FlexBox justifyContent="space-between" width="100%" alignItems="center">
          <FlexBox gap="10px" alignItems="center">
            <Logo>
              <img
                src="https://bionswap.sgp1.digitaloceanspaces.com/dev/launchpad/2022-09-23/632dd57018ac3c3efa6d836d.jpg"
                alt="ABC"
              />
            </Logo>
            <FlexBox flexDirection="column">
              <Typography variant="body3Poppins" color="text.primary" fontWeight="500">
                Engines Of Fury
              </Typography>
              <Typography variant="body4Poppins" color="#FBB03B" fontWeight="400">
                $FURY
              </Typography>
            </FlexBox>
          </FlexBox>
          <Status sx={{ backgroundColor: '#08878E' }}>
            <Typography variant="captionPoppins" color="text.primary" fontWeight="500">
              Open
            </Typography>
          </Status>
        </FlexBox>
        <Line />
        <FlexBox justifyContent="space-between" alignItems="center">
          <Typography variant="body4Poppins" color="primary.main" fontWeight="400">
            Available Now
          </Typography>
          <Typography variant="body3Poppins" color="text.primary" fontWeight="500">
            0 FURY
          </Typography>
        </FlexBox>
        <FlexBox justifyContent="space-between" alignItems="center">
          <Typography variant="body4Poppins" color="primary.main" fontWeight="400">
            Claimed
          </Typography>
          <Typography variant="body3Poppins" color="text.primary" fontWeight="500">
            0 FURY
          </Typography>
        </FlexBox>
        <FlexBox justifyContent="space-between" alignItems="center">
          <Typography variant="body4Poppins" color="primary.main" fontWeight="400">
            Total
          </Typography>
          <Typography variant="body3Poppins" color="text.primary" fontWeight="500">
            0 FURY
          </Typography>
        </FlexBox>
        <FlexBox justifyContent="space-between" alignItems="center">
          <Typography variant="body4Poppins" color="primary.main" fontWeight="400">
            Next Claim in
          </Typography>
          <Typography variant="body3Poppins" color="text.primary" fontWeight="500">
            06/20/2022 - 10:00:00 AM
          </Typography>
        </FlexBox>
        <CTA sx={{backgroundColor: 'primary.main'}}>
          <Typography variant="body3Poppins" color="#000000" fontWeight="600">
            Claim
          </Typography>
        </CTA>
      </WrapText>
    </WrapBox>
  );
};
const FlexBox = styled(Box)`
  display: flex;
`;
const WrapBox = styled(Box)`
  border-radius: 8px;
  background-color: ${(props) => props.theme.palette.gray[900]};
  width: 100%;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: 0.15s ease-in;
  border: 1px solid ${(props) => (props.theme.palette as any).extra.other.tenth};
  width: 100%;

  :hover {
    transform: scale3d(0.99, 0.99, 1);
    transform-style: preserve-3d;
  }
`;
const Avatar = styled(Box)`
  width: 100%;
  height: 200px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const WrapText = styled(Box)`
  display: flex;
  padding: 16px 16px 32px;
  flex-direction: column;
  gap: 16px;
`;
const Logo = styled(Box)`
  border: 2px solid ${(props) => (props.theme.palette as any).extra.other.nineth};
  background: #0b0b0c;
  border-radius: 8px;
  transform: matrix(-1, 0, 0, 1, 0, 0);
  max-width: 88px;
  width: 100%;
  height: 100%;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 68px;
  height: 68px;

  img {
    width: 100%;
  }
`;
const Line = styled(Box)`
  width: 100%;
  height: 1px;
  margin: auto;
  background-color: ${(props) => (props.theme.palette as any).extra.other.thirteenth}; ;
`;
const Status = styled(Box)`
  border-radius: 4px;
  width: 100px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const CTA = styled(Button)`
  width: 100%;
  border-radius: 4px;
  width: 100%;
  height: 52px;
`;

export default AllocationCard;
