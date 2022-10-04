import React, { useEffect, useState } from 'react';
import { Box, Typography, styled, FormControl, OutlinedInput, Button } from '@mui/material';
import { setPresaleForm } from 'state/presale/action';
import ImageUploading from 'react-images-uploading';
import { uploadLaunchpadImage } from 'api/launchpad';
import Joi, { CustomHelpers, CustomValidator } from 'joi';

const Step01 = ({ data, setData, handleNext, communityDetail }: any) => {
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
  const [feildEditing, setFeildEditing] = useState('');
  const [errors, setErrors] = useState([]);
  const [communities, setCommunities] = useState({
    website: communityDetail['website'] || '',
    telegram: communityDetail['telegram'] || '',
    discord: communityDetail['discord'] || '',
  });

  const validate = async (parram: string) => {
    try {
      let schemaStep01: any = null;

      switch (parram) {
        case 'projectTitle':
          schemaStep01 = Joi.object({
            projectTitle: Joi.string().required().label('Project title'),
          });
          break;
        case 'projectLogo':
          schemaStep01 = Joi.object({
            projectLogo: Joi.string().required().label('Project logo'),
          });
          break;
        case 'saleBanner':
          schemaStep01 = Joi.object({
            saleBanner: Joi.string().required().label('Sale banner'),
          });
          break;
        case 'website':
          schemaStep01 = Joi.object({
            saleBanner: Joi.string().required().label('Website'),
          });
          break;
      }

      const value = await schemaStep01?.validateAsync(
        {
          [parram]: data[parram],
        },
        { abortEarly: false },
      );
      return value;
    } catch (error: any) {
      console.log(error);
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

  useEffect(() => {
    const handleValidate = async () => {
      try {
        const validation = await validate(feildEditing);
        if (!validation) return;
      } catch (error: any) {
        console.log('error==>', error);
      }
    };

    handleValidate();
  }, [data, communities]);

  const onChangeProjectLogo = async (imageList: any) => {
    try {
      const logoBase64 = imageList[0].data_url.split(',')[1];
      const imageLogo = await uploadLaunchpadImage(logoBase64);
      setProjectLogo(imageList);
      setData(setPresaleForm({ ['projectLogo']: imageLogo.url }));
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeSaleBanner = async (imageList: any) => {
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
    setFeildEditing(prop);
  };

  const handleChangeCommunities = (prop: any) => (event: any) => {
    setCommunities({ ...communities, [prop]: event.target.value });
    setFeildEditing(prop);
  };

  return (
    <FlexBox flexDirection="column" gap="46px" pt="40px" pb="40px">
      <FlexBox flexDirection="column" alignItems="center">
        <Typography variant="h3" color="text.primary" fontWeight="400">
          1. Start with the basics
        </Typography>
        <Typography variant="body3Poppins" color="gray.400" fontWeight="400">
          Make it easy for people to learn about your project.
        </Typography>
      </FlexBox>
      <FlexBox flexDirection="column">
        <WrapLine>
          <WrapDescription>
            <Typography variant="body2Poppins" color="text.primary" fontWeight="400">
              Project title
            </Typography>
            <Typography variant="body4Poppins" className="content" color="#717D8A" fontWeight="400">
              Write a clear, brief title to help people quickly understand your project. Both will appear on your
              project and pre-launch pages.
            </Typography>
          </WrapDescription>
          <WrapValue>
            <WrapForm fullWidth>
              <Typography component="label" variant="body4Poppins" color="blue.100" fontWeight="500">
                Title <RequireSymbol component="span">*</RequireSymbol>
              </Typography>
              <InputCustom
                placeholder="Enter project title"
                className={onShowError('projectTitle') ? 'onError' : ''}
                value={data.projectTitle}
                onChange={handleChange('projectTitle')}
                fullWidth
              />
              <Typography variant="captionPoppins" color="red.500" fontWeight="400">
                {onShowError('projectTitle')}
              </Typography>
            </WrapForm>
          </WrapValue>
        </WrapLine>
        <WrapLine>
          <WrapDescription>
            <Typography variant="body2Poppins" color="text.primary" fontWeight="400">
              Project logo
            </Typography>
            <Typography variant="body4Poppins" className="content" color="#717D8A" fontWeight="400">
              Make it easy for people to learn about your project.
            </Typography>
          </WrapDescription>
          <WrapValue>
            <ImageUploading value={projectLogo} onChange={onChangeProjectLogo} dataURLKey="data_url">
              {({ imageList, onImageUpload, onImageUpdate, dragProps }) => (
                <BoxImageUpload
                  onClick={onImageUpload}
                  {...dragProps}
                  className={onShowError('projectLogo') ? 'onError' : ''}
                >
                  {imageList[0]?.data_url === '' ? (
                    <FlexBox flexDirection="column" alignItems="center" justifyContent="center">
                      <img src="/icons/AddFile.svg" alt="Add File" />
                      <Typography variant="captionPoppins" color="blue.100" fontWeight="400" mt="14px">
                        Drop an image here or select a file
                      </Typography>
                      <Typography variant="body6Poppins" color="gray.600" fontWeight="400">
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
            <Typography variant="captionPoppins" color="red.500" fontWeight="400">
              {onShowError('projectLogo')}
            </Typography>
          </WrapValue>
        </WrapLine>
        <WrapLine>
          <WrapDescription>
            <Typography variant="body2Poppins" color="text.primary" fontWeight="400">
              Sale banner
            </Typography>
            <Typography variant="body4Poppins" className="content" color="#717D8A" fontWeight="400">
              Make it easy for people to learn about your project.
            </Typography>
          </WrapDescription>
          <WrapValue>
            <ImageUploading value={saleBanner} onChange={onChangeSaleBanner} dataURLKey="data_url">
              {({ imageList, onImageUpload, onImageUpdate, dragProps }) => (
                <BoxImageUpload
                  onClick={onImageUpload}
                  {...dragProps}
                  className={onShowError('saleBanner') ? 'onError' : ''}
                >
                  {imageList[0]?.data_url === '' ? (
                    <FlexBox flexDirection="column" alignItems="center" justifyContent="center">
                      <img src="/icons/AddFile.svg" alt="Add File" />
                      <Typography variant="captionPoppins" color="blue.100" fontWeight="400" mt="14px">
                        Drop an image here or select a file
                      </Typography>
                      <Typography variant="body6Poppins" color="gray.600" fontWeight="400">
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
            <Typography variant="captionPoppins" color="red.500" fontWeight="400">
              {onShowError('saleBanner')}
            </Typography>
          </WrapValue>
        </WrapLine>
        <WrapLine>
          <WrapDescription>
            <Typography variant="body2Poppins" color="text.primary" fontWeight="400">
              Video promo (optional)
            </Typography>
            <Typography variant="body4Poppins" className="content" color="#717D8A" fontWeight="400">
              Add a video that describes your project.
              <br />
              <br />
              Tell people what you’re raising funds to do, how you plan to make it happen, who you are, and why you care
              about this project.
              <br />
              <br />
              After you’ve uploaded your video, use our editor to add captions and subtitles so your project is more
              accessible to everyone.
            </Typography>
          </WrapDescription>
          <WrapValue>
            <WrapForm fullWidth>
              <Typography component="label" variant="body4Poppins" color="blue.100" fontWeight="500">
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
        <WrapLine
          sx={{
            borderBottom: '1px solid',
            borderColor: 'gray.600',
          }}
        >
          <WrapDescription>
            <Typography variant="body2Poppins" color="text.primary" fontWeight="400">
              Community
            </Typography>
            <Typography variant="body4Poppins" className="content" color="#717D8A" fontWeight="400">
              Make it easy for people to learn about your project.
            </Typography>
          </WrapDescription>
          <WrapValue>
            <WrapForm fullWidth>
              <Typography component="label" variant="body4Poppins" color="blue.100" fontWeight="500">
                Website <RequireSymbol component="span">*</RequireSymbol>
              </Typography>
              <InputCustom
                fullWidth
                className={onShowError('website') ? 'onError' : ''}
                placeholder="Enter your website"
                value={communities.website}
                onChange={handleChangeCommunities('website')}
              />
              <Typography variant="captionPoppins" color="red.500" fontWeight="400">
                {onShowError('website')}
              </Typography>
            </WrapForm>
            <WrapForm fullWidth>
              <Typography component="label" variant="body4Poppins" color="blue.100" fontWeight="500">
                Telegram
              </Typography>
              <InputCustom
                fullWidth
                className={onShowError('telegram') ? 'onError' : ''}
                placeholder="Enter your telegram"
                value={communities.telegram}
                onChange={handleChangeCommunities('telegram')}
              />
              {/* <Typography variant="captionPoppins" color="red.500" fontWeight="400">
                {onShowError('telegram')}
              </Typography> */}
            </WrapForm>
            <WrapForm fullWidth>
              <Typography component="label" variant="body4Poppins" color="blue.100" fontWeight="500">
                Discord
              </Typography>
              <InputCustom
                fullWidth
                className={onShowError('discord') ? 'onError' : ''}
                placeholder="Enter your discord"
                value={communities.discord}
                onChange={handleChangeCommunities('discord')}
              />
              {/* <Typography variant="captionPoppins" color="red.500" fontWeight="400">
                {onShowError('discord')}
              </Typography> */}
            </WrapForm>
          </WrapValue>
        </WrapLine>
      </FlexBox>
      <FlexBox justifyContent="flex-end">
        <Next onClick={() => handleNext(1)}>
          <Typography variant="body3Poppins" color="#000000" fontWeight="600">
            Next
          </Typography>
        </Next>
      </FlexBox>
    </FlexBox>
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
  border-top: 1px solid;
  border-color: ${(props) => props.theme.palette.gray[600]};
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
const Next = styled(Button)`
  max-width: 200px;
  width: 100%;
  height: 45px;
  align-item: center;
  justify-content: center;
  display: flex;
  background-color: ${(props) => props.theme.palette.primary.main};
  border-radius: 4px;
`;
const WrapForm = styled(FormControl)`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
const InputCustom = styled(OutlinedInput)`
  fieldset {
    display: none;
  }

  input {
    font-family: 'Poppins', sans-serif;
    padding: 12px 16px;
    border: 1px solid;
    border-color: ${(props) => props.theme.palette.gray[700]};
    border-radius: 4px;
    font-weight: 400;
    font-size: 14px;
    line-height: 180%;
    color: ${(props) => props.theme.palette.text.primary};

    &::placeholder {
      font-family: 'Poppins', sans-serif;
      font-weight: 400;
      font-size: 14px;
      line-height: 180%;
      color: ${(props) => props.theme.palette.gray[700]};
      opacity: 1;
    }
  }

  &.Mui-focused {
    input {
      border-color: #9a6aff;
      box-shadow: rgba(175, 137, 255, 0.4) 0px 0px 0px 2px, rgba(175, 137, 255, 0.65) 0px 4px 6px -1px,
        rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
    }
  }

  &.onError {
    input {
      border-color: ${(props) => props.theme.palette.red[500]};
      box-shadow: none;
    }
  }
`;
const RequireSymbol = styled(Box)`
  color: ${(props) => props.theme.palette.red[500]};
`;
const BoxImageUpload = styled(Box)`
  width: 100%;
  min-height: 191px;
  background: rgba(12, 22, 32, 0.5);
  border: 1px dashed;
  border-color: ${(props) => props.theme.palette.gray[700]};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 20px;

  &.onError {
    border-color: ${(props) => props.theme.palette.red[500]};
    box-shadow: none;
  }
`;

export default Step01;
