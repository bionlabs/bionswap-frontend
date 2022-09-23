import React, { useState } from 'react';
import { Box, Typography, styled, Stepper, Step } from '@mui/material';
import { steps } from './config';
import { Container } from '@mui/system';
import { useAppDispatch, useAppSelector } from 'state';
import { setPresaleForm, setStepLaunchpad } from 'state/presale/action';
import Step01 from './components/Step01';
import Step02 from './components/Step02';
import Step03 from './components/Step03';
import Step04 from './components/Step04';
import Step05 from './components/Step05';
import Step06 from './components/Step06';

const CreateLaunchpad = () => {
  const Joi = require('joi');
  const data = useAppSelector((state) => state.presale.dataConfig);
  const communityDetail = JSON.parse(data?.community || '{}');
  const activeStep = useAppSelector((state) => state.presale.step);
  const dispatch = useAppDispatch();

  const [errors, setErrors] = useState([]);

  const [communities, setCommunities] = useState({
    website: communityDetail['website'] || '',
    telegram: communityDetail['telegram'] || '',
    discord: communityDetail['discord'] || '',
  });

  const schemaStep01 = Joi.object({
    projectTitle: Joi.string().required(),
    projectLogo: Joi.string().required(),
    saleBanner: Joi.string().required(`{path} is required`),
    website: Joi.string().required(),
    telegram: Joi.string().required(),
    discord: Joi.string().required(),
  });
  const schemaStep02 = Joi.object({
    tokenContract: Joi.string().required(),
    currency: Joi.string().required(),
  });
  const schemaStep03 = Joi.object({
    tokenPrice: Joi.string().required(),
    minGoal: Joi.string().required(),
    maxGoal: Joi.string().required(),
    minSale: Joi.string().required(),
    maxSale: Joi.string().required(),
    endTime: Joi.required(),
    launchTime: Joi.required(),
    tokenDistributionTime: Joi.required(),
    vestingToken: Joi.required(),
    fristRelease: Joi.when('vestingToken', { is: '1', then: Joi.required() }),
    vestingPeriodEachCycle: Joi.when('vestingToken', { is: '1', then: Joi.required() }),
    tokenReleaseEachCycle: Joi.when('vestingToken', { is: '1', then: Joi.required() }),
  });
  const schemaStep04 = Joi.object({
    listing: Joi.string().required(),
    dex: Joi.required(),
    pricePerToken: Joi.string().required(),
    liquidityPercentage: Joi.string().required(),
    lockupTime: Joi.string().required(),
  });

  const handleNext = async (step: number) => {
    try {
      if (step === 1) {
        const value = await schemaStep01.validateAsync(
          {
            projectTitle: data.projectTitle,
            projectLogo: data.projectLogo,
            saleBanner: data.saleBanner,
            website: communities['website'],
            telegram: communities['telegram'],
            discord: communities['discord'],
          },
          { abortEarly: false },
        );

        dispatch(setPresaleForm({ ...data, ['community']: JSON.stringify(communities) }));
      }
      if (step === 2) {
        const value = await schemaStep02.validateAsync(
          {
            tokenContract: data.tokenContract,
            currency: data.currency,
          },
          { abortEarly: false },
        );
      }
      if (step === 3) {
        const value = await schemaStep03.validateAsync(
          {
            tokenPrice: data.tokenPrice,
            minGoal: data.minGoal,
            maxGoal: data.maxGoal,
            minSale: data.minGoal,
            maxSale: data.maxGoal,
            launchTime: data.launchTime,
            endTime: data.endTime,
            tokenDistributionTime: data.tokenDistributionTime,
            vestingToken: data.vestingToken,
            fristRelease: data.fristRelease,
            vestingPeriodEachCycle: data.vestingPeriodEachCycle,
            tokenReleaseEachCycle: data.tokenReleaseEachCycle,
          },
          { abortEarly: false },
        );
      }
      if (step === 4) {
        const value = await schemaStep04.validateAsync(
          {
            listing: data.listing,
            dex: data.dex,
            pricePerToken: data.pricePerToken,
            liquidityPercentage: data.liquidityPercentage,
            lockupTime: data.lockupTime,
          },
          { abortEarly: false },
        );
      }
      dispatch(setStepLaunchpad(activeStep + 1));
      setErrors([]);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    } catch (err: any) {
      setErrors(err?.details || []);
    }
  };

  const handleBack = (step: number) => {
    dispatch(setStepLaunchpad(activeStep - 1));
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  const handleSubmit = () => {
    console.log('on submit');
  };

  const onShowError = (key: string) => {
    let message = '';
    errors?.map((item: any, index) => {
      if (item?.context?.key == key) {
        message = item?.message;
      }
    });
    return message;
  };

  return (
    <Section>
      <Container maxWidth="lg">
        <Box sx={{ width: '100%' }}>
          <WrapStep sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Stepper activeStep={activeStep}>
              {steps.map((item, index) => {
                return (
                  <StepCustom key={item.title} className={activeStep === index ? 'activeStep' : ''}>
                    <FlexBox flexDirection="column" gap="13px" alignItems="center">
                      <Typography
                        variant="body4Poppins"
                        textTransform="uppercase"
                        fontWeight={activeStep === index ? '500' : '400'}
                        color={activeStep === index ? 'primary.main' : 'gray.600'}
                        fontStyle="initial"
                      >
                        {item.step}. {item.title}
                      </Typography>
                      <WapIcon className={activeStep === index ? 'done' : ''}>
                        <img src={item.icon} alt={item.icon} />
                      </WapIcon>
                    </FlexBox>
                  </StepCustom>
                );
              })}
            </Stepper>
          </WrapStep>
          {activeStep === 0 && (
            <Step01
              data={data}
              setData={dispatch}
              handleNext={handleNext}
              onShowError={onShowError}
              communities={communities}
              setCommunities={setCommunities}
            />
          )}
          {activeStep === 1 && (
            <Step02
              data={data}
              setData={dispatch}
              handleNext={handleNext}
              handleBack={handleBack}
              onShowError={onShowError}
            />
          )}
          {activeStep === 2 && (
            <Step03
              data={data}
              setData={dispatch}
              handleNext={handleNext}
              handleBack={handleBack}
              onShowError={onShowError}
            />
          )}
          {activeStep === 3 && (
            <Step04
              data={data}
              setData={dispatch}
              handleNext={handleNext}
              handleBack={handleBack}
              onShowError={onShowError}
            />
          )}
          {activeStep === 4 && (
            <Step05
              data={data}
              setData={dispatch}
              handleNext={handleNext}
              handleBack={handleBack}
              onShowError={onShowError}
            />
          )}
          {activeStep === 5 && (
            <Step06
              data={data}
              setData={dispatch}
              handleNext={handleNext}
              handleBack={handleBack}
              onShowError={onShowError}
              handleSubmit={handleSubmit}
            />
          )}
        </Box>
      </Container>
    </Section>
  );
};

const FlexBox = styled(Box)`
  display: flex;
`;
const Section = styled(Box)`
  background-color: ${(props) => props.theme.palette.background.default};
  min-height: 100vh;
  padding-top: 100px;
`;
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
  opacity: 0.25;

  &.done {
    opacity: 1;
  }
`;
const WrapStep = styled(Box)`
  padding-bottom: 17px;

  .MuiStepConnector-root {
    visibility: hidden;
  }
`;
const StepCustom = styled(Step)`
  position: relative;

  &.activeStep {
    ::after {
      content: '';
      position: absolute;
      width: 100%;
      background-color: ${(props) => props.theme.palette.primary.main};
      border-radius: 4px 4px 0px 0px;
      height: 4px;
      left: 0;
      bottom: -17px;
    }
  }

  &.Mui-completed {
    span {
      color: ${(props) => props.theme.palette.gray[400]};
    }

    .MuiBox-root {
      opacity: 1;
    }
  }
`;

export default CreateLaunchpad;
