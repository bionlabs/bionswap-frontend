import React from "react";
import styled from '@emotion/styled'
import { Box, Paper, Tabs, Tab, TableCell, TableBody, Table } from "@mui/material";
import IDOProcess from "../IDOProcess";
import Introduction from "./Introduction";

interface AboutGameProps {
    data: any,
}

function TabPanel(props: any) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const AboutGame: React.FC<AboutGameProps> = ({ data }) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: any, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box display='flex' gap={3} sx={{ width: '100%' }}>
            <Box width='70%'>
                <Box
                    sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
                >
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                        sx={{ borderRight: 1, borderColor: 'divider' }}
                    >
                        <Tab label="Introduction" {...a11yProps(0)} />
                        <Tab label="Team" {...a11yProps(1)} />
                        <Tab label="Tokennomics" {...a11yProps(2)} />
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        <Introduction data={data} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        Team
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        Tokennomics
                    </TabPanel>
                </Box>
            </Box>
            <Box width='30%'>
                <IDOProcess />
            </Box>
        </Box >
    )
}

export default AboutGame;