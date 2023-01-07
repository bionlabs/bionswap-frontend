import React from 'react';
import { Box, styled, Container, Typography, Tabs, Tab } from '@mui/material';
import tabsConfig from '../tabsConfig';
import Link from 'next/link';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const TabSection = ({ value, handleChange }: any) => {
  return (
    <Wrapper>
      <StyledTabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto">
        {tabsConfig.map((item, index) => (
          <Tab
            key={item.label}
            disableRipple
            label={item.label}
            {...a11yProps(index)}
            LinkComponent={Link}
            href={item.href}
          />
        ))}
      </StyledTabs>
    </Wrapper>
  );
};

const Wrapper = styled(Box)`
  width: 100%;
  // border-bottom: 1px solid ${props => (props.theme.palette as any).extra.card.divider};
`;
const StyledTabs = styled(Tabs)`
  .MuiButtonBase-root {
    border-radius: 999px;
    text-transform: none;
    position: relative;
    z-index: 2;
    transition: 0.12s ease-in;
  }
  .MuiButtonBase-root.MuiTab-root.Mui-selected {
    color: #ffffff;
  }
  .MuiTabs-indicator {
    background-color: ${(props) => props.theme.palette.primary.main};
    height: 100%;
    border-radius: 999px;
    z-index: 1;
  }
`;

export default TabSection;
