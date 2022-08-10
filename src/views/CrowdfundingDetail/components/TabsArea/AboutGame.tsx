import React from "react";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import IDOProcess from "../IDOProcess";

interface AboutGameProps {
  data: any;
  isMobile: boolean;
}

const AboutGame: React.FC<AboutGameProps> = ({ data, isMobile = false }) => {
  const HeadTitle = styled(Box)`
    color: #e7a236;
    text-transform: uppercase;
    font-weight: 400;
    font-size: ${isMobile ? "14px" : "16px"};
    line-height: 100%;
    font-family: "Inter", sans-serif;
    margin-bottom: 10px;
  `;
  const Title = styled(Box)`
    color: #000000;
    font-weight: 600;
    font-size: ${isMobile ? "24px" : "32px"};
    line-height: 150%;
    font-family: "Inter", sans-serif;
    margin-bottom: 16px;
  `;
  const Content = styled(Box)`
    font-weight: 400;
    font-size: ${isMobile ? "12px" : "14px"};
    line-height: 160%;
    color: #31313b;
    font-family: "Inter", sans-serif;
  `;
  const WrapTag = styled(Box)`
    display: ${isMobile ? "none" : "flex"};
    flex-direction: column;
    gap: 20px;
    position: sticky;
    top: 75px;
  `;
  const HeadItem = styled(Box)`
    font-weight: 500;
    font-size: 14px;
    line-height: 14px;
    color: #787a9b;
    font-family: "Inter", sans-serif;
    text-transform: inherit;
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;

    &.active {
      color: #25273d;
      text-decoration: underline;
    }

    imng {
      width: 12px;
      height: auto;
    }
  `;

  return (
    <Box display="flex" gap={3} sx={{ width: "100%" }} flexDirection={isMobile ? "column" : "row"}>
      <Box display="flex" gap={isMobile ? "0%" : "46px"} width={isMobile ? "100%" : "70%"}>
        <Box>
          <WrapTag>
            <HeadItem className="active">
              Introduction
              <img src="/images/next.png" />
            </HeadItem>
            <HeadItem>Team</HeadItem>
          </WrapTag>
        </Box>
        <Box sx={{ flexGrow: 1, display: "flex" }}>
          <Box>
            <HeadTitle>Introduction</HeadTitle>
            <Title>Wilder World is an immersive 5D Metaverse built on Ethereum, Unreal Engine 5 & ZERO.</Title>
            <Content>
              {`Star Fox is a multi-chain game running on BNB, Avalanche and Terra networks, inspired by Axie Infinity game's pet world and the gameplay of Clash of Clan and Boom Beach of Supercell.`}
              <br />
              <br />
              The game sets foot in a fictional world and revolves around farming, property building, and battling against
              other lands with the magical creatures named Mongen. The revolutionized design of Monsterra is a combination of
              free-to-play and free-to-earn models which allows gaming enthusiasts to enjoy and have a high-profit stream
              with no prior investment.
            </Content>
            <Box
              component="img"
              sx={{
                marginTop: "24px",
                marginBottom: "40px",
                width: "100%",
                height: "auto",
              }}
              src="/images/image36.png"
              alt="image36"
            />
            <HeadTitle>TEAM</HeadTitle>
            <Title>Wilder World is built on top of the $WILD token.</Title>
            <Content>
              Star Fox solves all existing problems in the P2E market by offering:
              <br />
              <br />
              ✔️ Free-to-play-to-earn game mechanics
              <br />
              <br />
              ✔️ Play for fun gameplay
              <br />
              <br />
              ✔️ Balanced in-game economy
              <br />
              <br />
              ✔️ No gas fee
              <br />
              <br />
              ✔️ Unprecedented Breeding Mechanism
              <br />
              <br />
              ✔️ Customizable Land Shaping Mechanism
              <br />
              <br />
              ✔️ Diverse Land Themes
              <br />
              <br />
              ✔️ Innovative Token and NFT Staking, Yielding Farming Mechanism
              <br />
              <br />
              ✔️ Earning while off-line
            </Content>
          </Box>
        </Box>
      </Box>
      <Box width={isMobile ? "100%" : "30%"}>
        <IDOProcess data={data} isMobile={isMobile} />
      </Box>
    </Box>
  );
};

export default AboutGame;
