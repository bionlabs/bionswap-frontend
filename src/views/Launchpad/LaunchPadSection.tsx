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
      label: 'All sales',
    },
    {
      id: 'upcoming',
      label: 'Up coming',
    },
    {
      id: 'live',
      label: 'Sales open',
    },
    {
      id: 'ended',
      label: 'Sales closed',
    },
  ];

  const [sort, setSort] = useState('-createdAt');
  const sortParams = [
    {
      id: '-createdAt',
      label: 'Last date',
    },
    {
      id: '+createdAt',
      label: 'Previous date',
    },
    {
      id: '-updatedAt',
      label: 'Last updated',
    },
    {
      id: '+updatedAt',
      label: 'Previous updated',
    },
  ];

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState<null | {}>({
    page: page,
    limit: 12,
    owner: '',
    keyword: searchQuery,
    sortBy: sort,
    filterBy: filter,
  });

  const [, cancel] = useDebounce(
    () => {
      setLoading(true);
      setParams({ ...params, keyword: searchQuery });
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
          params.filterBy,
        );
        setLaunchData(data);
      } catch (error) {
        setLoading(false);
        console.log('error====>', error);
      }
      setLoading(false);
    },
    [chainId],
  );

  useRefetchIncreasedInterval(
    async () => {
      await getLaunchData(params);
    },
    0,
    1500,
    [chainId, params, view, filter, sort],
  );

  const handleChangePagigation = (event: any, value: number) => {
    setLoading(true);
    setPage(view == 'card' ? value : value + 1);
    setParams({ ...params, page: view == 'card' ? value : value + 1 });
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

  const handleChangeFilter = (event: any, value: string) => {
    setLoading(true);
    setFilter(event.target.value);
    setParams({ ...params, filterBy: value });
  };

  const handleChangeSort = (event: any, value: string) => {
    setLoading(true);
    setSort(event.target.value);
    setParams({ ...params, sortBy: value });
  };

  useEffect(() => {
    getLaunchData(params);
  }, [params, chainId, getLaunchData, view, searchQuery]);

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
      );
    }
    return (
      <LaunchpadTable
        launchData={launchData}
        loading={loading}
        page={page - 1}
        handleChangePagigation={handleChangePagigation}
      />
    );
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
            <Toolbar
              view={view}
              handleChangeView={handleChangeView}
              searchKeyword={searchKeyword}
              filter={filter}
              filterParams={filterParams}
              handleChangeFilter={handleChangeFilter}
              sort={sort}
              sortParams={sortParams}
              handleChangeSort={handleChangeSort}
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

export default LaunchPadSection;
