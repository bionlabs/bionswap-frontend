import Page from 'components/Page';
import { NextPage } from 'next';
import Head from 'next/head';
import Homepage from 'views/Home';
import Script from 'next/script';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>BionSwap - Multichain Decentralized Trading Platform and Automation Launchpad</title>
        <meta name="description" content="BionSwap" />
        <meta key="twitter:description" name="twitter:description" content="BionSwap" />
        <meta key="og:description" property="og:description" content="BionSwap" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <Homepage />
      </div>
    </div>
  );
};

export default Home;
