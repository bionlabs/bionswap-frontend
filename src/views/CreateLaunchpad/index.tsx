import React, { useState } from "react";
import { Box, Tab, Tabs, Typography, styled } from "@mui/material";
import { steps } from "./config";
import { Container } from "@mui/system";
import { useAppDispatch, useAppSelector } from "state";
import { setPresaleForm } from "state/presale/action";
import Step01 from "./components/Step01";
import Step02 from "./components/Step02";
import Step03 from "./components/Step03";
import Step04 from "./components/Step04";
import Step05 from "./components/Step05";
import Step06 from "./components/Step06";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
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
                    {children}
                </Box>
            )}
        </div>
    );
}

const TabLabel = (props: any) => {
    const { icon, index, label, isActive, isDone, ...other } = props;
    return (
        <FlexBox flexDirection='column' gap='13px' alignItems='center'>
            <Typography variant="body4Poppins"
                color={isDone ? 'gray.400' : 'gray.600'}
                fontWeight='400'
                fontStyle='initial'>
                {index}. {label}
            </Typography>
            <WapIcon className={isDone ? 'done' : ''}>
                <img src={icon} alt={label} />
            </WapIcon>
        </FlexBox>
    )
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const CreateLaunchpad = () => {
    const Joi = require('joi');
    const [value, setValue] = React.useState(0)
    const data = useAppSelector(state => state.presale.dataConfig);
    const dispatch = useAppDispatch();


    const [errors, setErrors] = useState([])

    const [communities, setCommunities] = useState({
        website: '',
        telegram: '',
        discord: ''
    })

    const schema = Joi.object({
        projectTitle: Joi.string().required(),
        projectLogo: Joi.string().required(),
        saleBanner: Joi.string().required(`{path} is required`),
        tokenContract: Joi.string().required(),

        website: Joi.string().required(),
        telegram: Joi.string().required(),
        discord: Joi.string().required(),

        tokenPrice: Joi.string().required(),
        minGoal: Joi.string().required(),
        maxGoal: Joi.string().required(),
        minSale: Joi.string().required(),
        maxSale: Joi.string().required(),
        launchTime: Joi.string().required(),
        tokenDistributionTime: Joi.string().required(),

        listing: Joi.string().required(),
        dex: Joi.when('listing', {is: '0', then: Joi.string().required()}),
        pricePerToken: Joi.string().required(),
        liquidityPercentage: Joi.string().required(),
        lockupTime: Joi.string().required(),
    })

    const onNextStep = async (step: number) => {
        try {
            if (step === 1) {
                const value = await schema.validateAsync({ 
                    projectTitle: data.projectTitle,
                    projectLogo: data.projectLogo,
                    saleBanner: data.saleBanner,
                    website: communities['website'],
                    telegram: communities['telegram'],
                    discord: communities['discord'],
                }, 
                {abortEarly: false});

                dispatch(setPresaleForm({ ...data, ['community']: JSON.stringify(communities) }))
            }
            if (step === 2) {
                const value = await schema.validateAsync({ 
                    tokenContract: data.tokenContract,
                }, 
                {abortEarly: false});
            }
            if (step === 3) {
                const value = await schema.validateAsync({ 
                    tokenPrice: data.tokenPrice,
                    minGoal: data.minGoal,
                    maxGoal: data.maxGoal,
                    minSale: data.minGoal,
                    maxSale: data.maxGoal,
                    launchTime: data.launchTime,
                    tokenDistributionTime: data.tokenDistributionTime,
                }, 
                {abortEarly: false});
            }
            if (step === 4) {
                const value = await schema.validateAsync({ 
                    listing: data.listing,
                    dex: data.dex,
                    pricePerToken: data.pricePerToken,
                    liquidityPercentage: data.liquidityPercentage,
                    lockupTime: data.lockupTime
                }, 
                {abortEarly: false});
            }
            setErrors([])
        }
        catch (err:any) {
            setErrors(err?.details || [])
        }
    }

    const onShowError = (key: string) => {
        let message = ''
        errors?.map((item: any, index) => {
            if (item?.context?.key == key) {
                message = item?.message
            }
        })
        return message;
    }

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    // const onCheckStep = (index) => {

    // }

    return (
        <Section>
            <Container maxWidth='lg'>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange}>
                        {
                            steps.map(item => (
                                <Tab key={item.title} label={
                                    <TabLabel icon={item.icon} index={item.step} label={item.title} isDone={item.isDone} isActive={item.isDone} />
                                }
                                    // disabled={!(item.isDone)}
                                    {...a11yProps(0)} />
                            ))
                        }
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <Step01 data={data} setData={dispatch} onNextStep={onNextStep} onShowError={onShowError} communities={communities} setCommunities={setCommunities} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Step02 data={data} setData={dispatch} onNextStep={onNextStep} onShowError={onShowError} />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Step03 data={data} setData={dispatch} onNextStep={onNextStep} onShowError={onShowError} />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <Step04 data={data} setData={dispatch} onNextStep={onNextStep} onShowError={onShowError} />
                </TabPanel>
                <TabPanel value={value} index={4}>
                    <Step05 data={data} setData={dispatch} onNextStep={onNextStep} onShowError={onShowError} />
                </TabPanel>
                <TabPanel value={value} index={5}>
                    <Step06 data={data} setData={dispatch} onNextStep={onNextStep} onShowError={onShowError} />
                </TabPanel>
            </Box>
            </Container>
        </Section>
    )
}

const FlexBox = styled(Box)`
    display: flex;
`
const Section = styled(Box)`
    background-color: ${(props) => props.theme.palette.background.default};
    min-height: 100vh;
`
const WapIcon = styled(Box)`
    width: 34px;
    height: 34px;
    backdrop-filter: blur(1.25px);
    border: 1px solid;
    display: flex;
    align-items: center;
    justify-content: center;
    border-color: ${(props) => props.theme.palette.primary.main};
    background-color: ${(props) => props.theme.palette.gray[900]};
    border-radius: 50%;
    opacity: .25;

    &.done {
        opacity: 1;
    }
`

export default CreateLaunchpad