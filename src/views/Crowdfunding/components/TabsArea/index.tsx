import React from "react";
import { useRouter } from 'next/router';
import { Box, Tabs, Tab } from "@mui/material";
import PropTypes from 'prop-types';
import TokenSale from "./TokenSale";
import VestingSchedule from "./VestingSchedule";

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

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: '32px' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="About Game" {...a11yProps(0)} />
                    <Tab label="Token Sale" {...a11yProps(1)} />
                    <Tab label="Vesting Schedule" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                Item One
            </TabPanel>
            <TabPanel value={value} index={1}>
                <TokenSale data={data} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <VestingSchedule data={data} />
            </TabPanel>
        </Box>
    )
}

export default TabsArea;