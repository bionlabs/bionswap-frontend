import { crowdfundingConfig } from './config';
import { Box, Container, Typography, useMediaQuery, styled } from '@mui/material';
import Breadcrumb from './components/Breadcrumb';
import HeadDetail from './components/HeadDetail';
import FundraiseArea from './components/FundraiseArea';
import RecomendProjects from './components/RecomendProjects';
import TabsArea from './components/TabsArea';
import { useRouter } from 'next/router';
import { getSaleDetail } from 'api/launchpad';
import { useEffect, useState } from 'react';
import { BUSD_ADDRESS, USDT_ADDRESS, USDC_ADDRESS } from '@bionswap/core-sdk';
import { useToken } from 'hooks/useToken';

const config = [
  {
    icon: '/icons/launchpad/chat-icon.svg',
    content: 'BionSwap connects creators with backers to fund projects and many more features.',
  },
  {
    icon: '/icons/launchpad/reserving-project.svg',
    content: 'Reserving project tokens and extremly rare NFTs if you are lucky enough.',
  },
  {
    icon: '/icons/launchpad/verified-project.svg',
    content: 'Every verified projects is secured and checked by the BionSwap team.',
  },
];

const LaunchpadDetail = () => {
  const isMobile = useMediaQuery('(max-width:767px)');
  const router = useRouter();
  const { slug } = router.query;
  const [data, setData] = useState<any>(null);
  const map = {
    [USDT_ADDRESS[data?.chainId]]: 'USDT',
    [BUSD_ADDRESS[data?.chainId]]: 'BUSD',
    [USDC_ADDRESS[data?.chainId]]: 'USDC',
  };
  const unit = data?.isQuoteETH ? 'BNB' : map[data?.quoteToken]
  const tokenContract = useToken(data?.token);

  const handleGetSaleDetail = async () => {
    try {
      const res = await getSaleDetail(slug);
      console.log('🚀 ~ file: index.tsx ~ line 42 ~ handleGetSaleDetail ~ res', res);
      setData(res);
    } catch (error) {
      console.log('error==>', error);
    }
  };

  useEffect(() => {
    handleGetSaleDetail();
  }, []);

  return (
    <Section component="section">
      <Container maxWidth="xl">
        <Breadcrumb name={data?.title} />
        <HeadDetail
          avarta={data?.logo}
          name={data?.title}
          type={data?.saleType}
          endTime={data?.endTime}
          startTime={data?.startTime}
          unit={unit}
        />
        <FundraiseArea data={data} slug={slug} unit={unit} tokenContract={tokenContract} />
      </Container>
      <WrapService>
        <Container maxWidth="xl">
          <FlexBox
            justifyContent="space-between"
            sx={{
              flexDirection: { xs: 'column', md: 'row' },
              gap: { xs: '40px', md: '30px' },
            }}
          >
            {config.map((item) => (
              <FlexBox key={item.content} gap="25px" alignItems="center">
                <img src={item.icon} alt="" />
                <Box maxWidth="290px" width="100%">
                  <Typography variant="body3Poppins" color="text.primary" fontWeight="400">
                    {item.content}
                  </Typography>
                </Box>
              </FlexBox>
            ))}
          </FlexBox>
        </Container>
      </WrapService>
      <WrapTabRecom>
        <TabsArea isMobile={isMobile} data={crowdfundingConfig[0]} />
        {/* <RecomendProjects data={crowdfundingConfig} /> */}
      </WrapTabRecom>
    </Section>
  );
};

const Section = styled(Box)`
  background-color: #001015;
  padding-top: 42px;
  display: flex;
  flex-direction: column;
  gap: 70px;
`;
const WrapService = styled(Box)`
  background-color: ${(props) => props.theme.palette.gray[900]};
  padding: 57px 0;
`;
const WrapTabRecom = styled(Box)``;
const FlexBox = styled(Box)`
  display: flex;
`;

export default LaunchpadDetail;
