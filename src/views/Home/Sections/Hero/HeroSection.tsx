/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Box, Button, Container, styled, Typography, Stack } from '@mui/material';
import { keyframes } from '@emotion/react';
import { MobileProp } from 'configs/Type/Mobile/type';
import Image from 'next/image';
import PrimaryButton from 'components/PrimaryButton';
import { useRouter } from 'next/router';

interface HeroSectionProps extends MobileProp {}

const HeroSection = ({ isMobile, isTablet }: HeroSectionProps) => {
  const router = useRouter();
  return (
    <Wrapper>
      
    </Wrapper>
  );
};

const FlexBox = styled(Box)`
  display: flex;
`;
const WrapHeroHead = styled(Box)`
  max-width: 600px;
`;
const WrapHeroContent = styled(Box)`
  max-width: 500px;
`;
const Wrapper = styled(Box)`
  width: 100%;
  min-height: 92vh;
  display: flex;
  flex-direction: column;
  gap: 60px;
  z-index: 10;
  position: relative;

  video {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    object-fit: cover;
  }

  ${(props) => props.theme.breakpoints.down('sm')} {
    background: url('/images/home/hero_bg.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: right -75px;

    video {
      display: none;
    }
  }
`;
const WrapContentArea = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 560px;
  width: 100%;
`;
const WrapGlassArea = styled(Box)`
  background: linear-gradient(
    304.69deg,
    rgba(0, 0, 0, 0.728) 3.38%,
    rgba(0, 0, 0, 0.750278) 14.04%,
    rgba(19, 56, 74, 0.8) 42.9%,
    rgba(35, 151, 130, 0.8) 57.12%,
    rgba(20, 103, 128, 0.8) 66.12%,
    rgba(14, 14, 14, 0.8) 91.34%
  );
  width: 100%;
  mix-blend-mode: screen;
  height: 800px;
  position: relative;
  z-index: 3;
  border-left: 1px solid rgba(171, 171, 171, 0.5);
  border-bottom: 1px solid rgba(171, 171, 171, 0.5);
`;
const FloatingAnimation = keyframes`
    0% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-25px);
    }
    100% {
        transform: translateY(0px);
    }
`;
const PillBox = styled(Box)`
  img {
    position: absolute;
    animation: ${FloatingAnimation} 2.5s ease infinite;
    z-index: 2;
    top: 20%;
    left: 40%;
  }
`;

export default HeroSection;
