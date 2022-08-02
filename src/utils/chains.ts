import { chainIcons } from "../configs/chain";

export function getChainIcon(chainId: number) {
  return chainIcons[chainId];
}
