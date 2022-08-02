import dynamic from "next/dynamic";

export { default as ToggleDarkMode } from "./ToggleDarkMode";
export { default as BaseModal } from "./BaseModal";
export { default as CurrencyInputPanel } from "./CurrencyInputPanel";
export { default as Logo } from "./Logo";
export { default as CurrencyLogo } from "./CurrencyLogo";

export const ConnectButton = dynamic(() => import("./ConnectButton"), {
  ssr: false,
});
export const WalletInfo = dynamic(() => import("./WalletInfo"), {
  ssr: false,
});
