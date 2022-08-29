/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Box, Button, Container, styled, Typography, Stack } from "@mui/material";
import { keyframes } from "@emotion/react";
import { MobileProp } from "configs/Type/Mobile/type";
import Image from "next/image";
import PrimaryButton from "components/PrimaryButton";

const HeroSection = () => {
  return (
    <Section>
      <Container>
        <FlexBox alignItems='center'>
            <FlexBox flexDirection='column' gap='16px' maxWidth='506px' alignItems='flex-start'>
                <Typography variant="h3Samsung">
                    Bionswap Lanching flatform
                </Typography>
                <Typography variant="body2Poppins">
                    Highly-vetted ideas and teams you can trust. Supported by industry-leading creators and funds
                </Typography>
                <Button>
                    Create a launchpad
                </Button>
            </FlexBox>
            <WrapImage>
              <img src='/images/Group481759.png' alt="Group481759" />
            </WrapImage>
        </FlexBox>
      </Container>
    </Section>
  );
};

const FlexBox = styled(Box)`
  display: flex;
`;
const Section = styled(Box)`
  width: 100%;
  background-image: url("/images/Vector.png");
  background-color: #066C6C;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  min-height: 450px;
  display: flex;
  flex-direction: column;
  gap: 60px;
  position: relative;
  overflow: hidden;
  justify-content: center;
`;
const WrapImage = styled(Box)`
  position: absolute;
  right: 0;
  width: 100%;
  max-width: 830px;
  bottom: -231px;

  img {
    width: 100%;

    ${props => props.theme.breakpoints.down("sm")} {
      display: none;
  }
  }
`

export default HeroSection;
