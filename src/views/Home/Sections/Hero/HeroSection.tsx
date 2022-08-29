/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Box, Button, Container, styled, Typography, Stack } from "@mui/material";
import { keyframes } from "@emotion/react";
import { MobileProp } from "configs/Type/Mobile/type";
import Image from "next/image";
import PrimaryButton from "components/PrimaryButton";

const HeroSection = ({ isMobile, isTablet }: MobileProp) => {
  return (
    <Wrapper>
      <video loop muted autoPlay>
        <source src="/videos/H3.webm" type="video/webm" />
        <source src="/videos/H3.mp4" type="video/mp4" />
      </video>
      <FlexBox flexDirection={isMobile ? "column" : "row"}>
        <Box display="flex" width={isTablet ? "100%" : "50%"} p={isMobile ? "8rem 16px" : "8rem"}>
          <WrapContentArea>
            <FlexBox gap="20px">
              <Image src="/icons/home/code_symbol.svg" alt="code_symbol" width={37} height={25} />
              <Typography variant="subtitle1" sx={{ color: "extra.text.secondary" }}>
                the next-gen decentralize
              </Typography>
            </FlexBox>
            <WrapHeroHead>
              <Typography variant="h1">Own new token with low risk entrance</Typography>
            </WrapHeroHead>
            <WrapHeroContent>
              <Typography variant="h6" sx={{ color: "extra.text.primary" }}>
                Bionswap is a decentralized exchange native to BNB Chain and other chains
              </Typography>
            </WrapHeroContent>
            <FlexBox gap="28px">
              <Box maxWidth="218px" width="100%">
                <PrimaryButton label="Trade now" />
              </Box>
              <Box maxWidth="218px" width="100%">
                <PrimaryButton variant="outlined" label="Learn more" />
              </Box>
            </FlexBox>
          </WrapContentArea>
        </Box>
        {/* {!isTablet && (
          <FlexBox width="50%" justifyContent="end" position="relative">
            <WrapGlassArea />
            <PillBox>
              <img src="images/home/pill.png" alt="" width="230px" />
            </PillBox>
          </FlexBox>
        )} */}
      </FlexBox>
    </Wrapper>
  );
};

const FlexBox = styled(Box)`
  display: flex;
`;
const WrapHeroHead = styled(Box)`
  max-width: 600px;
  width: 100%;
`;
const WrapHeroContent = styled(Box)`
  max-width: 460px;
  width: 100%;
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

  ${props => props.theme.breakpoints.down("sm")} {
    background: url("/images/home/hero_bg.png");
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
