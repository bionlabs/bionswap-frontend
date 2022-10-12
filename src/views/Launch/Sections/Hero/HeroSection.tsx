/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Box, Button, Container, styled, Typography, Stack } from "@mui/material";
import { keyframes } from "@emotion/react";
import { MobileProp } from "configs/Type/Mobile/type";
import Image from "next/image";
import PrimaryButton from "components/PrimaryButton";
import { useRouter } from "next/router";

const HeroSection = ({ isMobile, isTablet }: MobileProp) => {
  const router = useRouter();
  return (
    <Wrapper padding='8rem 16px'>
      <FlexBox flexDirection='column' gap='21px' maxWidth='658px' textAlign='center' alignItems='center'>
        <FlexBox gap="20px" justifyContent='center'>
          <Image src="/icons/home/code_symbol.svg" alt="code_symbol" width={37} height={25} />
          <Typography variant="subtitle1" sx={{ color: "gray.400" }}>
            The next-gen decentralize
          </Typography>
        </FlexBox>
        <Typography variant={isMobile ? 'h2' :"h1"}>
          Launch your project with <span style={{color: '#07E0E0', fontSize:'inherit', fontWeight:'inherit'}}>BionSwap</span>
        </Typography>
        <Typography variant={isMobile ? 'body1' : 'h6'} sx={{ color: "gray.400" }}>
          Leverage our extensive experience, and proven industry awareness across our partner network.
        </Typography>
        <Box maxWidth='200px'>
          <PrimaryButton
            label="Start a project"
            href='/trade'
            onClick={(e) => {
              e.preventDefault();
              router.push('/launchpad/create')
            }}
          />
        </Box>
        
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
`
const FlexBox = styled(Box)`
  display: flex
`

export default HeroSection;
