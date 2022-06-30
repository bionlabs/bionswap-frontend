import { NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
import { ConnectButton, WalletInfo } from "../components";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Connect Wallet Demo</title>
        <meta
          name="description"
          content="Demo app part of a tutorial on adding RainbowKit to a React application"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <ConnectButton />
        <WalletInfo />
      </main>
    </div>
  );
};

export default Home;
