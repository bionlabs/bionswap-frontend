const connectorIcons: { [key: string]: string } = {
  metaMask: "/images/connectors/metamask.svg",
  coinbaseWallet: "/images/connectors/coinbase.svg",
  walletConnect: "/images/connectors/wallet-connect.svg",
  okxWallet: "/images/connectors/okc.svg",
};

export function getConnectorIcon(id: "metaMask" | "coinbaseWallet" | "walletConnect" | "okxWallet" | string) {
  return connectorIcons[id];
}
