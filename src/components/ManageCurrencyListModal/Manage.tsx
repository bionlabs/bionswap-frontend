import { IconButton, Stack, Typography, Button, styled, Box } from "@mui/material";
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
    <Stack>
      <Box width='100%' padding='25px 15px 15px' display='flex' gap={2} flexDirection='column'>
        <Stack direction="row" justifyContent="start" width="100%" gap={1} position='relative'>
          <IconButton onClick={() => setView(ManageCurrencyListModalView.search)} sx={{
            position: 'absolute'
          }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography margin='auto' fontSize={18} color='text.primary'>
            Manage
          </Typography>
        </Stack>
        <WrapTab direction="row" gap={1} sx={{ width: "100%" }}>
          {["Lists", "Tokens"].map((label, i) => (
            <Button variant={selectedTab === i ? 'contained' : 'text'} key={i} onClick={() => setSelectedTab(i)} fullWidth>
              <Typography variant="body3Poppins" fontWeight='500'>
                {label}
              </Typography>
            </Button>
          ))}
        </WrapTab>
      </Box>
      {selectedTab === 0 && <ManageLists />}
      {selectedTab === 1 && <ManageTokens />}
    </Stack>
  );
};

const WrapTab = styled(Stack)`
  background: ${props => props.theme.palette.background.default};
  border-radius: 8px;
  padding: 5px;
`

export default Manage;
