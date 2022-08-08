import { Stack } from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";
import Trade from "views/Trade";

type Props = {};

const TradePage = (props: Props) => {
  return (
    <>
      <Trade />
    </>
  );
};

export default TradePage;
