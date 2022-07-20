import React, { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/router';
import { Box, Tabs, Tab, Container } from "@mui/material";
import PropTypes from 'prop-types';
import TokenSale from "./TokenSale";
import VestingSchedule from "./VestingSchedule";
import styled from "@emotion/styled";
import AboutGame from "./AboutGame";

interface TabsAreaProps {
    data: any,
    isMobile: boolean
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

const TabsArea: React.FC<TabsAreaProps> = ({ data, isMobile = false }) => {
    const [value, setValue] = React.useState(0);
    const tabHead = useRef(null);

    useEffect(() => {
        window.addEventListener('scroll', pop);
    }, []);


    const pop = () => {
        const topPosition = tabHead?.current?.getBoundingClientRect().top
        if (tabHead.current) {
            topPosition <= 0 ? tabHead.current.style.background = '#ffffff' : tabHead.current.style.background = 'transparent'
        }
    }

    const handleChange = (event: any, newValue: number) => {
        setValue(newValue);
    };

    const WrapTab = styled(Box)`
    `
    const TabCustom = styled(Tab)`
        font-weight: 500;
        font-size: ${isMobile ? '14px' : '16px'} ;
        line-height: 22px;
        color: #A8B0B9;
        font-family: 'Inter', sans-serif;
        text-transform: inherit;

        &.Mui-selected {
            color: #000000;
        }
    `
    const TabHead = styled(Box)`
        position: sticky;
        top: 0;
        box-shadow: 1px 1px #DEE0E2;
        z-index: 10;

        .MuiTabs-indicator {
            background: #FAA000;
            border-radius: 3px 6px 0px 0px;
            height: 4px;
        }
    `
    const TabPanelCustom = styled(TabPanel)`
        padding-top: 40px;
        padding-bottom: ${isMobile ? '40px' : '160px'};
        background-color: #FAFAF9;
    `

    return (
        <WrapTab sx={{
            width: '100%',
            marginTop: isMobile ? '40px' : '70px'
        }}>
            <TabHead ref={tabHead}>
                <Container>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <TabCustom label="About Game" {...a11yProps(0)} />
                        <TabCustom label="Token Sale" {...a11yProps(1)} />
                        <TabCustom label="Vesting Schedule" {...a11yProps(2)} />
                    </Tabs>
                </Container>
            </TabHead>
            <TabPanelCustom value={value} index={0}>
                <Container>
                    <AboutGame data={data} isMobile={isMobile} />
                </Container>
            </TabPanelCustom>
            <TabPanelCustom value={value} index={1}>
                <Container>
                    <TokenSale data={data} isMobile={isMobile} />
                </Container>
            </TabPanelCustom>
            <TabPanelCustom value={value} index={2}>
                <Container>
                    <VestingSchedule data={data} isMobile={isMobile} />
                </Container>
            </TabPanelCustom>
        </WrapTab>
    )
}

export default TabsArea;