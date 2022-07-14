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
                <Box>
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

    const TabPanelCustom = styled(TabPanel)`
        flex: 1;
    `
    const TabCustom = styled(Tab)`
        font-weight: 500;
        font-size: 12px;
        line-height: 100%;
        color: ##787A9B;
        font-family: 'Inter', sans-serif;
        text-transform: inherit;
        align-items: flex-start;
        padding: 0;
        justify-content: flex-start;

        &.Mui-selected {
            color: #25273D;
        }
    `
    const TabsCustom = styled(Tabs)`
        .MuiTabs-indicator {
            display: none;
        }
    `

    return (
        <Box display='flex' gap={3} sx={{ width: '100%' }}>
            <Box width='70%'>
                <Box gap={3} sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}>
                    <TabsCustom
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs example">
                        <TabCustom label="Introduction" {...a11yProps(0)} />
                        <TabCustom label="Team" {...a11yProps(1)} />
                        <TabCustom label="Tokennomics" {...a11yProps(2)} />
                    </TabsCustom>
                    <TabPanelCustom value={value} index={0}>
                        <Introduction data={data} />
                    </TabPanelCustom>
                    <TabPanelCustom value={value} index={1}>
                        Team
                    </TabPanelCustom>
                    <TabPanelCustom value={value} index={2}>
                        Tokennomics
                    </TabPanelCustom>
                </Box>
            </Box>
            <Box width='30%'>
                <IDOProcess />
            </Box>
        </Box >
    )
}

export default AboutGame;