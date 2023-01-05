import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Box, Typography, styled, FormControl, OutlinedInput, Button, Stack, Divider } from '@mui/material';
import { setPresaleForm } from 'state/presale/action';
import ImageUploading from 'react-images-uploading';
import { uploadLaunchpadImage } from 'api/launchpad';
import Joi, { CustomHelpers, CustomValidator } from 'joi';
import HeaderSection from '../HeaderSection';
import { DescribeText, ErrorLabel, InputCustom, NextBackButton, RequireSymbol, Title, TitleText } from '..';

const Step01 = ({ data, setData, onNextStep, onBackStep }: any) => {
  const [projectLogo, setProjectLogo] = useState(
    [
      {
        data_url: data.projectLogo,
      },
    ] || [],
  );
  const [saleBanner, setSaleBanner] = useState(
    [
      {
        data_url: data.saleBanner,
      },
    ] || [],
  );
  const [errors, setErrors] = useState([]);
  const parsedCommunities = useMemo(() => JSON.parse(data?.community || '{}'), [data?.community]);
  const [communities, setCommunities] = useState({
    website: parsedCommunities['website'] || '',
    telegram: parsedCommunities['telegram'] || '',
    discord: parsedCommunities['discord'] || '',
  });
  const isTyped = useRef(false);

  const validate = async () => {
    try {
      const schemaStep01 = Joi.object({
        projectTitle: Joi.string().max(50).required().label('Project title'),
        projectLogo: Joi.string().required().label('Project logo'),
        saleBanner: Joi.string().required().label('Sale banner'),
        website: Joi.string().required().label('Website'),
      });

      const value = await schemaStep01.validateAsync(
        {
          projectTitle: data.projectTitle,
          projectLogo: data.projectLogo,
          saleBanner: data.saleBanner,
          website: communities['website'],
        },
        { abortEarly: false },
      );
      setErrors([]);
      return true;
    } catch (error: any) {
      setErrors(error?.details || []);
      return false;
    }
  };

  const parseErrorMessage = (key: string) => {
    let message = '';
    errors?.map((item: any, index) => {
      if (item?.context?.key == key) {
        message = item?.message;
      }
    });
    return message;
  };

  useEffect(() => {
    if (isTyped.current) {
      validate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    setData(setPresaleForm({ ['community']: JSON.stringify(communities) }));
  }, [communities, setData]);

  const handleChangeProjectLogo = async (imageList: any) => {
    try {
      const logoBase64 = imageList[0].data_url.split(',')[1];
      const imageLogo = await uploadLaunchpadImage(logoBase64);
      setProjectLogo(imageList);
      setData(setPresaleForm({ ['projectLogo']: imageLogo.url }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeSaleBanner = async (imageList: any) => {
    try {
      const logoBase64 = imageList[0].data_url.split(',')[1];
      const imageLogo = await uploadLaunchpadImage(logoBase64);
      setSaleBanner(imageList);
      setData(setPresaleForm({ ['saleBanner']: imageLogo.url }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (prop: any) => (event: any) => {
    setData(setPresaleForm({ [prop]: event.target.value }));
    if (!isTyped.current) {
      isTyped.current = true;
    }
  };

  const handleChangeCommunities = (prop: any) => (event: any) => {
    setCommunities({ ...communities, [prop]: event.target.value });
    if (!isTyped.current) {
      isTyped.current = true;
    }
  };

  const handleNextStep = async () => {
    const isValid = await validate();

    if (isValid) {
      onNextStep();
    }
  };

  return (
    <>
      <HeaderSection data={data} activeStep={0} onBackStep={onBackStep} onNextStep={handleNextStep} />
      <FlexBox flexDirection="column" gap="46px" pt="40px" pb="40px">
        <FlexBox flexDirection="column" alignItems="center">
          <Title>
            1. Start with the basics
          </Title>
          <Typography color="text.secondary">Make it easy for people to learn about your project.</Typography>
        </FlexBox>
        <Stack width='100%' alignItems='start' divider={<Divider flexItem/>}>
          <WrapLine>
            <WrapDescription>
              <TitleText>Project title</TitleText>
              <DescribeText>
                Write a clear brief title to help people quickly understand your project. Both will appear on your
                project and pre-launch pages.
              </DescribeText>
            </WrapDescription>
            <WrapValue>
              <WrapForm fullWidth>
                <Typography component="label" fontWeight="500">
                  Title <RequireSymbol>*</RequireSymbol>
                </Typography>
                <InputCustom
                  placeholder="Enter project title"
                  className={parseErrorMessage('projectTitle') ? 'onError' : ''}
                  value={data.projectTitle}
                  onChange={handleChange('projectTitle')}
                  fullWidth
                />
                <ErrorLabel>{parseErrorMessage('projectTitle')}</ErrorLabel>
              </WrapForm>
            </WrapValue>
          </WrapLine>
          <WrapLine>
            <WrapDescription>
              <TitleText>Project logo</TitleText>
              <DescribeText>Make it easy for people to learn about your project.</DescribeText>
            </WrapDescription>
            <WrapValue>
              <ImageUploading value={projectLogo} onChange={handleChangeProjectLogo} dataURLKey="data_url">
                {({ imageList, onImageUpload, onImageUpdate, dragProps }) => (
                  <BoxImageUpload
                    onClick={onImageUpload}
                    {...dragProps}
                    className={parseErrorMessage('projectLogo') ? 'onError' : ''}
                  >
                    {imageList[0]?.data_url === '' ? (
                      <FlexBox flexDirection="column" alignItems="center" justifyContent="center">
                        <img src="/icons/AddFile.svg" alt="Add File" />
                        <Typography variant="captionPoppins" color="text.secondary" fontWeight="400" mt="14px">
                          Drop an image here or select a file
                        </Typography>
                        <Typography variant="body6Poppins" color="text.secondary" fontWeight="400">
                          It must be a JPG, PNG, GIF, TIFF, or BMP, no larger than 200 MB.
                        </Typography>
                      </FlexBox>
                    ) : (
                      imageList?.map((image, index) => (
                        <div key={index} className="image-item">
                          <img src={image['data_url']} alt="" width="100px" height="auto" />
                        </div>
                      ))
                    )}
                  </BoxImageUpload>
                )}
              </ImageUploading>
              <ErrorLabel>{parseErrorMessage('projectLogo')}</ErrorLabel>
            </WrapValue>
          </WrapLine>
          <WrapLine>
            <WrapDescription>
              <TitleText>Sale banner</TitleText>
              <DescribeText>Make it easy for people to learn about your project.</DescribeText>
            </WrapDescription>
            <WrapValue>
              <ImageUploading value={saleBanner} onChange={handleChangeSaleBanner} dataURLKey="data_url">
                {({ imageList, onImageUpload, onImageUpdate, dragProps }) => (
                  <BoxImageUpload
                    onClick={onImageUpload}
                    {...dragProps}
                    className={parseErrorMessage('saleBanner') ? 'onError' : ''}
                  >
                    {imageList[0]?.data_url === '' ? (
                      <FlexBox flexDirection="column" alignItems="center" justifyContent="center">
                        <img src="/icons/AddFile.svg" alt="Add File" />
                        <Typography variant="captionPoppins" color="text.secondary" fontWeight="400" mt="14px">
                          Drop an image here or select a file
                        </Typography>
                        <Typography variant="body6Poppins" color="text.secondary" fontWeight="400">
                          It must be a JPG, PNG, GIF, TIFF, or BMP, no larger than 200 MB.
                        </Typography>
                      </FlexBox>
                    ) : (
                      imageList?.map((image, index) => (
                        <div key={index} className="image-item">
                          <img src={image['data_url']} alt="" width="100%" height="auto" />
                        </div>
                      ))
                    )}
                  </BoxImageUpload>
                )}
              </ImageUploading>
              <ErrorLabel>{parseErrorMessage('saleBanner')}</ErrorLabel>
            </WrapValue>
          </WrapLine>
          <WrapLine>
            <WrapDescription>
              <TitleText>Video promo (optional)</TitleText>
              <DescribeText>
                Add a video that describes your project.
                <br />
                <br />
                Tell people what you’re raising funds to do, how you plan to make it happen, who you are, and why you
                care about this project.
                <br />
                <br />
                After you’ve uploaded your video, use our editor to add captions and subtitles so your project is more
                accessible to everyone.
              </DescribeText>
            </WrapDescription>
            <WrapValue>
              <WrapForm fullWidth>
                <Typography component="label" fontWeight="500">
                  Video URL
                </Typography>
                <InputCustom
                  fullWidth
                  placeholder="Enter url image"
                  value={data.videoPromo}
                  onChange={handleChange('videoPromo')}
                />
              </WrapForm>
            </WrapValue>
          </WrapLine>
          <WrapLine>
            <WrapDescription>
              <TitleText>Community</TitleText>
              <DescribeText>Make it easy for people to learn about your project.</DescribeText>
            </WrapDescription>
            <WrapValue>
              <WrapForm fullWidth>
                <Typography component="label" fontWeight="500">
                  Website <RequireSymbol>*</RequireSymbol>
                </Typography>
                <InputCustom
                  fullWidth
                  className={parseErrorMessage('website') ? 'onError' : ''}
                  placeholder="Enter your website"
                  value={communities.website}
                  onChange={handleChangeCommunities('website')}
                />
                <ErrorLabel>{parseErrorMessage('website')}</ErrorLabel>
              </WrapForm>
              <WrapForm fullWidth>
                <Typography component="label" fontWeight="500">
                  Telegram
                </Typography>
                <InputCustom
                  fullWidth
                  className={parseErrorMessage('telegram') ? 'onError' : ''}
                  placeholder="Enter your telegram"
                  value={communities.telegram}
                  onChange={handleChangeCommunities('telegram')}
                />
                {/* <Typography variant="captionPoppins" color="red.500" fontWeight="400">
                {parseErrorMessage('telegram')}
              </Typography> */}
              </WrapForm>
              <WrapForm fullWidth>
                <Typography component="label" fontWeight="500">
                  Discord
                </Typography>
                <InputCustom
                  fullWidth
                  className={parseErrorMessage('discord') ? 'onError' : ''}
                  placeholder="Enter your discord"
                  value={communities.discord}
                  onChange={handleChangeCommunities('discord')}
                />
                {/* <Typography variant="captionPoppins" color="red.500" fontWeight="400">
                {parseErrorMessage('discord')}
              </Typography> */}
              </WrapForm>
            </WrapValue>
          </WrapLine>
        </Stack>
        <FlexBox justifyContent="flex-end">
          <NextBackButton variant="contained" onClick={handleNextStep}>
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
const WrapLine = styled(Box)`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 30px 0;
`;
const WrapDescription = styled(Box)`
  display: flex;
  flex-direction: column;
  max-width: 328px;
  width: 100%;
`;
const WrapValue = styled(Box)`
  max-width: 617px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const WrapForm = styled(FormControl)`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;


const BoxImageUpload = styled(Box)`
  width: 100%;
  min-height: 191px;
  background-color: ${(props) => (props.theme.palette as any).extra.card.light};
  border: 1px dashed;
  border-color: ${(props) => (props.theme.palette as any).extra.card.divider};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 20px;
  border-radius: 8px;

  &.onError {
    border-color: ${(props) => props.theme.palette.error.main};
    box-shadow: none;
  }
`;



export default Step01;
