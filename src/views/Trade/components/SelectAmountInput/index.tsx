import { Percent } from "@bionswap/core-sdk";
import { Stack, Box, Button, Typography } from "@mui/material";
import React from "react";

type Props = {
  percents: number[];
  onSelect?: (percent: number) => void;
};

const SelectAmountInput = ({
  percents = [25, 50, 75, 100],
  onSelect,
}: Props) => {
  return (
    <Stack direction={"row"} justifyContent="space-around" alignItems="center">
      {percents.map((percent) => (
        <Button
          key={percent}
          sx={{
            backgroundColor: "#F2F3F3",
            width: 76,
            height: 24,
            borderRadius: "4px",
            boxShadow: "none",
          }}
          onClick={() => {
            onSelect?.(percent);
          }}
        >
          <Typography fontWeight={500} fontSize={14}>
            {percent}%
          </Typography>
        </Button>
      ))}
    </Stack>
  );
};

export default SelectAmountInput;
