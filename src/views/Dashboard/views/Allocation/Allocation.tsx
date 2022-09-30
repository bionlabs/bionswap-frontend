import React, { useEffect, useState } from 'react';
import { Box, styled, Typography } from '@mui/material';
import Page from 'components/Page';
import AllocationCard from 'components/AllocationCard';
import { useChain } from 'hooks';
import { getJoinedSales } from 'api/launchpad';
import NotSupportSection from 'components/NotSupportSection';
import { ChainId } from '@bionswap/core-sdk';

const Allocation = () => {
  const { account, chainId } = useChain();
  const [data, setData] = useState<any>(null);

  const getDataCliam = async () => {
    try {
      const res = await getJoinedSales(chainId.toString(), account || '');
      setData(res);
      console.log('🚀 ~ file: Allocation.tsx ~ line 15 ~ getDataCliam ~ res', res);
    } catch (error) {
      console.log('error===>', error);
    }
  };

  useEffect(() => {
    getDataCliam();
  }, []);

  return (
    <Page>
      <Wrapper>
        <Typography variant="h3Samsung">Active Allocation</Typography>
        {ChainId.BSC_TESTNET === chainId ? (
          <Box>
            {data?.map((item: any) => (
              <Item key={item.saleAddress}>
                <AllocationCard data={item} account={account || ''} />
              </Item>
            ))}
          </Box>
        ) : (
          <NotSupportSection />
        )}
      </Wrapper>
    </Page>
  );
};

const Wrapper = styled(Box)`
  width: 100%;
  padding: 30px 40px;
`;
const Item = styled(Box)`
  max-width: 433px;
`;

export default Allocation;
