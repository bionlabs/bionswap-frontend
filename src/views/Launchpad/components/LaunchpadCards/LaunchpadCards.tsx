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
    <>
      <Stack
        direction="row"
        flexWrap="wrap"
        alignItems="start"
        justifyContent="center"
        width="100%"
        sx={{
          gap: '20px',
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
  width: 370px;
`;

export default LaunchpadCards;
