import React, { useState } from "react";
import { Box, Tab, Tabs, Typography, styled } from "@mui/material";
import { steps, dataConfig } from "./config";
import Step01 from "./components/Step01";
import { Container } from "@mui/system";
import Step02 from "./components/Step02";
import Step03 from "./components/Step03";
import { useAppDispatch, useAppSelector } from "state";
import { setPresaleForm } from "state/presale/action";

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