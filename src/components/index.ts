import dynamic from "next/dynamic";

export const ConnectButton = dynamic(() => import("./ConnectButton"), {
  ssr: false,
});
export const WalletInfo = dynamic(() => import("./WalletInfo"), {
  ssr: false,
});
