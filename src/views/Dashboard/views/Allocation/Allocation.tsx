import React, { useEffect, useState } from 'react';
import { Box, styled, Typography } from '@mui/material';
import Page from 'components/Page';
import AllocationCard from 'components/AllocationCard';
import { useChain } from 'hooks';
import { getJoinedSales } from 'api/launchpad';
import NotSupportSection from 'components/NotSupportSection';
import { ChainId } from '@bionswap/core-sdk';
import SkeletonCard from 'components/SkeletonCard';

const Allocation = () => {
  const { account, chainId } = useChain();
  const [data, setData] = useState<[]>([]);

  useEffect(() => {
    const getDataCliam = async () => {
      try {
        const res = await getJoinedSales(chainId.toString(), account || '');
        setData(res);
        console.log('🚀 ~ file: Allocation.tsx ~ line 15 ~ getDataCliam ~ res', res);
      } catch (error) {
        console.log('error===>', error);
      }
    };

    getDataCliam();
  }, [chainId, account]);

  return (
    <Page>
      <Wrapper>
        <Box mb="50px">
          <Typography variant="h3Samsung">Active Allocation</Typography>
        </Box>
        {ChainId.BSC_TESTNET === chainId ? (
          <FlexBox flexWrap="wrap" gap="30px">
            {data && data.length && account ? (
              data?.map((item: any) => (
                <Item key={item.saleAddress}>
                  <AllocationCard data={item} account={account || ''} />
                </Item>
              ))
            ) : (
              <SkeletonCard />
            )}
          </FlexBox>
        ) : (
          <NotSupportSection />
        )}
      </Wrapper>
    </Page>
  );
};

const FlexBox = styled(Box)`
  display: flex;
`;
const Wrapper = styled(Box)`
  width: 100%;
  padding: 30px 40px;
`;
const Item = styled(Box)`
  max-width: 433px;
  width: 100%;
`;

export default Allocation;
