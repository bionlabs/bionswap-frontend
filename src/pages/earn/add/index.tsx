import {
  Box,
  Button,
  Container,
  FormControlLabel,
  Select,
  styled,
  Stack,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { useState } from 'react';
import Page from 'components/Page';
import { useRouter } from 'next/router';
import HomeIcon from '@mui/icons-material/Home';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { CHAIN_INFO_MAP } from 'configs/chain';
import Image from 'next/image';
import { getChainIcon } from 'utils/chains';
import { Chain } from 'wagmi';

const AddPool = () => {
  const [view, setView] = useState<string | null>('card');
  const [chain, setChain] = useState<Chain>({
    id: 97,
    name: 'BNB Testnet',
    network: 'bsc-testnet',
    testnet: true,
    nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
    rpcUrls: { default: 'https://rpc.ankr.com/bsc_testnet_chapel' },
    blockExplorers: {
      etherscan: { name: 'BNB Chain Explorer', url: 'https://testnet.bscscan.com' },
      default: { name: 'BNB Chain Explorer', url: 'https://testnet.bscscan.com' },
    },
  });
  const router = useRouter();
  const [iconColor, setIconColor] = useState('#475569');
  const handleChangeView = (event: React.MouseEvent<HTMLElement>, newView: string | null) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  const settings = {
    arrows: false,
    speed: 500,
    swipeToSlide: true,
    infinite: false,
    variableWidth: true,
  };

  return (
    <Page>
      <Container>
        <Wrapper>
          <Stack width="100%" alignItems="start" spacing={6}>
            <Box display="flex" justifyContent="center">
              <HomeIcon
                sx={{
                  color: iconColor,
                  cursor: 'pointer',
                  marginRight: '8px',
                }}
                onMouseOver={() => setIconColor('white')}
                onMouseOut={() => setIconColor('#475569')}
                onClick={() => router.replace('/earn')}
                fontSize="small"
              />
              <ArrowForwardIosIcon
                sx={{
                  color: '#475569',
                  marginRight: '8px',
                }}
                fontSize="small"
              />
              <Typography fontSize="14px" fontWeight="500">
                Add
              </Typography>
            </Box>
            <Box>
              <Accordion
                sx={{
                  backgroundColor: (theme) => (theme.palette as any).extra.swapPanel.panel,
                  backgroundImage: 'none',
                  borderRadius: '8px!important',
                  boxShadow: 'none',
                  width: '100%',
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <Image
                      src={getChainIcon(chain?.id ?? 97)?.iconUrl}
                      layout="fixed"
                      alt=""
                      width={15}
                      height={15}
                      style={{ marginLeft: '15px' }}
                    />
                  }
                  sx={{
                    '& .MuiAccordionSummary-expandIconWrapper': {
                      transition: 'none',
                      '&.Mui-expanded': {
                        transform: 'none',
                      },
                    },
                  }}
                >
                  1. Select Network
                </AccordionSummary>

                <AccordionDetails>
                  <div>
                    Selected:{' '}
                    <Typography fontSize="14px" fontWeight={600}>
                      {chain?.name}
                    </Typography>
                  </div>
                  <Stack direction="row" spacing={1} sx={{ marginTop: '10px' }}>
                    {Object.entries(CHAIN_INFO_MAP).map(([, chainData]) => (
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '30%',
                          width: '40px',
                          height: '40px',
                          backgroundColor: chain.id === chainData.id ? '#313F52' : '',
                          ':hover': {
                            border: '1px solid #313F52',
                          },
                          cursor: 'pointer',
                        }}
                        onClick={() => setChain(chainData)}
                      >
                        <Image src={getChainIcon(chainData.id)?.iconUrl} layout="fixed" alt="" width={15} height={15} />
                      </Box>
                    ))}
                  </Stack>
                </AccordionDetails>
              </Accordion>
            </Box>
          </Stack>
        </Wrapper>
      </Container>
    </Page>
  );
};

const Wrapper = styled(Box)`
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  gap: 62px;
`;

export default AddPool;
