import React, { useCallback, useEffect, useState } from 'react';
import { Box, Stack, styled, Typography } from '@mui/material';
import Page from 'components/Page';
import ProjectCard from 'components/ProjectCard';
import { getSaleList } from 'api/launchpad';
import { useChain } from 'hooks';
import { ChainId } from '@bionswap/core-sdk';
import NotSupportSection from 'components/NotSupportSection';
import SkeletonCard from 'components/SkeletonCard';
import useMediaQuery from 'hooks/useMediaQuery';
import { toastError } from 'hooks/useToast';

const MyProject = () => {
  const {isMobile , isTablet} = useMediaQuery();
  const { account, chainId } = useChain();
  const [launchData, setLaunchData] = useState<any>(null);
  const [params, setParams] = useState({
    page: 1,
    limit: 12,
    chainId: chainId,
    owner: account,
    keyword: '',
    sortBy: '',
    filterBy: ''
  });

  const getLaunchData = useCallback(async () => {
    try {
      const launchData = await getSaleList(
        params.page,
        params.limit,
        params.chainId.toString(),
        params.owner || '',
        params.keyword,
        params.sortBy,
        params.filterBy
      );
      setLaunchData(launchData);
    } catch (error) {
      console.log('error====>', error);
    }
  },[params.chainId, params.filterBy, params.keyword, params.limit, params.owner, params.page, params.sortBy]);

  useEffect(() => {
    getLaunchData();
  }, [getLaunchData, params]);

  return (
    <Wrapper>
      {ChainId.BSC_TESTNET === chainId ? (
        <Stack width='100%' alignItems='start' justifyContent='start' gap='20px'>
          {launchData && launchData.data ? (
            launchData?.data?.map((item: any) => (
              <WrapItem key={item.title}>
                <ProjectCard data={item} />
              </WrapItem>
            ))
          ) : (
            <SkeletonCard />
          )}
        </Stack>
      ) : (
        <NotSupportSection />
      )}
    </Wrapper>
  );
};

const Wrapper = styled(Box)`
  width: 100%;
`;
const WrapItem = styled(Box)`
  width: 100%;
`;
const Grid = styled(Box)`
  display: grid;
  justify-content: space-between;
`;

export default MyProject;
