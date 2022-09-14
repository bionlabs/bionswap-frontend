import {
  Box,
  styled,
  Typography,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Container,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Pagination
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import React from 'react'
import Slider from "react-slick";
import { crowdfundingConfig } from 'views/Crowdfunding/config'
import Title from './components/Title/Title'
import Card from 'components/Card'

const tags = [
  {
    label: 'Explore',
    value: 0
  },
  {
    label: 'Game',
    value: 1
  },
  {
    label: 'Metaverse',
    value: 2
  },
  {
    label: 'Defi',
    value: 3
  },
]

const LaunchPadSection = () => {
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const settings = {
    arrows: false,
    speed: 500,
    // slidesToShow: 4,
    swipeToSlide: true,
    infinite: false,
    // infinite: (crowdfundingConfig.length > 3),
    variableWidth: true,

    // responsive: [
    //   {
    //     breakpoint: 1300,
    //     settings: {
    //       slidesToShow: 3,
    //       infinite: (crowdfundingConfig.length > 2),
    //     }
    //   },
    //   {
    //     breakpoint: 900,
    //     settings: {
    //       slidesToShow: 2,
    //       infinite: (crowdfundingConfig.length > 1),
    //     }
    //   },
    //   {
    //     breakpoint: 600,
    //     settings: {
    //       slidesToShow: 1,
    //     }
    //   }
    // ]
  };

  return (
    <Box sx={{
      marginTop: { xs: '30px', md: '50px' },
      marginBottom: { xs: '30px', md: '70px' }
    }}>
      <Container maxWidth='xl'>
        <Wrapper>
          <Section>
            <Title title='Feature Project' />
            <WrapSlideFeatureProject>
              <Slider {...settings}>
                {
                  crowdfundingConfig?.map((item, idex) => (
                    <Items key=''>
                      <Card data={item} />
                    </Items>
                  ))
                }
                {
                  crowdfundingConfig?.map((item, idex) => (
                    <Items key=''>
                      <Card data={item} />
                    </Items>
                  ))
                }
              </Slider>
            </WrapSlideFeatureProject>
          </Section>
          <Section>
            <Title
              title='Current Projects'
              isCurrent
              currentMessage='Many ideas waiting for you to reach'
            />
            <TextField
              variant="standard"
              placeholder='Search by project name, token contract address or token symbol'
              sx={{
                '.MuiInputBase-root': {
                  padding: '12px',
                },

                'input': {
                  fontWeight: '400',
                  fontSize: '16px',
                  lineHeight: '180%',
                  color: '#ffffff',

                  '&:placeholder': {
                    fontWeight: '400',
                    fontSize: '16px',
                    lineHeight: '180%',
                    color: '#717D8A',
                  }
                },

                '.MuiInput-root:before': {
                  borderBottom: '2px solid #4F5B67'
                }
              }}
              InputProps={{
                endAdornment:
                  <InputAdornment position="end">
                    <SearchIcon sx={{ color: 'gray.500' }} />
                  </InputAdornment>,
              }}
            />
            <Flex alignItems='center' justifyContent='space-between'>
              <FormControl>
                <SelectCustom
                  value=""
                  // onChange={handleChange}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        bgcolor: '#000000',
                        '.MuiList-root': {
                          padding: '0',
                          border: '1px solid',
                          borderColor: '#373F47',
                          overflow: 'hidden',
                          boxShadow: '0px 4px 11px #000000',
                        },

                        '& .MuiMenuItem-root': {
                          padding: 1,
                          bgcolor: '#000000',
                        },
                      },
                    },

                  }}
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value={10}>New launch </MenuItem>
                  <MenuItem value={20}>Verified</MenuItem>
                  <MenuItem value={30}>Loved by Bionswap</MenuItem>
                </SelectCustom>
              </FormControl>
              <Box sx={{
                display: { xs: 'none', md: 'block' }
              }}>
                <RadioGroup
                  row
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={0}
                // onChange={handleChange}
                >
                  {
                    tags.map(item => (
                      <FormControlLabelCustom key={item.value} value={item.value} control={<Radio />} label={item.label} />
                    ))
                  }
                </RadioGroup>
              </Box>
              <Box>
                <Fillter>
                  <Typography variant='body3Poppins' color='text.primary' fontWeight='400' >
                    Fillter
                  </Typography>
                  <img src='/icons/launchpad/filter_list.svg' alt='filter_list' />
                </Fillter>
              </Box>
            </Flex>
            <Flex flexWrap='wrap' sx={{
              gap: { xs: '20px', lg: '40px' }
            }}>
              {
                crowdfundingConfig?.map((item, idex) => (
                  <WrapItem key={item.slug} >
                    <Card data={item} />
                  </WrapItem>
                ))
              }
              {
                crowdfundingConfig?.map((item, idex) => (
                  <WrapItem key={item.slug} >
                    <Card data={item} />
                  </WrapItem>
                ))
              }
            </Flex>
          </Section>
          <Flex alignItems='center' justifyContent='center'>
            <Pagination count={10} color="primary" />
          </Flex>
        </Wrapper>
      </Container>
    </Box>
  )
}

const Wrapper = styled(Box)`
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  gap: 62px;
`
const Flex = styled(Box)`
  display: flex;
`
const Section = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 30px;
`
const WrapItem = styled(Box)`
  width: calc(100% / 4 - 30px);

  ${props => props.theme.breakpoints.down("xl")} {
    width: calc(100% / 3 - 30px);
  }

  ${props => props.theme.breakpoints.down("lg")} {
    width: calc(100% / 3 - 14px);
  }

  ${props => props.theme.breakpoints.down("md")} {
    width: calc(100% / 2 - 10px);
  }

  ${props => props.theme.breakpoints.down("sm")} {
    width: 100%;
  }
`
const WrapSlideFeatureProject = styled(Box)`
  margin-left: -15px;
  margin-right: -15px;

  .slick-track {
    margin: 0px;
    display: flex;
  }
`
const Items = styled(Box)`
  padding-left: 15px;
  padding-right: 15px;
  width: 423px !important;

  ${props => props.theme.breakpoints.down("sm")} {
    width: 100% !important;
  }
`
const FormControlLabelCustom = styled(FormControlLabel)`
  margin: 0;

  .MuiRadio-root {
    display: none;
  }

  .MuiTypography-root {
    padding: 6px 25px;
    color: ${props => props.theme.palette.gray[600]};
    background-color: transparent;
    border-radius: 8px;   
  }

  .Mui-checked + .MuiTypography-root {
    background: rgba(7, 224, 224, 0.15);
    font-weight: 600;
    color: #07E0E0;
  }
`
const Fillter = styled(Button)`
  width: 118px;
  height: 46px;
  border: 1px solid;
  border-color: ${props => props.theme.palette.gray[600]};
  border-radius: 4px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`
const SelectCustom = styled(Select)`
  border: 1px solid;
  border-color: ${props => props.theme.palette.gray[600]};
  border-radius: 4px;

  .MuiSelect-select {
    font-family: 'Poppins', sans-serif;
    padding: 9.5px 20px;
    font-weight: 400;
    font-size: 16px;
    line-height: 27px;
    color: ${props => props.theme.palette.blue[100]};
  }

  fieldset {
    display: none;
  }
`

export default LaunchPadSection