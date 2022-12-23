import React, { useCallback, useEffect, useState } from 'react';
import { Box, Stack, styled, Pagination } from '@mui/material';
import Card from 'components/Card';
import SkeletonCard from 'components/SkeletonCard';
import NoDataView from 'components/NoDataView';
import { getSaleList } from 'api/launchpad';
import { useRefetchIncreasedInterval } from 'hooks';

interface CardProps {
  launchData: any;
  loading: boolean;
  page: number
  handleChangePagigation: (event: any, value: number) => void
}

const LaunchpadCards = ({ launchData, loading , page, handleChangePagigation }: CardProps) => {
  

  return (
    <Stack width='100%' justifyContent='start' gap='40px'>
      <Stack
        direction="row"
        flexWrap="wrap"
        alignItems="start"
        justifyContent="flex-start"
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
    </Stack>
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
