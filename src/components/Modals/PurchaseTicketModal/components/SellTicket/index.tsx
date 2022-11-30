import { Box, Stack, Typography, styled } from '@mui/material';
import Image from 'next/image';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Link from 'next/link';

const nftLinks = [
  {
    icon: '',
    name: 'Tofu NFT',
    nftVolume: '45000',
    link: '',
  },
  {
    icon: '',
    name: 'Open sea',
    nftVolume: '45000',
    link: '',
  },
];

const SellTicket = () => {
  return (
    <Stack gap="20px">
      <Typography variant="body3Poppins" color="gray.300" fontWeight="400" lineHeight="180%">
        NFT game tickets already have quite significant trade volume. Now, if you want to, you can sell them towards
        these flatform.{' '}
        <Link href="">
          <Typography variant="body3Poppins" color="primary.main" fontWeight="400" lineHeight="180%" sx={{
            textDecoration: 'underline'
          }}>
            Learn more
          </Typography>
        </Link>
      </Typography>
      {nftLinks.map((item: any) => (
        <WrapBox key={item.name} flexDirection="row" gap="15px" width="100%">
          <Box position="relative" width="50" height="50">
            <Image src={item.icon} alt={item.name} layout="fill" objectFit="contain" />
          </Box>
          <Stack gap="4px">
            <Typography variant="body3Poppins">{item.name}</Typography>
            <Typography>NFT volume: {item.nftVolume}$</Typography>
          </Stack>
          <Link href={item.link}>
            <OpenInNewIcon />
          </Link>
        </WrapBox>
      ))}
    </Stack>
  );
};

const WrapBox = styled(Stack)`
  border: 1px solid #373f47;
  border-radius: 4px;
  padding: 20px 15px;
`;

export default SellTicket;
