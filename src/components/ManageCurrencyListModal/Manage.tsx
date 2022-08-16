import { IconButton, Stack, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ManageCurrencyListModalView, useManageCurrencyListModalContext } from ".";
import ManageLists from "./ManageLists";
import ManageTokens from "./ManageTokens";

type Props = {};

const Manage = (props: Props) => {
  const { setView } = useManageCurrencyListModalContext();
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <Stack gap={2}>
      <Stack direction="row" justifyContent="start" width="100%" gap={1}>
        <IconButton onClick={() => setView(ManageCurrencyListModalView.search)}>
          <ArrowBackIcon />
        </IconButton>
        <Typography>Manage</Typography>
      </Stack>
      <Stack direction="row" gap={1} sx={{ width: "100%" }}>
        {["Lists", "Tokens"].map((label, i) => (
          <Button key={i} variant={selectedTab === i ? "outlined" : "text"} onClick={() => setSelectedTab(i)} fullWidth>
            <Typography>{label}</Typography>
          </Button>
        ))}
      </Stack>
      {selectedTab === 0 && <ManageLists />}
      {selectedTab === 1 && <ManageTokens />}
    </Stack>
  );
};

export default Manage;
