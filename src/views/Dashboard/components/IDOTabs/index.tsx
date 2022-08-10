import React from "react";
import { useRouter } from "next/router";
import { Box, Tabs, Tab } from "@mui/material";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import ClaimIdoTokenItem from "./ClaimIdoTokenItem";
import ProjectApplication from "./ProjectApplication";

interface IDOTabsProps {
  data: any;
  isMobile: boolean;
}

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const IDOTabs: React.FC<IDOTabsProps> = ({ data, isMobile = false }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  const WrapTab = styled(Box)``;
  const TabCustom = styled(Tab)`
    font-weight: 600;
    font-size: ${isMobile ? "14px" : "16px"};
    line-height: 22px;
    color: #a8b0b9;
    font-family: "Inter", sans-serif;
    text-transform: inherit;

    &.Mui-selected {
      color: #000000;
    }
  `;
  const TabHead = styled(Box)`
    .MuiTabs-indicator {
      background: #faa000;
      border-radius: 3px 6px 0px 0px;
      height: 4px;
    }
  `;

  return (
    <WrapTab
      sx={{
        width: "100%",
      }}
    >
      <TabHead sx={{ marginBottom: "32px" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <TabCustom label="Claim IDO Token" {...a11yProps(0)} />
          <TabCustom label="IDO project Application" {...a11yProps(1)} />
        </Tabs>
      </TabHead>
      <TabPanel value={value} index={0}>
        <Box display="flex" gap={3} flexDirection={isMobile ? "column" : "row"}>
          {data.map((item: any, index: number) => (
            <ClaimIdoTokenItem key={index} data={item} isMobile={isMobile} />
          ))}
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ProjectApplication data={data} isMobile={isMobile} />
      </TabPanel>
    </WrapTab>
  );
};

export default IDOTabs;
