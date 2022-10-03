import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, FormControl, IconButton, OutlinedInput, styled, Typography } from '@mui/material';
import { BaseModal } from 'components';
import { formatEther, formatUnits } from 'ethers/lib/utils';
import { useChain, useNativeCurrencyBalances, useToken, useTokenBalance } from 'hooks';
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback';
import { usePresaleContract } from 'hooks/useContract';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { withCatch } from 'utils/error';
import { tryParseAmount } from 'utils/parse';

const tokenTypes = [
  {
    value: 0,
    title: 'Standard Token',
  },
];

const JoinIdoModal = ({ open, onDismiss, data, unit }: any) => {
  const { account } = useChain();
  const presaleContract = usePresaleContract(data?.saleAddress);
  const token = useToken(data?.token);
  const quoteToken = useToken(data?.quoteToken);
  const quoteTokenBalance = useTokenBalance(account, quoteToken || undefined);
  const ethBalance = useNativeCurrencyBalances(account ? [account] : [])?.[account ?? ''];
  const quoteBalance = data?.isQuoteETH ? ethBalance : quoteTokenBalance;
  const [decimals, setDecimals] = useState(18);

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const handleCheckDecimal = () => {
      if (data?.isQuoteETH) {
        setDecimals(18);
      } else {
        setDecimals(quoteToken?.decimals || 9);
      }
    };

    handleCheckDecimal();
  }, [quoteToken, data]);

  const [purchaseInput, setPurchaseInput] = useState('0');
  const [tokenOutputAmount, setTokenOutputAmount] = useState(0);
  const price = useMemo(() => Number(formatUnits(data?.price || 1, decimals)), [data?.price, quoteToken]);

  const parsedPurchaseInputAmount = useMemo(
    () => tryParseAmount(purchaseInput, quoteBalance?.currency || undefined),
    [purchaseInput, quoteBalance?.currency],
  );
  const [approvalState, approveCallback] = useApproveCallback(parsedPurchaseInputAmount, data?.saleAddress);

  useEffect(() => {
    const input = Number(purchaseInput);
    setTokenOutputAmount(input / price);
  }, [price, purchaseInput]);

  const handleChangeInput = (event: any) => {
    setPurchaseInput(event.target.value);
  };

  const handleMaxInput = () => {
    const maxAmountWithTolerance = Number(quoteBalance?.toFixed(6) || 0) * 0.9;
    setPurchaseInput(maxAmountWithTolerance.toString());
  };

  const handlePurchase = async () => {
    if (!presaleContract || !account || !parsedPurchaseInputAmount) return;
    
    if (approvalState === ApprovalState.APPROVED) {
      if (data?.isQuoteETH) {
        const { error, result: tx } = await withCatch<any>(
          presaleContract.purchaseInETH({
            value: parsedPurchaseInputAmount.quotient.toString(),
          }),
        );

        if (error) {
          // TODO toast
          return;
        }

        await tx.wait();
        setSuccess(true);
      } else {
        const { error, result: tx } = await withCatch<any>(
          presaleContract.purchase(parsedPurchaseInputAmount.quotient.toString()),
        );

        if (error) {
          // TODO toast
          return;
        }

        await tx.wait();
        setSuccess(true);
      }
    } else if (approvalState === ApprovalState.NOT_APPROVED) {
      approveCallback();
    }
  };

  return (
    <>
      {!success ? (
        <BaseModal
          open={open}
          sx={{
            padding: '27px',
            maxWidth: '550px',
            width: '100%',
            height: 'auto',
            maxHeight: '749px',
            overflowY: 'auto',
          }}
        >
          <IconButton onClick={onDismiss} sx={{ position: 'absolute', right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
          <FlexBox flexDirection="column" gap="22px">
            <FlexBox flexDirection="column" gap="11px" alignItems="center">
              <Typography variant="body3Poppins" color="green.400" fontWeight="600" textTransform="uppercase" pb="11px">
                JOIN {data?.title} IDO TOKEN SALE
              </Typography>
              <WrapLogo>
                <img src={data?.logo} alt={data?.title} />
              </WrapLogo>
              <Typography variant="h1Poppins" color="#F6F6F6" fontWeight="600">
                {data?.title}
              </Typography>
            </FlexBox>
            <Typography variant="body2Poppins" color="text.primary" fontWeight="500">
              Input
            </Typography>
            <WrapInput>
              <FlexBox alignItems="center" justifyContent="space-between">
                <MaxButton onClick={handleMaxInput}>
                  <Typography variant="body3Poppins" color="primary.main" fontWeight="600">
                    MAX
                  </Typography>
                </MaxButton>
                <Typography variant="body3Poppins" color="gray.400" fontWeight="400">
                  Balance: {quoteBalance?.toFixed(2) || 0} {unit}
                </Typography>
              </FlexBox>
              <FlexBox alignItems="center" justifyContent="space-between">
                <OutlinedInput
                  value={purchaseInput}
                  onChange={handleChangeInput}
                  placeholder="0.00"
                  type="number"
                  sx={{
                    fieldset: {
                      display: 'none',
                    },
                    input: {
                      padding: '0',
                      fontWeight: '500',
                      fontSize: '32px',
                      lineHeight: '180%',
                    },
                  }}
                />
                <CurrentcyBox>
                  <Typography variant="h6Poppins" color="text.primary" fontWeight="500">
                    {unit}
                  </Typography>
                  <img src="/icons/coins/0x8301f2213c0eed49a7e28ae4c3e91722919b8b47.svg" alt="" />
                </CurrentcyBox>
              </FlexBox>
            </WrapInput>
            <FlexBox alignItems="center" justifyContent="space-between">
              <Typography variant="body2Poppins" color="gray.400" fontWeight="400">
                Price:
              </Typography>
              <Typography variant="body2Poppins" color="text.primary" fontWeight="500">
                1 {token?.symbol} = {price} {quoteToken?.symbol || 'BNB'}
              </Typography>
            </FlexBox>
            <FlexBox alignItems="center" justifyContent="space-between">
              <Typography variant="body2Poppins" color="gray.400" fontWeight="400">
                You will get:
              </Typography>
              <Typography variant="body2Poppins" color="text.primary" fontWeight="500">
                {tokenOutputAmount} {token?.symbol}
              </Typography>
            </FlexBox>
            <Box>
              <ConfirmButton onClick={handlePurchase}>
                <Typography variant="body3Poppins" color="#000607" fontWeight="600">
                  {approvalState === ApprovalState.NOT_APPROVED ? 'Approve' : 'Confirm'}
                </Typography>
              </ConfirmButton>
            </Box>
          </FlexBox>
        </BaseModal>
      ) : (
        <Box>
          {/* <Box display={open ? 'block' : 'none'}>
                <img src='/images/Congratulations.png' alt='Congratulations' />
            </Box> */}
          <BaseModal
            open={open}
            sx={{
              padding: '27px',
              maxWidth: '652px',
              width: '100%',
              height: 'auto',
              maxHeight: '749px',
              overflowY: 'auto',
            }}
          >
            <IconButton onClick={onDismiss} sx={{ position: 'absolute', right: 8, top: 8 }}>
              <CloseIcon />
            </IconButton>
            <FlexBox gap="31px" flexDirection="column" alignItems="center">
              <Typography variant="body3Poppins" color="green.400" fontWeight="600" textTransform="uppercase">
                YOU JOINED {data?.title?.toUpperCase()} TOKEN SALE
              </Typography>
              <FlexBox gap="20px" flexDirection="column" alignItems="center">
                <img src="/icons/check_circle.svg" alt="check_circle" />
                <Typography variant="h0Poppins" color="text.primary" fontWeight="700">
                  Congratulations!
                </Typography>
              </FlexBox>
              <Typography variant="body2Poppins" color="gray.600" fontWeight="400">
                Purchased successfully and reserved {tokenOutputAmount} {token?.symbol}
              </Typography>
            </FlexBox>
          </BaseModal>
        </Box>
      )}
    </>
  );
};

const FlexBox = styled(Box)`
  display: flex;
`;
const WrapLogo = styled(FormControl)`
  display: flex;
  width: 110px;
  height: 110px;
  border-radius: 50%;
  overflow: hidden;
  align-items: center;
  background-color: ${(props) => props.theme.palette.text.primary};
  justify-content: center;
  border: 2px solid;
  borer-color: ${(props) => props.theme.palette.gray[900]};

  img {
    width: 100%;
    height: auto;
  }
`;
const WrapInput = styled(Box)`
  background-color: ${(props) => props.theme.palette.background.default};
  border-radius: 11px;
  padding: 14px 21px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const CurrentcyBox = styled(Box)`
  background-color: ${(props) => props.theme.palette.gray[900]};
  border: 1px solid #000000;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 116px;
  height: 46px;
  justify-content: center;
  padding: 5px 10px;

  img {
    width: 33px;
    height: auto;
  }
`;
const MaxButton = styled(Button)`
  padding: 0;
  min-width: auto;
`;
const ConfirmButton = styled(Button)`
  background: #07e0e0;
  border-radius: 8px;
  width: 100%;
  height: 57px;
`;

export default JoinIdoModal;
