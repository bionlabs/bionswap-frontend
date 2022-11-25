import { styled, Box, Container, Stack, Typography } from '@mui/material';
import useMediaQuery from 'hooks/useMediaQuery';
import Image from 'next/image';

const InforConfigs = [
  {
    title: '04',
    description: 'Crypto Network',
  },
  {
    title: '1M',
    description: 'Game Participants',
  },
  {
    title: '2M',
    description: 'Weekly Bonus Points',
  },
  {
    title: '18',
    description: 'Weekly Giveaways',
  },
];

const ChainConfigs = [
  {
    link: '',
    image: '/images/gamecenter/inforAndChainSection/ether.svg',
    ratio: '1/0.25',
  },
  {
    link: '',
    image: '/images/gamecenter/inforAndChainSection/BNB.svg',
    ratio: '1/0.17',
  },
  {
    link: '',
    image: '/images/gamecenter/inforAndChainSection/polygon.svg',
    ratio: '1/0.22',
  },
  {
    link: '',
    image: '/images/gamecenter/inforAndChainSection/OKX.svg',
    ratio: '1/0.3',
  },
];

const InforAndChainSection = () => {
  const { isXs, isMd } = useMediaQuery();

  return (
    <Section>
      <Container>
        <Stack flexDirection={isMd ? 'column' : 'row'} gap="20px">
          <Stack flexDirection="row" gap="20px" flexWrap={isXs ? 'wrap' : 'nowrap'}>
            {InforConfigs?.map((item: any, index: number) => (
              <>
                <Stack key={item.title} flexDirection="row" gap="8px" width={isXs ? 'calc(50% - 32px)' : 'auto'}>
                  <Typography variant="h5Poppins" color="gray.700" fontWeight="700">
                    {item.title}
                  </Typography>
                  <Typography variant="body6Poppins" color="gray.700" fontWeight="600" width="70px">
                    {item.description}
                  </Typography>
                </Stack>
                {!isMd && index !== InforConfigs.length - 1 && <VerticalLine />}
              </>
            ))}
            {isMd}
          </Stack>
          <Stack width='100%' flexDirection="row" gap={isXs ? '40px' : '20px'} flexWrap={isXs ? 'wrap' : 'nowrap'}>
            {ChainConfigs?.map((item: any) => (
              <Box
                key={item.image}
                position="relative"
                width={isXs ? '40%' : '120px'}
                sx={{
                  aspectRatio: item.ratio,
                }}
                
              >
                <Image src={item.image} alt={item.image} layout="fill" objectFit="contain" />
              </Box>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Section>
  );
};

const Section = styled(Box)`
  padding-top: 60px;
  padding-bottom: 60px;
`;
const VerticalLine = styled(Box)`
  width: 1px;
  height: 30px;
  background-color: ${(props) => props.theme.palette.gray[800]};

  @media (max-width: 599px) {
    display: none;
  }
`;

export default InforAndChainSection;
