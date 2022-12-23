import { Box, Button, Container, FormControlLabel, Select, styled, Stack } from '@mui/material';
import { useState } from 'react';
import LaunchpadCards from './components/LaunchpadCards/LaunchpadCards';
import LaunchpadTable from './components/LaunchpadTable/LaunchpadTable';
import Title from './components/Title/Title';
import Toolbar from './components/Toolbar/Toolbar';

const LaunchPadSection = ({ chainId }: any) => {
  const [view, setView] = useState<string | null>('card');
  const [searchQuery, setSearchQuery] = useState('');

  // const handleChange = (prop: any) => (event: any) => {
  //   setParams({ ...params, [prop]: event.target.value });
  // };

  const searchKeyword = (event: any) => {
    setSearchQuery(event.target.value);
  };

  // const [, cancelSearch] = useDebounce(
  //   () => {
  //     setParams({ ...params, ['keyword']: searchQuery });
  //   },
  //   500,
  //   [searchQuery],
  // );

  const handleChangeView = (event: React.MouseEvent<HTMLElement>, newView: string | null) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  const settings = {
    arrows: false,
    speed: 500,
    swipeToSlide: true,
    infinite: false,
    variableWidth: true,
  };

  const getViewComponent = () => {
    if (view == 'card') {
      return <LaunchpadCards chainId={chainId} view={view} />;
    } else {
      return <LaunchpadTable chainId={chainId} view={view} />;
    }
  };

  return (
    <Box
      sx={{
        marginTop: { xs: '30px', md: '50px' },
        marginBottom: { xs: '30px', md: '70px' },
      }}
    >
      <Container>
        <Wrapper>
          <Stack width="100%" alignItems="start" spacing={6}>
            <Title title="Current Projects" isCurrent currentMessage="Many ideas waiting for you to reach" />
            <Toolbar view={view} handleChangeView={handleChangeView} searchKeyword={searchKeyword} />
            {getViewComponent()}
          </Stack>
        </Wrapper>
      </Container>
    </Box>
  );
};

const Wrapper = styled(Box)`
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  gap: 62px;
`;
const Flex = styled(Box)`
  display: flex;
`;

const WrapSlideFeatureProject = styled(Box)`
  margin-left: -15px;
  margin-right: -15px;

  .slick-track {
    margin: 0px;
    display: flex;
  }
`;
const Items = styled(Box)`
  padding-left: 15px;
  padding-right: 15px;
  width: 423px !important;

  ${(props) => props.theme.breakpoints.down('sm')} {
    width: 100% !important;
  }
`;
const FormControlLabelCustom = styled(FormControlLabel)`
  margin: 0;

  .MuiRadio-root {
    display: none;
  }

  .MuiTypography-root {
    padding: 6px 25px;
    background-color: transparent;
    border-radius: 8px;
  }

  .Mui-checked + .MuiTypography-root {
    background: rgba(7, 224, 224, 0.15);
    font-weight: 600;
    color: #07e0e0;
  }
`;
const Fillter = styled(Button)`
  width: 118px;
  height: 46px;
  border: 1px solid;
  border-radius: 4px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;
const SelectCustom = styled(Select)`
  border: 1px solid;
  border-radius: 4px;

  .MuiSelect-select {
    font-family: 'Poppins', sans-serif;
    padding: 9.5px 20px;
    font-weight: 400;
    font-size: 16px;
    line-height: 27px;
  }

  fieldset {
    display: none;
  }
`;

export default LaunchPadSection;
