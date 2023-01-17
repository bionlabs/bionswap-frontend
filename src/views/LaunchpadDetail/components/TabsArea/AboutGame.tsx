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


export default AboutGame;
