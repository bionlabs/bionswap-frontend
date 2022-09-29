import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, styled, Button } from '@mui/material';
import { useToken } from 'hooks/useToken';
import { withCatch } from 'utils/error';
import { useChain } from 'hooks';
import { createPresale } from 'api/launchpad';
import { ethers } from 'ethers';
import { usePresaleFactoryContract } from 'hooks/useContract';
import { useRouter } from 'next/router';
import { clearPresaleForm, setPresaleForm } from 'state/presale/action';

const Description = ({ html }: any) => {
  return <Box dangerouslySetInnerHTML={{ __html: html }} />;
};

export const minimizeAddressSmartContract = (str: string) => {
  if (!str) return;
  return str.substring(0, 8) + '...' + str.substring(str.length - 4, str.length);
};

const Step06 = ({ data, handleBack, setData, onShowError, handleSubmit }: any) => {
  const router = useRouter()
  const { chainId, account } = useChain();
  const presaleFactoryContract = usePresaleFactoryContract();
  const [loadignSubmit, setLoadingSubmit] = useState(false);

  const tokenContract = useToken(data.tokenContract);
  const [onpenDescription, setOpenDescription] = useState(false);

  const tokenForSale = Number(data.maxGoal) / Number(data.tokenPrice) || 0;
  const tokenForLiquidity = (Number(data.liquidityPercentage) * Number(data.maxGoal)) / Number(data.pricePerToken) || 0;

  const quoteToken = useToken(data.quoteToken)
  console.log("🚀 ~ file: index.tsx ~ line 34 ~ Step06 ~ data.currency.quoteToken", quoteToken?.decimals)

  const projectReview = [
    {
      head: 'Project information',
      subHead: 'Important information that you want people focus',
      items: [
        {
          label: 'Total token',
          value: `${tokenForSale + tokenForLiquidity} ${tokenContract?.name}`,
        },
        {
          label: 'Address',
          value: `${data.tokenContract}`,
        },
        {
          label: 'Token name',
          value: `${tokenContract?.name}`,
        },
        {
          label: 'Token symbol',
          value: `${tokenContract?.symbol}`,
        },
        {
          label: 'Token decimals',
          value: `${tokenContract?.decimals}`,
        },
        {
          label: 'Token price',
          value: `${data.tokenPrice || 0} ${data.currency}`,
        },
        {
          label: 'Listing price',
          value: `${data.pricePerToken || 0} ${data.currency}`,
        },
      ],
    },
    {
      head: 'Sale Information',
      subHead: 'The Launchpad information that you want to raise',
      items: [
        {
          label: 'Sale method',
          value: `${data.whitelist ? 'Whitelist' : 'Public'}`,
        },
        {
          label: 'Softcap',
          value: `${data.minGoal || 0} ${data.currency}`,
        },
        {
          label: 'Hardcap',
          value: `${data.maxGoal || 0} ${data.currency}`,
        },
        {
          label: 'Unsold tokens',
          value: `${data.unsoldToken === '0' ? 'Refund' : 'Burn'}`,
        },
        {
          label: 'Minimum buy',
          value: `${data.minSale || 0} ${data.currency}`,
        },
        {
          label: 'Maximum buy',
          value: `${data.maxSale || 0} ${data.currency}`,
        },
      ],
    },
    {
      head: 'Liquidity information',
      subHead: 'Token Liquidity information that you want to raise',
      items: [
        {
          label: 'Liquidity',
          value: `${data.liquidityPercentage || 0}%`,
        },
        {
          label: 'Start time',
          value: `${new Date(data.launchTime).toUTCString()}`,
        },
        {
          label: 'End time',
          value: `${new Date(data.endTime).toUTCString()}`,
        },
        {
          label: 'Liquidity lockup time',
          value: `${data.lockupTime} days`,
        },
        {
          label: 'Using vesting',
          value: `${data.vestingToken === '0' ? 'No' : 'Yes'}`,
        },
      ],
    },
    {
      head: 'Description',
      subHead:
        "Describe what you're raising funds to do, why you care about it, how you plan to make it happen, and who you are.",
      description:
        'A wallet address is a string of letters and numbers from which cryptocurrencies or NFTs can be sent to and from. A wallet address is also known as a Public Key and can be shared with different contacts like an email address....',
    },
    {
      head: 'Community',
      subHead: 'Where people can follow, discuss and find more information about your project',
      items: [
        {
          label: 'Website',
          value: `${JSON.parse(data?.community)['website']}`,
        },
        {
          label: 'Telegram',
          value: `${JSON.parse(data?.community)['telegram']}`,
        },
        {
          label: 'Discord',
          value: `${JSON.parse(data?.community)['discord']}`,
        },
      ],
    },
  ];

  const showDescription = () => {
    setOpenDescription(!onpenDescription);
  };

  const handleCreateSale = useCallback(
    async (data: any) => {
      setLoadingSubmit(true);
      // first get salt
      if (!chainId || !account || !presaleFactoryContract) return;

      const payloadInfo = {
        chainId: chainId,
        title: data.projectTitle,
        logo: data.projectLogo,
        banner: data.saleBanner,
        videoURL: data.videoPromo,
        socials: data.community,
        description: data.description,
      };

      const payloadContract = {
        owner: account,
        feeTo: account,
        router: data.router,
        token: data.tokenContract,
        quoteToken: data.quoteToken,
        isQuoteETH: data.isQuoteETH,
        isWhitelistEnabled: !!Number(data.whitelist),
        isBurnUnsold: !!Number(data.unsoldToken),
        price: ethers.utils.parseUnits(data.tokenPrice, quoteToken?.decimals).toString(),
        listingPrice: ethers.utils.parseUnits(data.pricePerToken, quoteToken?.decimals).toString(),
        minPurchase: ethers.utils.parseUnits(data.minSale, quoteToken?.decimals).toString(),
        maxPurchase: ethers.utils.parseUnits(data.maxSale, quoteToken?.decimals).toString(),
        startTime: Number(data.launchTime) / 1000,
        endTime: Number(data.endTime) / 1000,
        lpPercent: Number(data.liquidityPercentage) * 100,
        softCap: ethers.utils.parseUnits(data.minGoal, quoteToken?.decimals).toString(),
        hardCap: ethers.utils.parseUnits(data.maxGoal, quoteToken?.decimals).toString(),
        isAutoListing: data.isAutoListing,
        baseFee: data.baseFee,
        tokenFee: data.tokenFee,
        tgeDate: data.tgeDate / 1000,
        tgeReleasePercent: Number(data.firstRelease) * 100,
        cycleDuration: Number(data.vestingPeriodEachCycle) * 86400,
        cycleReleasePercent: Number(data.tokenReleaseEachCycle) * 100,
        lockLPDuration: Number(data.lockupTime) * 86400,
      };

      // first estimate whether a successful transaction
      const mockSalt = '0x3633326164653839616636643032303135316235356336360000000000000000';
      const { error: errorEstimate } = await withCatch(
        presaleFactoryContract.estimateGas
          .create(payloadContract, mockSalt, { value: ethers.utils.parseEther('0.1') })
          .catch((error: any) => {
            console.log(error);
          }),
      );

      if (errorEstimate) {
        // TODO: toast
        return;
      }

      const { error, result } = await withCatch(
        createPresale({
          ...payloadInfo,
          ...payloadContract,
        }),
      );

      if (error) {
        // TODO: toast
        setLoadingSubmit(false);
        return;
      }

      await presaleFactoryContract
        .create(payloadContract, (result as any).salt, { value: ethers.utils.parseEther('0.1') })
        .catch((error: any) => {
          console.log(error);
        });

      // if (errorRes) {
      //   // TODO: toast
      //   setLoadingSubmit(false);
      //   return;
      // }

      // const receipt = await resultRes?.wait();

      setLoadingSubmit(false);

      router.push('/dashboard/my-project');

      setData(clearPresaleForm());
      
    },
    [account, chainId, presaleFactoryContract, quoteToken],
  );

  return (
    <>
      {onpenDescription ? (
        <Box>
          <FlexBox onClick={showDescription} sx={{ cursor: 'pointer' }} gap="16px">
            <img src="/icons/keyboard_arrow_left.svg" alt="keyboard_arrow_left" />
            <Typography variant="h3" fontWeight="500" color="text.primary">
              Description
            </Typography>
          </FlexBox>
          <Description html={data.description} />
        </Box>
      ) : (
        <FlexBox flexDirection="column" gap="46px" pt="40px" pb="40px">
          <FlexBox flexDirection="column" alignItems="center">
            <Typography variant="h3" color="text.primary" fontWeight="400">
              6. Preview and Comfirm Project
            </Typography>
            <Typography variant="body3Poppins" color="gray.400" fontWeight="400">
              Get ready to launch your project
            </Typography>
          </FlexBox>
          <FlexBox flexDirection="column">
            {projectReview.map((item) => (
              <WrapLine key={item.head}>
                <WrapDescription>
                  <Typography variant="body2Poppins" color="text.primary" fontWeight="400">
                    {item.head}
                  </Typography>
                  <Typography variant="body4Poppins" className="content" color="#717D8A" fontWeight="400">
                    {item.subHead}
                  </Typography>
                </WrapDescription>
                <WrapValue>
                  <FlexBox flexDirection="column" gap="12px">
                    {item?.items?.map((i) => (
                      <BoxItem key={i?.label}>
                        <Typography variant="body4Poppins" color="#717D8A" fontWeight="400">
                          {i?.label}
                        </Typography>
                        {i.label === 'Address' ? (
                          <FlexBox alignItems="center" justifyContent="center" gap="8px">
                            <Typography variant="body4Poppins" color="text.primary" fontWeight="500">
                              {minimizeAddressSmartContract(i?.value)}
                            </Typography>
                            <img src="/icons/content_copy.svg" alt="content_copy" />
                          </FlexBox>
                        ) : item.head === 'Community' ? (
                          <a href={i?.value} target="_blank" rel="noreferrer">
                            <Typography
                              variant="body4Poppins"
                              color="text.primary"
                              fontWeight="500"
                              sx={{ textDecoration: 'underline' }}
                            >
                              {i?.value}
                            </Typography>
                          </a>
                        ) : (
                          <Typography variant="body4Poppins" color="text.primary" fontWeight="500">
                            {i?.value}
                          </Typography>
                        )}
                      </BoxItem>
                    ))}
                    {item?.description && (
                      <Typography variant="body4Poppins" color="#717D8A" fontWeight="400">
                        {item?.description}
                        <Button onClick={showDescription}>
                          <Typography variant="body4Poppins" color="text.primary" fontWeight="400">
                            See all
                          </Typography>
                        </Button>
                      </Typography>
                    )}
                  </FlexBox>
                </WrapValue>
              </WrapLine>
            ))}
          </FlexBox>
          <FlexBox gap="24px">
            <WrapTag>
              <FlexBox flexDirection="column">
                <Typography variant="body2Poppins" color="text.primary" fontWeight="400">
                  Fee
                </Typography>
                <Typography variant="body4Poppins" color="#717D8A" fontWeight="400">
                  All the fees you have to pay for create launchpad
                </Typography>
              </FlexBox>
              <FlexBox flexDirection="column" mt="32px" gap="8px">
                <BoxItem>
                  <Typography variant="body4Poppins" color="#717D8A" fontWeight="400">
                    Pool create fee
                  </Typography>
                  <Typography variant="body4Poppins" color="text.primary" fontWeight="500">
                    0.5 BNB
                  </Typography>
                </BoxItem>
                <BoxItem>
                  <Typography variant="body4Poppins" color="#717D8A" fontWeight="400">
                    Token for sale
                  </Typography>
                  <Typography variant="body4Poppins" color="text.primary" fontWeight="500">
                    100 BNB
                  </Typography>
                </BoxItem>
              </FlexBox>
            </WrapTag>
            <WrapTag>
              <FlexBox flexDirection="column">
                <Typography variant="body2Poppins" color="text.primary" fontWeight="400">
                  Token for sale
                </Typography>
                <Typography variant="body4Poppins" color="#717D8A" fontWeight="400">
                  Number of tokens for sale and add liquidity
                </Typography>
              </FlexBox>
              <FlexBox flexDirection="column" mt="32px" gap="8px">
                <BoxItem>
                  <Typography variant="body4Poppins" color="#717D8A" fontWeight="400">
                    Token for sale
                  </Typography>
                  <Typography variant="body4Poppins" color="text.primary" fontWeight="500">
                    {tokenForSale} {tokenContract?.symbol}
                  </Typography>
                </BoxItem>
                <BoxItem>
                  <Typography variant="body4Poppins" color="#717D8A" fontWeight="400">
                    Token for add liquidity
                  </Typography>
                  <Typography variant="body4Poppins" color="text.primary" fontWeight="500">
                    {tokenForLiquidity} {tokenContract?.symbol}
                  </Typography>
                </BoxItem>
              </FlexBox>
            </WrapTag>
          </FlexBox>
          <FlexBox justifyContent="flex-end" gap="14px">
            <Back onClick={() => handleBack(5)}>
              <Typography variant="body3Poppins" color="primary.main" fontWeight="600">
                Back
              </Typography>
            </Back>
            <Next onClick={() => handleCreateSale(data)} disabled={loadignSubmit || !quoteToken} sx={{}}>
              <Typography variant="body3Poppins" color="#000000" fontWeight="600">
                {loadignSubmit ? 'Loading…' : 'Submit'}
              </Typography>
            </Next>
          </FlexBox>
        </FlexBox>
      )}
    </>
  );
};

const FlexBox = styled(Box)`
  display: flex;
`;
const WrapLine = styled(Box)`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 30px 0;
  border-top: 1px solid;
  border-color: ${(props) => props.theme.palette.gray[600]};
`;
const WrapDescription = styled(Box)`
  display: flex;
  flex-direction: column;
  max-width: 328px;
  width: 100%;
`;
const WrapValue = styled(Box)`
  max-width: 617px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
const Next = styled(Button)`
  max-width: 200px;
  width: 100%;
  height: 45px;
  align-item: center;
  justify-content: center;
  display: flex;
  background-color: ${(props) => props.theme.palette.primary.main};
  border-radius: 4px;

  &.Mui-disabled {
    color: rgba(255, 255, 255, 0.3);
    box-shadow: none;
    background-color: rgba(255, 255, 255, 0.12);
  }
`;
const Back = styled(Button)`
  max-width: 200px;
  width: 100%;
  height: 45px;
  align-item: center;
  justify-content: center;
  display: flex;
  background-color: rgba(7, 224, 224, 0.15);
  border-radius: 4px;
`;
const BoxItem = styled(Box)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 12px;
  border-bottom: 1px solid;
  border-color: ${(props) => props.theme.palette.gray[800]};
`;
const WrapTag = styled(Box)`
  border: 1px solid #373f47;
  border-radius: 4px;
  background: #0c1620;
  padding: 20px;
  width: 50%;
`;

export default Step06;
