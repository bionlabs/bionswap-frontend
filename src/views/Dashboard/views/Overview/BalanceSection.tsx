import React from 'react';
import { Box, styled, Typography, SvgIcon, Stack } from '@mui/material';
import { MobileProp } from 'configs/Type/Mobile/type';
import Card from '../../components/Card';
import BionTokenIcon from 'assets/icons/BionTokenIcon';
import BionRaiseToken from 'assets/icons/BionRaiseToken';
import Image from 'next/image';

const BalanceSection = ({ isMobile }: MobileProp) => {
  return (
    <Box
      display="grid"
      alignItems="center"
      gap="24px"
      sx={{
        gridTemplateColumns: isMobile ? 'auto' : 'auto auto',
        justifyContent: 'start',
      }}
    >
      <Card
        sx={{
          height: 'fit-content',
          width: '100%',
        }}
      >
        <Flex alignItems="center" gap="16px" flexWrap="wrap">
          <Image src='/bionicon.svg' alt='' width={50} height={50} />
          <Box>
            <Box>
              <Typography variant="caption6Poppins" color="text.secondary">
                Your Balance
              </Typography>
            </Box>
            <Box>
              <Typography variant={isMobile ? 'body4Poppins' : 'h6Poppins'}>0.00 BION</Typography>
            </Box>
          </Box>
        </Flex>
      </Card>
      <Card
        sx={{
          height: 'fit-content',
          width: '100%',
        }}
      >
        <Flex alignItems="center" gap="16px" flexWrap="wrap">
          <Image src='/bionicon.svg' alt='' width={50} height={50} />
          <Box>
            <Box>
              <Typography variant="caption6Poppins" color="text.secondary">
                BION Price
              </Typography>
            </Box>
            <Box>
              <Typography variant={isMobile ? 'body4Poppins' : 'h6Poppins'}>$0.00</Typography>
            </Box>
          </Box>
        </Flex>
      </Card>
      <Card
        sx={{
          height: 'fit-content',
          width: '100%',
        }}
      >
        <Stack gap="5px" width="100%">
          <Box>
            <SvgIcon
              sx={{
                width: '80px',
                height: '80px',
              }}
            >
              <BionRaiseToken />
            </SvgIcon>
          </Box>
          <Typography variant="caption6Poppins" color="text.secondary">
            Daily Earning
          </Typography>
          <Box sx={{ marginBottom: '10px' }}>
            <img src="/icons/dashboard/divider.png" alt="" width="100%" />
          </Box>

          <Typography variant="h4Poppins" sx={{ fontWeight: '600', lineHeight: '1' }}>
            0.00 BION
          </Typography>
          <Typography color='text.secondary'>$0.00</Typography>
        </Stack>
      </Card>
      <Card
        sx={{
          height: 'fit-content',
          width: '100%',
        }}
      >
        <Stack width='100%' gap='5px'>
          <Box>
            <SvgIcon
              sx={{
                width: '80px',
                height: '80px',
              }}
            >
              <BionRaiseToken />
            </SvgIcon>
          </Box>
          <Box>
            <Typography variant="caption6Poppins" color='text.secondary'>
              Total BION Claimed
            </Typography>
          </Box>
          <Box sx={{ marginBottom: '10px' }}>
            <img src="/icons/dashboard/divider.png" alt="" width="100%" />
          </Box>

          <Box>
            <Typography variant="h4Poppins" sx={{ fontWeight: '600', lineHeight: '1' }}>
              0.00 BION
            </Typography>
          </Box>
          <Box>
            <Typography color='text.secondary'>$0.00</Typography>
          </Box>
        </Stack>
      </Card>
    </Box>
  );
};

const Flex = styled(Box)`
  display: flex;
`;

export default BalanceSection;
