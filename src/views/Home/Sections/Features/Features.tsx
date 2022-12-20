import React from 'react';
import { Box, styled, Typography, Stack, Container, Button } from '@mui/material';
import useMediaQuery from 'hooks/useMediaQuery';
import { RxCheckCircled } from 'react-icons/rx';
import Card, { CardProps } from './Card/Card';

const cards:CardProps[] = [
  {
    title: 'Swap token with the best swap rate',
    content: 'Trade Multichain token for another via automated liquidity pools',
    href: '/swap',
    buttonLabel: 'Swap now',
    disabled: false
  },
  {
    title: 'Launch projects with a single click',
    content: 'Create web3 assets with tools and simplify fund raising',
    href: '/launch',
    buttonLabel: 'Launch with us',
    disabled: false
  },
  {
    title: 'Helping early-bird projects with awesome features',
    content: 'We are incubating in awesome projects and looking for more collaboration',
    href: '/collaboration',
    buttonLabel: 'Learn more',
    disabled: false
  },
  {
    title: 'DAO Governance for automated launchpad',
    content: 'Rating Governance system to evaluate launchpad quality and reduce scam',
    href: '',
    buttonLabel: 'Comming soon',
    disabled: true
  },
  {
    title: 'Play and earn directly on Bionswap',
    content: 'Joining Bion Gamecenter to earn more Bion Ticket and claim massive rewards',
    href: '',
    buttonLabel: 'Comming soon',
    disabled: true
  },
  {
    title: 'PalotChain powered by BionNetwork will come soon',
    content: 'An EVM & IBC Compatible blockchain are under developing',
    href: '',
    buttonLabel: 'Comming soon',
    disabled: true
  },
]

const Features = () => {
  const { isMobile, isTablet } = useMediaQuery();
  return (
    <Wrapper>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}  
      >
        <Grid
          sx={{
            gridTemplateColumns: isMobile ? '100%' : isTablet ? '49% 49%' : '32.5% 32.5% 32.5%'
          }}
        >
          {
            cards.map(item =>
              <Card
                key='' title={item.title} content={item.content} href={item.href} buttonLabel={item.buttonLabel} disabled={item.disabled}            
              />
            )
          }
        </Grid>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled(Box)`
  padding: 4rem 0;
  background-color: ${(props) => (props.theme.palette as any).extra.background.secondary};
`;
const Grid = styled(Box)`
  display: grid;
  justify-content: space-between;
  gap: 20px;
`


export default Features;
