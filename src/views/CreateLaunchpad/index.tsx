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
import NotSupportSection from 'components/NotSupportSection';
import { ChainId } from '@bionswap/core-sdk';
import { useChain, useToken } from 'hooks';
import ConnectWalletSection from './components/ConnectWalletSection';
import Joi, { CustomHelpers, CustomValidator } from 'joi';
// const Joi = require('joi');

const CreateLaunchpad = () => {
  const { chainId, account } = useChain();

  const data = useAppSelector((state) => state.presale.dataConfig);
  const tokenContract = useToken(data.tokenContract);
  console.log('🚀 ~ file: index.tsx ~ line 23 ~ CreateLaunchpad ~ tokenContract', tokenContract);
  const communityDetail = JSON.parse(data?.community || '{}');
  const activeStep = useAppSelector((state) => state.presale.step);
  const dispatch = useAppDispatch();
  const currentTime = +new Date();

  const [errors, setErrors] = useState([]);

  const [communities, setCommunities] = useState({
    website: communityDetail['website'] || '',
    telegram: communityDetail['telegram'] || '',
    discord: communityDetail['discord'] || '',
  });

  const method: CustomValidator = (value: any, helpers: CustomHelpers) => {
    const res: any = helpers?.state?.path;

    res?.map((item: any, index: any) => {
      if (item == 'tokenContract') {
        if (value.toLowerCase() !== tokenContract?.address.toLowerCase()) {
          throw new Error('Invalid token address');
        }
      }

      if (item == 'minGoal') {
        if (Number(value) >= Number(data?.maxGoal)) {
          throw new Error('Minimum goal must be less than maximum goal');
        }
        if (Number(value) < Number(data?.maxGoal) / 2) {
          throw new Error('Minimum goal must be greater than or equal 50% of Maximum goal');
        }
      }

      if (item == 'minSale') {
        if (Number(value) >= Number(data?.maxSale)) {
          throw new Error('Minimum buy must be less than maximum buy');
        }
      }

      if (item == 'launchTime') {
        if (value >= data.endTime) {
          throw new Error('Launch time must be less than pre-sale end time');
        }
        if (value < currentTime) {
          throw new Error('Launch time must be greater than current time');
        }
      }

      if (item == 'endTime') {
        if (value <= data.launchTime) {
          throw new Error('Pre-sale end time must be greater than launch time');
        }
        if (value < currentTime) {
          throw new Error('Launch time must be greater than current time');
        }
      }

      if (item == 'tokenDistributionTime') {
        if (value < currentTime) {
          throw new Error('Token distribution time must be greater than current time');
        }
      }

      if (item == 'tgeDate') {
        if (value < currentTime) {
          throw new Error('TGE Date must be greater than current time');
        }
      }

      if (item == 'firstRelease') {
        if (Number(value) > 90) {
          throw new Error('First release must be 90 characters or less');
        }
      }

      if (item == 'tokenReleaseEachCycle') {
        throw new Error('First release must be 90 characters or less');
      }
    });
  };

  const schemaStep01 = Joi.object({
    projectTitle: Joi.string().required().label('Project title'),
    projectLogo: Joi.string().required().label('Project logo'),
    saleBanner: Joi.string().required().label('Sale banner'),
    website: Joi.string().required().label('Website'),
    // telegram: Joi.string().required().label('Telegram'),
    // discord: Joi.string().required().label('Discord'),
  });
  const schemaStep02 = Joi.object({
    tokenContract: Joi.string().required().custom(method).label('Token contract'),
    currency: Joi.string().required().label('Currency'),
  });
  const schemaStep03 = Joi.object({
    tokenPrice: Joi.string().required().label('Token price'),
    minGoal: Joi.string().required().custom(method).label('Minimum goal'),
    maxGoal: Joi.string().required().custom(method).label('Maximum goal'),
    minSale: Joi.string().required().custom(method).label('Minimum buy'),
    maxSale: Joi.string().required().custom(method).label('Maximum buy'),
    endTime: Joi.required().custom(method).label('Pre-sale end time'),
    launchTime: Joi.required().custom(method).label('Launch time'),
    tokenDistributionTime: Joi.required().custom(method).label('Token distribution time'),
    vestingToken: Joi.required().label('Vesting token'),
    tgeDate: Joi.required().custom(method).label('TGE date'),
    firstRelease: Joi.when('vestingToken', { is: '1', then: Joi.required().custom(method).label('First release') }),
    vestingPeriodEachCycle: Joi.when('vestingToken', {
      is: '1',
      then: Joi.required().label('Vesting period each cycle'),
    }),
    tokenReleaseEachCycle: Joi.when('vestingToken', {
      is: '1',
      then: Joi.required().label('Token release each cycle'),
    }),
  });
  const schemaStep04 = Joi.object({
    listing: Joi.required(),
    dex: Joi.required(),
    pricePerToken: Joi.string().required(),
    liquidityPercentage: Joi.string().required(),
    lockupTime: Joi.string().required(),
  });

  const handleNext = async (step: number) => {
    try {
      const validate = await handleValidate(step);
      if (!validate) return;

      dispatch(setStepLaunchpad(activeStep + 1));
      setErrors([]);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    } catch (err: any) {}
  };

  const handleBack = (step: number) => {
    dispatch(setStepLaunchpad(activeStep - 1));
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  const abc = async (step: number) => {
    // console.log('data ABC =====>', data);
    const validate = await handleValidate(step);
    if (!validate) return;
    setErrors([]);
  };

  const handleValidate = async (step: number) => {
    try {
      const abcde = data;
      console.log("🚀 ~ file: index.tsx ~ line 181 ~ handleValidate ~ abcde", abcde)
      let value;
      if (step === 1) {
        value = await schemaStep01.validateAsync(
          {
            projectTitle: data.projectTitle,
            projectLogo: data.projectLogo,
            saleBanner: data.saleBanner,
            website: communities['website'],
            // telegram: communities['telegram'],
            // discord: communities['discord'],
          },
          { abortEarly: false },
        );

        dispatch(setPresaleForm({ ['community']: JSON.stringify(communities) }));
      }
      if (step === 2) {
        value = await schemaStep02.validateAsync(
          {
            tokenContract: data.tokenContract,
            currency: data.currency,
          },
          { abortEarly: false },
        );
      }
      if (step === 3) {
        value = await schemaStep03.validateAsync(
          {
            tokenPrice: data.tokenPrice,
            minGoal: data.minGoal,
            maxGoal: data.maxGoal,
            minSale: data.minSale,
            maxSale: data.maxSale,
            launchTime: data.launchTime,
            endTime: data.endTime,
            tokenDistributionTime: data.tokenDistributionTime,
            vestingToken: data.vestingToken,
            tgeDate: data.tgeDate,
            firstRelease: data.firstRelease,
            vestingPeriodEachCycle: data.vestingPeriodEachCycle,
            tokenReleaseEachCycle: data.tokenReleaseEachCycle,
          },
          { abortEarly: false },
        );
      }
      if (step === 4) {
        value = await schemaStep04.validateAsync(
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
      return value;
    } catch (error: any) {
      setErrors(error?.details || []);
    }
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
      {ChainId.BSC_TESTNET !== chainId ? (
        <NotSupportSection />
      ) : !account ? (
        <ConnectWalletSection />
      ) : (
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
                communityDetail={communityDetail}
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
              />
            )}
          </Box>
        </Container>
      )}
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
