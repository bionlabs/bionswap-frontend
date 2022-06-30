import {
  Chain,
  chain as WagmiChain,
  configureChains,
  createClient,
} from "wagmi";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { publicProvider } from "wagmi/providers/public";

const bsc = {
  id: 56,
  name: "BNB Chain",
  network: "bsc",
  // iconUrl:
  //   "https://assets-cdn.trustwallet.com/blockchains/smartchain/info/logo.png",
  testnet: false,
  nativeCurrency: {
    name: "BNB",
    symbol: "BNB",
    decimals: 18,
  },
  rpcUrls: {
    default: "https://bsc-dataseed.binance.org",
    default2: "https://bsc-dataseed1.defibit.io/",
    default3: "https://bsc-dataseed1.ninicoin.io/",
  },
  blockExplorers: {
    etherscan: {
      name: "BNB Chain Explorer",
      url: "https://bscscan.com",
    },
    default: {
      name: "BNB Chain Explorer",
      url: "https://bscscan.com",
    },
  },
};

const supportedChains: { [name: string]: Chain } = {
  ethereum: WagmiChain.mainnet,
  polygon: WagmiChain.polygon,
  bsc,
};

const { chains, provider, webSocketProvider } = configureChains(
  [...Object.entries(supportedChains).map(([_, value]) => value)],
  [publicProvider()]
);

export { chains };

export const chainIcons = {
  [supportedChains.ethereum.id]: {
    iconBackground: "#484c50",
    iconUrl: "/images/chains/ethereum.svg",
  },
  [supportedChains.polygon.id]: {
    iconBackground: "#9f71ec",
    iconUrl: "/images/chains/polygon.svg",
  },
  [supportedChains.bsc.id]: {
    iconBackground: "#0b0e11",
    iconUrl: "/images/chains/bsc.svg",
  },
};

// Set up client
export const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "wagmi",
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    // new InjectedConnector({
    //   chains,
    //   options: {
    //     name: "Injected",
    //     shimDisconnect: true,
    //   },
    // }),
  ],
  provider,
  webSocketProvider,
});
