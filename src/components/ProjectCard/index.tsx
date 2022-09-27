/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Box, Button, styled, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { formatEther } from 'ethers/lib/utils';
import { BUSD_ADDRESS, USDT_ADDRESS, USDC_ADDRESS } from '@bionswap/core-sdk';

interface ProjectItemProps {
  data: any;
}

const ProjectCard: React.FC<ProjectItemProps> = ({ data }) => {
  const router = useRouter();

  return (
    <WrapBox onClick={() => {
      router.push(`/dashboard/my-project/${data?.saleAddress}`);
    }}>
      <Avatar>
        <img
          src={data.banner}
          alt={data.title}
        />
      </Avatar>
      <WrapText>
        <Typography variant='h5Samsung' color='text.primary' fontWeight='700'>
            {data.title}
        </Typography>
        <Typography variant='body3Poppins' color='gray.400' fontWeight='400'>
          Star Fox is a turn-based idle combat and socializing NFT game running on BNB, Avalanche and Terra networks.
        </Typography>
        <CTA sx={{ backgroundColor: 'primary.main', mt: '10px' }}>
          <Typography variant="body3Poppins" color="#000000" fontWeight="600">
            Continue Editing
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
  height: 240px;

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
  gap: 10px;
`;
const CTA = styled(Button)`
  width: 100%;
  border-radius: 4px;
  width: 100%;
  height: 44px;
`;

export default ProjectCard;
