import Page from 'components/Page';
import React from 'react';
import { Box, styled, Stack, IconButton, Button, useMediaQuery } from '@mui/material';
import Banner from './components/Banner';
import Layout from './components/Layout';
import Card from './components/Card';
import Image from 'next/image';
import { useBionGameSlotContract } from 'hooks/useContract';
import FinishedRound from './components/FinishedRound';

const PowerPools = () => {
  const isMobile = useMediaQuery('(max-width:700px)');
  const bionGameSlotContract = useBionGameSlotContract();

  const powerPoolItems = [
    {
      index: 0,
      label: 'Bion Game Slot',
      contract: bionGameSlotContract,
    },
  ];

  return (
    <Page>
      <Banner />
      <Layout>
        <Stack direction="row" alignItems="center" spacing={2} justifyContent="start">
          <StyledIconButton>
            <Image src="/icons/message-question.svg" alt="" width="21px" height="21px" />
          </StyledIconButton>
          <StyledIconButton>
            <Image src="/icons/cup.svg" alt="" width="21px" height="21px" />
          </StyledIconButton>
          <StyledButton variant="contained">Your rewards</StyledButton>
        </Stack>
        <Grid
          sx={{
            gridTemplateColumns: isMobile ? 'auto' : 'auto auto auto',
          }}
        >
          {powerPoolItems?.map((item: any) => (
            <Card key={item.label} contract={item.contract} />
          ))}
        </Grid>
        <WrapBox>
          <FinishedRound contracts={powerPoolItems} />
        </WrapBox>
      </Layout>
    </Page>
  );
};

const StyledIconButton = styled(IconButton)`
  background-color: ${(props) => (props.theme.palette as any).extra.card.background};
  border: 1px solid ${(props) => props.theme.palette.gray[700]};
  border-radius: 8px;
  padding: 14px;
`;
const StyledButton = styled(Button)`
  background-color: ${(props) => (props.theme.palette as any).extra.card.background};
  color: ${(props) => props.theme.palette.text.primary};
  border: 1px solid ${(props) => props.theme.palette.gray[700]};
  border-radius: 8px;
  padding: 14px;
  transition: 0.12s ease-in;
  :hover {
    background-color: ${(props) => (props.theme.palette as any).extra.card.background};
    box-shadow: none;
    opacity: 0.8;
  }
`;
const Grid = styled(Box)`
  display: grid;
  justify-content: center;
  margin-top: 35px;
  gap: 20px;
`;
const WrapBox = styled(Box)`
  max-width: 853px;
  margin: auto;
  margin-top: 100px;
  text-align: center;
`

export default PowerPools;
