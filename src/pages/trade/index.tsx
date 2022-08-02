import { Stack } from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";
// import SwapView from "views/Swap";
export const SwapView = dynamic(() => import("../../views/Swap"), {
  ssr: false,
});

type Props = {};

const Swap = (props: Props) => {
  return (
    <Stack
      sx={{
        minHeight: "100vh",
      }}
    >
      <SwapView />
    </Stack>
  );
};

export default Swap;
