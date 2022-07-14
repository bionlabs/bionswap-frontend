import React from "react";
import { useRouter } from 'next/router';
import { Box, Tabs, Tab } from "@mui/material";
import PropTypes from 'prop-types';
import TokenSale from "./TokenSale";
import VestingSchedule from "./VestingSchedule";
import styled from "@emotion/styled";
import AboutGame from "./AboutGame";

interface TabsAreaProps {
    data: any,
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
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const TabsArea: React.FC<TabsAreaProps> = ({ data }) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: any, newValue: number) => {
        setValue(newValue);
    };

    const WrapTab = styled(Box)`
        &:after {
            content: '';
            position: absolute;
            border-bottom: 1px solid #BCC2C6;
            width: 100vw;
            left: 0;
            margin-top: 170px;
        }
    `
    const TabCustom = styled(Tab)`
        font-weight: 500;
        font-size: 16px;
        line-height: 22px;
        color: #A8B0B9;
        font-family: 'Inter', sans-serif;
        text-transform: inherit;

        &.Mui-selected {
            color: #000000;
        }
    `
    const TabHead = styled(Box)`
        .MuiTabs-indicator {
            background: #FAA000;
            border-radius: 3px 6px 0px 0px;
            height: 4px;
        }

        &:after {
            content: '';
            position: absolute;
            border-bottom: 1px solid #BCC2C6;
            width: 100vw;
            left: 0;
        }
    `

    return (
        <WrapTab sx={{ width: '100%', marginTop: '70px', marginBottom: '170px' }}>
            <TabHead sx={{ marginBottom: '32px' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <TabCustom label="About Game" {...a11yProps(0)} />
                    <TabCustom label="Token Sale" {...a11yProps(1)} />
                    <TabCustom label="Vesting Schedule" {...a11yProps(2)} />
                </Tabs>
            </TabHead>
            <TabPanel value={value} index={0}>
                <AboutGame data={data} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <TokenSale data={data} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <VestingSchedule data={data} />
            </TabPanel>
        </WrapTab>
    )
}

export default TabsArea;