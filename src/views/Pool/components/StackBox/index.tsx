import React from "react";
import { Box, Tabs, Tab } from "@mui/material";
import styled from '@emotion/styled'
import Deposit from './Deposit';
import Withdraw from './Withdraw';

interface StackBoxProps {
    // rewardItems: any,
}

function TabPanel(props:any) {
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

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const StackBox: React.FC<StackBoxProps> = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);
    };

    const TabCustome = styled(Tab)`
        width: 50%;
        color: #A8B0B9;
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 22px;
        text-transform: initial;

        &.Mui-selected {
            color: #000000;
        }
    `

    return (
        <Box>
            <Box sx={{
                background: '#FFFFFF',
                border: '1px solid #EAECEE',
                boxShadow: '0px 12px 19px -5px rgba(37, 39, 61, 0.08)',
                borderRadius: '8px',
                width: '100%',
                maxWidth: '400px',
                padding: '20px 24px'
            }}>
                <Box>
                    <Tabs value={value} onChange={handleChange} centered
                        sx={{
                            '& .MuiTabs-indicator': {
                                background: 'rgb(250, 160, 0)',
                                borderRadius: '3px 6px 0px 0px',
                                height: '4px',
                            }
                        }}>
                        <TabCustome label="Deposit" {...a11yProps(0)} />
                        <TabCustome label="Withdraw" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <Deposit />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Withdraw />
                </TabPanel>
            </Box>
        </Box>
    )
}

export default StackBox;