import { Chain, configureChains, createClient } from "wagmi";
import {
  mainnet,
  bsc,
  bscTestnet,
  arbitrum,
  okc,
  gnosis,
  optimism,
  celo,
  polygon,
  avalanche
} from 'wagmi/chains';
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { publicProvider } from "wagmi/providers/public";
import { OKXWalletConnector } from "./connectors/OKXConnector";

const klaytn = {
  id: 8217,
  name: 'Klaytn',
  network: 'klaytn',
  nativeCurrency: {
    decimals: 18,
    name: 'Klaytn',
    symbol: 'KLAY',
  },
  rpcUrls: {
    public: { http: ['https://klaytn-mainnet-rpc.allthatnode.com:8551'] },
    default: { http: ['https://klaytn-mainnet-rpc.allthatnode.com:8551'] },
  },
  blockExplorers: {
    etherscan: { name: 'KlaytnScope', url: 'https://scope.klaytn.com/' },
    default: { name: 'KlaytnScope', url: 'https://scope.klaytn.com/' },
  },
}

const supportedChains: { [name: string]: Chain } = {
  ethereum: mainnet,
  bsc,
  bscTestnet: {
    ...bscTestnet,
    name: 'BSC Testnet'
  },
  arbitrum,
  okc,
  gnosis,
  optimism,
  klaytn,
  // celo,
  polygon,
  // avalanche
};


const { chains, provider, webSocketProvider } = configureChains(
  [...Object.entries(supportedChains).map(([_, value]) => value)],
  // allChains,
  [publicProvider()]
);

export const CHAIN_INFO_MAP: { [chainId: number]: Chain } = chains.reduce((o, chain:any) => {
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
  [supportedChains.gnosis.id]: {
    iconBackground: "#0b0e11",
    iconUrl: "/images/chains/gnosis.svg",
  },
  [supportedChains.klaytn.id]: {
    iconBackground: "#0b0e11",
    iconUrl: "/images/chains/klaytn.png",
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
