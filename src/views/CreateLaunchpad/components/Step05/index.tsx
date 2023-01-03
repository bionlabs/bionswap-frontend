import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  styled,
  FormControl,
  OutlinedInput,
  Button,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from '@mui/material';
import { setPresaleForm } from 'state/presale/action';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import HeaderSection from '../HeaderSection';
import { DescribeText, NextBackButton, Title, TitleText, WrapLine } from '..';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const Step05 = ({ data, setData, onNextStep, onBackStep }: any) => {
  const handleChange = (prop: any) => (event: any) => {
    setData(setPresaleForm({ [prop]: event }));
  };

  return (
    <>
      <HeaderSection data={data} activeStep={4} onBackStep={onBackStep} onNextStep={onNextStep} />
      <FlexBox flexDirection="column" gap="46px" pt="40px" pb="40px">
        <FlexBox flexDirection="column" alignItems="center">
          <Title>
            5. Introduce your project
          </Title>
          <Typography color='text.secondary'>
            Tell people why they should be excited about your project. Get specific but be clear and be brief.
          </Typography>
        </FlexBox>
        <FlexBox flexDirection="column">
          <WrapLine>
            <WrapDescription>
              <TitleText>
                Project description
              </TitleText>
              <DescribeText>
                Describe what you&apos;re raising funds to do, why you care about it, how you plan to make it happen,
                and who you are. Your description should tell backers everything they need to know. Description must be
                from 128 - 512 characters long. If possible, include images to show them what your project is all about
                and what rewards look like. Read more about telling your story
              </DescribeText>
            </WrapDescription>
            <WrapValue>
              <ReactQuill value={data.description} onChange={handleChange('description')} />
            </WrapValue>
          </WrapLine>
        </FlexBox>
        <FlexBox justifyContent="flex-end" gap="14px">
          <NextBackButton variant='contained' onClick={onBackStep}>
            Back
          </NextBackButton>
          <NextBackButton variant='contained' onClick={onNextStep}>
            Next
          </NextBackButton>
        </FlexBox>
      </FlexBox>
    </>
  );
};

const FlexBox = styled(Box)`
  display: flex;
`;
const WrapDescription = styled(Box)`
  display: flex;
  flex-direction: column;
  max-width: 720px;
  width: 100%;
`;
const WrapValue = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  background: #fefcfc;
`;

export default Step05;
