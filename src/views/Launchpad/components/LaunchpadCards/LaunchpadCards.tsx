import React, { useCallback, useEffect, useState } from 'react';
import { Box, Stack, styled, Pagination } from '@mui/material';
import Card from 'components/Card';
import SkeletonCard from 'components/SkeletonCard';
import NoDataView from 'components/NoDataView';
import { getSaleList } from 'api/launchpad';
import { useRefetchIncreasedInterval } from 'hooks';
import useMediaQuery from 'hooks/useMediaQuery';

interface CardProps {
  launchData: any;
  loading: boolean;
  page: number
  handleChangePagigation: (event: any, value: number) => void
}

const LaunchpadCards = ({ launchData, loading , page, handleChangePagigation }: CardProps) => {
  const {isMobile} = useMediaQuery();

  return (
    <>
      <Box
        sx={{
          gap: isMobile ? '20px' : '30px', display: 'grid', width: '100%',
          gridTemplateColumns: 'repeat(auto-fill, minmax(325px, 1fr))'
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
      </Box>
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
  width: 100%;
`;

export default LaunchpadCards;
