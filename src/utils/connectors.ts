const connectorIcons: { [key: string]: string } = {
  metaMask: "/images/connectors/metamask.svg",
  coinbaseWallet: "/images/connectors/coinbase.svg",
  walletConnect: "/images/connectors/wallet-connect.svg",
};

export function getConnectorIcon(
  id: "metaMask" | "coinbaseWallet" | "walletConnect" | string
) {
  return connectorIcons[id];
}
