import { Box, Button, Container, FormControlLabel, Select, styled, Stack } from '@mui/material';
import { getSaleList } from 'api/launchpad';
import { useDebounce, useRefetchIncreasedInterval } from 'hooks';
import { useCallback, useEffect, useState } from 'react';
import LaunchpadCards from './components/LaunchpadCards/LaunchpadCards';
import LaunchpadTable from './components/LaunchpadTable/LaunchpadTable';
import Title from './components/Title/Title';
import Toolbar from './components/Toolbar/Toolbar';

const LaunchPadSection = ({ chainId }: any) => {
  const [view, setView] = useState<string | null>('card');

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const [filter, setFilter] = useState('');
  const filterParams = [
    {
      id: '',
      label: 'All sales'
    },
    {
      id: 'upcoming',
      label: 'Up coming'
    },
    {
      id: 'live',
      label: 'Sales open'
    },
    {
      id: 'ended',
      label: 'Sales closed'
    },
  ];
  

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState<null | {}>({
    page: page,
    limit: 12,
    owner: '',
    keyword: searchQuery,
    sortBy: '-createdAt',
    filterBy: filter
  });

  const [, cancel] = useDebounce(
    () => {
      setLoading(true);
      setParams({ ...params, ['keyword']: searchQuery});
    },
    500,
    [searchQuery],
  );

  const [launchData, setLaunchData]: any = useState(null);
  const getLaunchData = useCallback(
    async (params: any) => {
      try {
        const data = await getSaleList(
          params.page,
          params.limit,
          chainId,
          params.owner,
          params.keyword,
          params.sortBy,
          params.filterBy
        );
        setLaunchData(data);
      } catch (error) {
        setLoading(false);
        cancel();
        console.log('error====>', error);
      }
      setLoading(false);
      cancel()
    },
    [cancel, chainId],
  );

  useRefetchIncreasedInterval(
    async () => {
      await getLaunchData(params);
    },
    0,
    1500,
    [chainId, params, view],
  );

  const handleChangePagigation = (event: any, value: number) => {
    setLoading(true);
    setPage(view =='card' ? value : value + 1);
    setParams({ ...params, page: view =='card' ? value : value + 1 });
    
  };

  const searchKeyword = (event: any) => {
    setLoading(true);
    setSearchQuery(event.target.value);
  };



  const handleChangeView = (event: React.MouseEvent<HTMLElement>, newView: string | null) => {
    if (newView !== null) {
      setView(newView);
    }
    setLoading(true);
    setPage(1);
    setParams({ ...params, page: 1 });
  };

  const handleChangeFilter = (event:any) => {
    setLoading(true);
    setFilter(event.target.value);
    setParams({ ...params, filterBy: filter });
  };

  useEffect(() => {
    getLaunchData(params);
  }, [params, chainId, getLaunchData, view, searchQuery, filter]);

  // const settings = {
  //   arrows: false,
  //   speed: 500,
  //   swipeToSlide: true,
  //   infinite: false,
  //   variableWidth: true,
  // };

  const getViewComponent = () => {
    if (view == 'card') {
      return (
        <LaunchpadCards
          launchData={launchData}
          loading={loading}
          page={page}
          handleChangePagigation={handleChangePagigation}
        />
      )
    } 
    return <LaunchpadTable
            launchData={launchData}
            loading={loading}
            page={page - 1}
            handleChangePagigation={handleChangePagigation}
          />
  };

  console.log(launchData)

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
            <Toolbar
              view={view}
              handleChangeView={handleChangeView}
              searchKeyword={searchKeyword}
              filter={filter}
              filterParams={filterParams}
              handleChangeFilter={handleChangeFilter}
            />
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
