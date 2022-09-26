import {
  Box,
  Container,
  Typography,
  linearProgressClasses,
  LinearProgress,
  styled,
  Button,
  Tabs,
  Tab,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { useRouter } from 'next/router';
import { getSaleDetail } from 'api/launchpad';
import { useEffect, useState } from 'react';
import { BUSD_ADDRESS, USDT_ADDRESS, USDC_ADDRESS, NATIVE } from '@bionswap/core-sdk';
import { useToken } from 'hooks/useToken';
import { isAddress } from 'utils/validate';
import { usePresaleContract } from 'hooks/useContract';
import { useChain, useSingleCallResult } from 'hooks';
import { useTotalSupply } from 'hooks/useTotalSupply';
import { formatEther } from 'ethers/lib/utils';
import CountDownTime from './CountDownTime';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#F1F1F1',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#1C7744',
  },
}));

const saleTypes = [
  {
    value: "PRE_SALE",
    label: 'Pre Sale',
  },
  {
    value: "WHITELIST",
    label: 'Whitelist',
  },
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const MyProjectDetail = () => {
  const { account, chainId } = useChain();
  const router = useRouter();
  const { slug } = router.query;
  const [data, setData] = useState<any>(null);
  const token = useToken(data?.token);
  const hardCap = formatEther(data?.hardCap || 0);
  const price = formatEther(data?.price || 0);
  const listingPrice = formatEther(data?.listingPrice || 0);
  const minBuy = formatEther(data?.minPurchase || 0);
  const maxBuy = formatEther(data?.maxPurchase || 0);
  const presaleContract = usePresaleContract(data?.saleAddress);

  const currentCap = formatEther(useSingleCallResult(presaleContract, 'currentCap')?.result?.[0] || 0);
  const contributors = 0;
  const totalSupply = useTotalSupply(token || undefined)?.toExact(0);
  const tokensForPresale = Number(hardCap) / Number(price);
  const tokensForLP = (Number(hardCap) * (data?.lpPercent / 100)) / Number(listingPrice);
  const quoteERCToken = useToken(data?.quoteToken);
  const quoteNativeToken = NATIVE[chainId];
  const quoteToken = data?.isQuoteETH ? quoteNativeToken : quoteERCToken;
  const unit = quoteToken?.symbol;

  const currentTime = +new Date();
  const startTime = data?.startTime * 1000;
  const endTime = data?.endTime * 1000;
  const linearProgress = (Number(currentCap) * 100) / Number(hardCap);
  const [value, setValue] = useState(0);

  const fetchSaleDetail = async (saleAddress?: any) => {
    if (!isAddress(saleAddress)) return;

    try {
      const res = await getSaleDetail(saleAddress);
      console.log('res==>', res);
      setData(res);
    } catch (error) {
      console.log('error==>', error);
    }
  };

  useEffect(() => {
    fetchSaleDetail(slug);
  }, [slug]);

  const contributorData = [
    {
      label: 'Contributors',
      value: `${contributors}`,
    },
    {
      label: 'Raised',
      value: `${currentCap} ${unit}`,
    },
    {
      label: 'Days left',
      value: 0,
    },
  ];

  const dataConfig = [
    {
      title: 'Token Sale',
      tabs: [
        {
          label: 'Token',
          items: [
            {
              label: 'Name',
              value: token?.name,
            },
            {
              label: 'Symbol',
              value: token?.symbol,
            },
            {
              label: 'Token Address',
              value: token?.address,
            },
            {
              label: 'Total Supply',
              value: `${totalSupply} ${token?.symbol}`,
            },
            {
              label: 'Tokens For Presale',
              value: `${tokensForPresale.toLocaleString()} ${token?.symbol}`,
            },
            {
              label: 'Tokens For Liquidity',
              value: `${tokensForLP.toLocaleString()} ${token?.symbol}`,
            },
            {
              label: 'Standard',
              value: 'Bep20',
            },
          ],
        },
        {
          label: 'Presale',
          items: [
            {
              label: 'Price per token',
              value: `${listingPrice} ${unit}`,
            },
            {
              label: 'Minimum buy',
              value: `${minBuy} ${unit}`,
            },
            {
              label: 'Maximum buy',
              value: `${maxBuy} ${unit}`,
            },
            {
              label: 'Network',
              value: 'Binance Smart Chain',
            },
            {
              label: 'Start time',
              value: `${new Date(startTime).toUTCString()}`,
            },
            {
              label: 'End time',
              value: `${new Date(endTime).toUTCString()}`,
            },
          ],
        },
      ],
    },
  ];

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Section>
      <HeadArea>
        <WrapContain>
          <FlexBox gap="10px" alignItems="center">
            <Typography variant="h3Samsung" color="text.primary" fontWeight="700">
              {data?.title}
            </Typography>
            <Status
              sx={{
                backgroundColor: 'gray.500',
                ...(currentTime < startTime && {
                  backgroundColor: 'gray.800',
                }),
                ...(currentTime < endTime && {
                  backgroundColor: '#08878E',
                }),
              }}
            >
              <Typography
                variant="captionPoppins"
                sx={{
                  color: 'background.paper',
                  fontWeight: '500',
                }}
              >
                {currentTime < startTime ? 'Coming Soon' : currentTime < endTime ? 'Sale Open' : 'Sale Closed'}
              </Typography>
            </Status>
          </FlexBox>
          <Typography variant="body2Poppins" color="gray.400" fontWeight="400">
            The next level decentralized
          </Typography>
          <FlexBox gap="16px" mt="24px">
            <ViewProject>
              <img src="/icons/symbols/remove_red_eye.svg" alt="remove_red_eye" />
              <Typography variant="body3Poppins" color="primary.main" fontWeight="600">
                View project
              </Typography>
            </ViewProject>
            <EditInfo>
              <img src="/icons/symbols/edit.svg" alt="edit" />
              <Typography variant="body3Poppins" color="primary.main" fontWeight="600">
                Edit information
              </Typography>
            </EditInfo>
          </FlexBox>
        </WrapContain>
      </HeadArea>
      <BodyArea pt="50px" pb="50px">
        <Box mb="24px">
          <Typography variant="h6Samsung" color="text.primary" fontWeight="700">
            Sale Progress
          </Typography>
        </Box>
        <FlexBox gap="44px">
          <InforBox>
            <ProcessBox>
              <FlexBox gap="30px">
                {contributorData.map((item, index) => (
                  <>
                    {item.label === 'Days left' ? (
                      <CountDownTime endTime={endTime} />
                    ) : (
                      <FlexBox flexDirection="column" gap="5px">
                        <Typography variant="captionPoppins" color="gray.400" fontWeight="400">
                          {item.label}
                        </Typography>
                        <Typography variant="h6Poppins" color="text.primary" fontWeight="500">
                          {item.value}
                        </Typography>
                      </FlexBox>
                    )}
                    {index < contributorData.length - 1 && <VerticalLine />}
                  </>
                ))}
              </FlexBox>
              <HorizonLine />
              <FlexBox flexDirection="column" gap="4px">
                <BorderLinearProgress variant="determinate" value={linearProgress} sx={{ width: '100%' }} />
                <FlexBox justifyContent="space-between">
                  <Typography variant="body3Poppins" color="primary.main" fontWeight="400">
                    {linearProgress}%
                  </Typography>
                  <Typography variant="body3Poppins" color="text.primary" fontWeight="400">
                    {currentCap} {unit} /{' '}
                    <Typography variant="body3Poppins" color="#0FC66D" fontWeight="400">
                      {hardCap} {unit}
                    </Typography>
                  </Typography>
                </FlexBox>
              </FlexBox>
            </ProcessBox>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                  {dataConfig.map((item, index) => (
                    <Tab key={item.title} label={item.title} {...a11yProps(index)} />
                  ))}
                </Tabs>
              </Box>
              {dataConfig.map((item, index) => (
                <TabPanelCustom key={item.title + index} value={value} index={index}>
                  {item.tabs.map((i, j) => (
                    <>
                      <Typography variant="body3Poppins" color="blue.100" fontWeight="500">
                        {i.label}
                      </Typography>
                      {i.items.map((a, b) => (
                        <FlexBox key={a.label} justifyContent="space-between">
                          <Typography variant="body4Poppins" color="#717D8A" fontWeight="400">
                            {a.label}
                          </Typography>
                          <Typography variant="body4Poppins" color="text.primary" fontWeight="500">
                            {a.value}
                          </Typography>
                        </FlexBox>
                      ))}
                    </>
                  ))}
                </TabPanelCustom>
              ))}
            </Box>
          </InforBox>
          <ActiveBox>
            <SaleBox gap="18px">
              <Typography variant="body2Poppins" color="gray.50" fontWeight="500">
                Sale action
              </Typography>
              <FlexBox gap="15px" flexDirection="column">
                <ButtonInLine sx={{ backgroundColor: 'primary.main' }}>
                  <Typography variant="body3Poppins" color="#000000" fontWeight="600">
                    Complete and Release token
                  </Typography>
                </ButtonInLine>
                <ButtonInLine sx={{ backgroundColor: 'gray.200' }}>
                  <Typography variant="body3Poppins" color="#000000" fontWeight="600">
                    Cancle
                  </Typography>
                </ButtonInLine>
                <ButtonOutLine>
                  <Typography variant="body3Poppins" color="primary.main" fontWeight="600">
                    Contributors list
                  </Typography>
                </ButtonOutLine>
              </FlexBox>
            </SaleBox>
            <SaleBox gap="18px">
              <Typography variant="body2Poppins" color="gray.50" fontWeight="500">
                Sale type
              </Typography>
              <FormControl fullWidth>
                <RadioGroup name="radio-buttons-group">
                  {saleTypes?.map((item) => (
                    <FormControlLabel
                    disabled
                      key={item.value}
                      value={item.value}
                      label={
                        <Typography
                          variant="body3Poppins"
                          color={data?.saleType == item.value ? 'blue.100' : 'gray.700'}
                          fontWeight="400"
                        >
                          {item.label}
                        </Typography>
                      }
                      control={
                        <Radio
                          sx={{
                            color: 'gray.700',
                            '&.Mui-checked': {
                              color: 'blue.500',
                            },
                          }}
                        />
                      }
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </SaleBox>
            <SaleBox gap="18px">
              <Typography variant="body2Poppins" color="gray.50" fontWeight="500">
                Liquidity
              </Typography>
              <FlexBox gap="15px" flexDirection="column">
                <UnlockBox>
                  <Typography variant="body3Poppins" color="primary.main" fontWeight="600">
                    Unlock in
                  </Typography>
                  <FlexBox gap="8px">
                    <FlexBox gap="2px">
                      <Typography variant="captionPoppins" color="primary.main" fontWeight="500">
                        04
                      </Typography>
                      <Typography variant="captionPoppins" color="primary.main" fontWeight="400">
                        Days
                      </Typography>
                    </FlexBox>
                    <Typography variant="captionPoppins" color="primary.main" fontWeight="400">
                      :
                    </Typography>
                    <FlexBox gap="2px">
                      <Typography variant="captionPoppins" color="primary.main" fontWeight="500">
                        16
                      </Typography>
                      <Typography variant="captionPoppins" color="primary.main" fontWeight="400">
                        Hours
                      </Typography>
                    </FlexBox>
                    <Typography variant="captionPoppins" color="primary.main" fontWeight="400">
                      :
                    </Typography>
                    <FlexBox gap="2px">
                      <Typography variant="captionPoppins" color="primary.main" fontWeight="500">
                        24
                      </Typography>
                      <Typography variant="captionPoppins" color="primary.main" fontWeight="400">
                        Minutes
                      </Typography>
                    </FlexBox>
                    <Typography variant="captionPoppins" color="primary.main" fontWeight="400">
                      :
                    </Typography>
                    <FlexBox gap="2px">
                      <Typography variant="captionPoppins" color="primary.main" fontWeight="500">
                        50
                      </Typography>
                      <Typography variant="captionPoppins" color="primary.main" fontWeight="400">
                        Seconds
                      </Typography>
                    </FlexBox>
                  </FlexBox>
                </UnlockBox>
                <ButtonOutLine>
                  <Typography variant="body3Poppins" color="primary.main" fontWeight="600">
                    Remove or add LP
                  </Typography>
                </ButtonOutLine>
              </FlexBox>
            </SaleBox>
          </ActiveBox>
        </FlexBox>
      </BodyArea>
    </Section>
  );
};

const FlexBox = styled(Box)`
  display: flex;
`;
const Section = styled(Box)``;
const HeadArea = styled(Box)`
  height: 285px;
  background-image: url('/images/Group.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
`;
const WrapContain = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-left: 60px;
  padding-right: 60px;
`;
const Status = styled(Box)`
  padding: 4px 19px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ViewProject = styled(Button)`
  height: 46px;
  width: 185px;
  display: flex;
  gap: 12px;
  align-items: center;
  background-color: #053434;
  border-radius: 4px;
`;
const EditInfo = styled(Button)`
    width: 215px;
    height 44px;
    border: 1px solid;
    border-color: ${(props) => props.theme.palette.primary.main};
    border-radius: 4px;
    background: #000000;
    display: flex;
    align-items: center;
    gap: 15px;
`;
const BodyArea = styled(Box)`
  background-color: ${(props) => props.theme.palette.background.default};
  min-height: 100vh;
  height: auto;
  padding-left: 60px;
  padding-right: 60px;
`;
const InforBox = styled(Box)`
  width: 65%;
`;
const ActiveBox = styled(Box)`
  width: 35%;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;
const ProcessBox = styled(Box)`
  background-color: ${(props) => props.theme.palette.gray[900]};
  border-radius: 4px;
  padding: 16px 16px 32px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
const VerticalLine = styled(Box)`
  width: 1px;
  background-color: ${(props) => props.theme.palette.gray[600]};
`;
const HorizonLine = styled(Box)`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.palette.gray[600]};
`;
const TabPanelCustom = styled(TabPanel)`
  > .MuiBox-root {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`;
const SaleBox = styled(Box)`
  padding: 16px;
  background-color: ${(props) => props.theme.palette.gray[900]};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const ButtonInLine = styled(Button)`
  width: 100%;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ButtonOutLine = styled(Button)`
  border: 1px solid;
  border-color: ${(props) => props.theme.palette.primary.main};
  border-radius: 4px;
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const UnlockBox = styled(Box)`
  background: rgba(7, 224, 224, 0.15);
  border-radius: 4px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
`;

export default MyProjectDetail;
