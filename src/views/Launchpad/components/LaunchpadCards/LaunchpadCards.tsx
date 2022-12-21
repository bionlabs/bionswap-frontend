import React, { useCallback, useEffect, useState } from 'react';
import { Box, Stack, styled, Pagination } from '@mui/material';
import Card from 'components/Card';
import SkeletonCard from 'components/SkeletonCard';
import NoDataView from 'components/NoDataView';
import { getSaleList } from 'api/launchpad';
import { useRefetchIncreasedInterval } from 'hooks';

interface CardProps {
  chainId: any;
  view: string;
}

const LaunchpadCards = ({ chainId, view }: CardProps) => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState<null | {}>({
    page: page,
    limit: 12,
    owner: '',
    keyword: '',
    sortBy: '-createdAt',
  });

  const [launchData, setLaunchData]: any = useState(null);
  const getLaunchData = useCallback(
    async (params: any) => {
      try {
        const launchData = await getSaleList(
          params.page,
          params.limit,
          chainId,
          params.owner,
          params.keyword,
          params.sortBy,
        );
        setLaunchData(launchData);
      } catch (error) {
        setLoading(false);
        console.log('error====>', error);
      }
      setLoading(false);
    },
    [chainId, setLoading],
  );

  useRefetchIncreasedInterval(
    async () => {
      await getLaunchData(params);
    },
    0,
    1500,
    [chainId, params, view],
  );

  useEffect(() => {
    getLaunchData(params);
  }, [params, chainId, getLaunchData, view]);

  const handleChangePagigation = (event: any, value: number) => {
    setLoading(true);
    setParams({ ...params, page: value });
    setPage(value);
  };

  return (
    <>
      <Stack
        direction="row"
        flexWrap="wrap"
        alignItems="start"
        justifyContent="space-between"
        width="100%"
        sx={{
          gap: { xs: '20px', lg: '40px' },
        }}
      >
        {launchData && !loading ? (
          launchData?.data?.map((item: any) => (
            <WrapItem key={item?.saleAddress}>
              <Card data={item} />
            </WrapItem>
          ))
        ) : (
          <SkeletonCard />
        )}
      </Stack>
      <Stack width="100%" alignItems='end'>
        <Pagination
          count={launchData?.totalPages}
          page={page}
          onChange={handleChangePagigation}
          color="primary"
          shape="rounded"
          showFirstButton
          showLastButton
        />
      </Stack>
    </>
  );
};

const WrapItem = styled(Box)`
  width: calc(100% / 3 - 30px);

  ${(props) => props.theme.breakpoints.down('lg')} {
    width: calc(100% / 3 - 14px);
  }

  ${(props) => props.theme.breakpoints.down('md')} {
    width: calc(100% / 2 - 10px);
  }

  ${(props) => props.theme.breakpoints.down('sm')} {
    width: 100%;
  }
  max-width: 395px;
`;

export default LaunchpadCards;
