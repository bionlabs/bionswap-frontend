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
      <Container>
        <StyledTabs value={value} variant="scrollable" scrollButtons="auto">
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
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled(Box)`
  background-color: ${(props) => (props.theme.palette as any).background.default};
  width: 100%;
  padding: 1rem 0;
`;
const StyledTabs = styled(Tabs)`
  .MuiButtonBase-root {
    border-radius: 8px;
    text-transform: none;
    position: relative;
    z-index: 2;
    transition: 0.15s ease-in;
  }
  .MuiTabs-indicator {
    background-color: ${(props) => (props.theme.palette as any).extra.button.backgroundGreenOpacity};
    height: 100%;
    border-radius: 8px;
    z-index: 1;
  }
`;

export default TabSection;
