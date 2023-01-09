import { Chain, chain as WagmiChain, configureChains, createClient } from "wagmi";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { publicProvider } from "wagmi/providers/public";
import { OKXWalletConnector } from "./connectors/OKXConnector";

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
    default: "https://rpc.ankr.com/bsc",
    // default2: "https://bsc-dataseed1.defibit.io/",
    // default3: "https://bsc-dataseed1.ninicoin.io/",
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

const bscTestnet = {
  id: 97,
  name: "BNB Testnet",
  network: "bsc-testnet",
  // iconUrl:
  //   "https://assets-cdn.trustwallet.com/blockchains/smartchain/info/logo.png",
  testnet: true,
  nativeCurrency: {
    name: "BNB",
    symbol: "BNB",
    decimals: 18,
  },
  rpcUrls: {
    default: "https://rpc.ankr.com/bsc_testnet_chapel",
    // default2: "https://bsc-dataseed1.defibit.io/",
    // default3: "https://bsc-dataseed1.ninicoin.io/",
  },
  blockExplorers: {
    etherscan: {
      name: "BNB Chain Explorer",
      url: "https://testnet.bscscan.com",
    },
    default: {
      name: "BNB Chain Explorer",
      url: "https://testnet.bscscan.com",
    },
  },
};

const okc = {
  id: 66,
  name: "OKC",
  network: "bsc",
  testnet: false,
  nativeCurrency: {
    name: "OKT",
    symbol: "OKT",
    decimals: 18,
  },
  rpcUrls: {
    default: "https://exchainrpc.okex.org",
  },
  blockExplorers: {
    default: {
      name: "OKC Explorer",
      url: "https://www.oklink.com/okc/",
    },
  },
};

const supportedChains: { [name: string]: Chain } = {
  bsc,
  okc,
  ethereum: {
    ...WagmiChain.mainnet,
    rpcUrls: {
      default: "https://rpc.ankr.com/eth",
    },
  },
  polygon: WagmiChain.polygon,
  arbitrum: {
    ...WagmiChain.arbitrum,
    rpcUrls: {
      default: "https://rpc.ankr.com/arbitrum",
    },
  },
  optimism: {
    ...WagmiChain.optimism,
    rpcUrls: {
      default: "https://rpc.ankr.com/optimism",
    },
  },
  bscTestnet,
};

const { chains, provider, webSocketProvider } = configureChains(
  [...Object.entries(supportedChains).map(([_, value]) => value)],
  // allChains,
  [publicProvider()]
);

export const CHAIN_INFO_MAP: { [chainId: number]: Chain } = chains.reduce((o, chain) => {
  o[chain.id] = chain;
  return o;
}, {} as any);

export const chainIcons = {
  [supportedChains.bsc.id]: {
    iconBackground: "#0b0e11",
    iconUrl: "/images/chains/bsc.svg",
  },
  [supportedChains.okc.id]: {
    iconBackground: "#0b0e11",
    iconUrl: "/images/chains/okc.svg",
  },
  [supportedChains.ethereum.id]: {
    iconBackground: "#5C6BC0",
    iconUrl: "/images/chains/ethereum.svg",
  },
  [supportedChains.polygon.id]: {
    iconBackground: "#9f71ec",
    iconUrl: "/images/chains/polygon.svg",
  },
  [supportedChains.bscTestnet.id]: {
    iconBackground: "#0b0e11",
    iconUrl: "/images/chains/bsc.svg",
  },
  [supportedChains.arbitrum.id]: {
    iconBackground: "#0b0e11",
    iconUrl: "/images/chains/arbitrum.svg",
  },
  [supportedChains.optimism.id]: {
    iconBackground: "#0b0e11",
    iconUrl: "/images/chains/optimism.svg",
  },
};

// Set up client
export const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new OKXWalletConnector({
      chains,
    }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "bionswap",
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
  ],
  provider,
  // webSocketProvider,
});
