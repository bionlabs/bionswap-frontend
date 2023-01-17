/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Box, styled, Typography } from '@mui/material';
import { MobileProp } from 'configs/Type/Mobile/type';
import Image from 'next/image';
import PrimaryButton from 'components/PrimaryButton';
import { useRouter } from 'next/router';
import Link from 'next/link';

const HeroSection = ({ isMobile, isTablet }: MobileProp) => {
  const router = useRouter();
  return (
    <Wrapper padding="8rem 16px">
      <FlexBox flexDirection="column" gap="21px" maxWidth="650px" textAlign="center" alignItems="center">
        <FlexBox gap="20px" justifyContent="center">
          <Typography variant="subtitle1" color='secondary.main'>
            We simplify your process
          </Typography>
        </FlexBox>
        <Typography variant={isMobile ? 'h2' : 'h1'}>
          Launch your project with{' '}
          <Typography sx={{ color: 'secondary.main', fontSize: 'inherit', fontWeight: 'inherit' }}>BionSwap</Typography>
        </Typography>
        <Typography variant={isMobile ? 'body1' : 'h6'} color='text.secondary'>
          Applying web3 technology for the fastest and simplest fundraising process
        </Typography>
        <Link href='/launchpad/create' legacyBehavior>
          <Box maxWidth="200px">
            <PrimaryButton
              label="Start a project"
            />
          </Box>
        </Link>
        
      </FlexBox>
      <Box>
        <img src="/images/home/hero-pc.png" alt="" width={isTablet ? '100%' : '1200px'} />
      </Box>
    </Wrapper>
  );
};
const Wrapper = styled(Box)`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 60px;
  background: url("/images/home/hero_bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  align-items: center;
  }
`;
const FlexBox = styled(Box)`
  display: flex;
`;

export default HeroSection;
