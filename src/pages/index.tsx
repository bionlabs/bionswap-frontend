import { NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
import { ConnectButton, WalletInfo } from "../components";
import Menu from '../views/Menu'
import Footer from '../views/Footer'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Connect Wallet Demo</title>
        <meta
          name="description"
          content="Demo app part of a tutorial on adding RainbowKit to a React application"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Menu />
        
        <Footer />
      </main>
    </div>
  );
};

export default Home;
