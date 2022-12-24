import React from "react";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import IDOProcess from "../IDOProcess";

interface AboutGameProps {
  html: string;
}

const AboutGame: React.FC<AboutGameProps> = ({ html }) => {
  return (
    <Box dangerouslySetInnerHTML={{ __html: html }} />
  );
};

const HeadTitle = styled(Box)`
    color: #e7a236;
    text-transform: uppercase;
    font-weight: 400;
    line-height: 100%;
    font-family: "Inter", sans-serif;
    margin-bottom: 10px;
  `;
  const Title = styled(Box)`
    color: #000000;
    font-weight: 600;
    line-height: 150%;
    font-family: "Inter", sans-serif;
    margin-bottom: 16px;
  `;
  const Content = styled(Box)`
    font-weight: 400;
    line-height: 160%;
    color: #31313b;
    font-family: "Inter", sans-serif;
  `;
  const WrapTag = styled(Box)`
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

export default AboutGame;
