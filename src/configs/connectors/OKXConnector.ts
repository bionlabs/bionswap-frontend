import { InjectedConnectorOptions } from "@wagmi/core/dist/declarations/src/connectors";
import { Ethereum } from "@wagmi/core/dist/declarations/src/types";
import { client } from "configs/chain";
import { Chain, ConnectorNotFoundError, ResourceUnavailableError, RpcError, UserRejectedRequestError } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

export interface OKEXChain extends Omit<Ethereum, "isMetamask"> {
  isOKExWallet: boolean;
}

declare global {
  interface Window {
    okexchain: OKEXChain;
  }
}

export type OKXWalletConnectorOptions = Pick<InjectedConnectorOptions, "shimChainChangedDisconnect" | "shimDisconnect"> & {
  /**
   * While "disconnected" with `shimDisconnect`, allows user to select a different MetaMask account (than the currently connected account) when trying to connect.
   */
  UNSTABLE_shimOnConnectSelectAccount?: boolean;
};

export class OKXWalletConnector extends InjectedConnector {
  readonly id = "okxWallet";
  readonly name = "OKX Wallet";
  readonly ready = typeof window != "undefined" && window.okexchain.isOKExWallet;

  private provider?: Window["okexchain"];
  UNSTABLE_shimOnConnectSelectAccount: OKXWalletConnectorOptions["UNSTABLE_shimOnConnectSelectAccount"];

  constructor({
    chains,
    options: options_,
  }: {
    chains?: Chain[];
    options?: OKXWalletConnectorOptions;
  } = {}) {
    const options = {
      name: "OKXWallet",
      shimDisconnect: true,
      shimChainChangedDisconnect: false,
      ...options_,
    };
    super({
      chains,
      options,
    });

    this.UNSTABLE_shimOnConnectSelectAccount = options.UNSTABLE_shimOnConnectSelectAccount;
  }

  async connect({ chainId }: { chainId?: number } = {}) {
    try {
      const provider = await this.getProvider();
      if (!provider) throw new ConnectorNotFoundError();

      if (provider.on) {
        provider.on("accountsChanged", this.onAccountsChanged);
        provider.on("chainChanged", this.onChainChanged);
        provider.on("disconnect", this.onDisconnect);
      }

      this.emit("message", { type: "connecting" });

      // Attempt to show wallet select prompt with `wallet_requestPermissions` when
      // `shimDisconnect` is active and account is in disconnected state (flag in storage)
      if (
        this.UNSTABLE_shimOnConnectSelectAccount &&
        this.options?.shimDisconnect &&
        !client.storage?.getItem(this.shimDisconnectKey)
      ) {
        const accounts = await provider
          .request({
            method: "eth_accounts",
          })
          .catch(() => []);
        const isConnected = !!accounts[0];
        if (isConnected)
          await provider.request({
            method: "wallet_requestPermissions",
            params: [{ eth_accounts: {} }],
          });
      }

      const account = await this.getAccount();
      // Switch to chain if provided
      let id = await this.getChainId();
      let unsupported = this.isChainUnsupported(id);
      if (chainId && id !== chainId) {
        const chain = await this.switchChain(chainId);
        id = chain.id;
        unsupported = this.isChainUnsupported(id);
      }

      if (this.options?.shimDisconnect) client.storage?.setItem(this.shimDisconnectKey, true);

      return { account, chain: { id, unsupported }, provider };
    } catch (error) {
      if (this.isUserRejectedRequestError(error)) throw new UserRejectedRequestError(error);
      if ((<RpcError>error).code === -32002) throw new ResourceUnavailableError(error);
      throw error;
    }
  }

  async getProvider() {
    if (typeof window !== "undefined") {
      // TODO: Fallback to `okexchain#initialized` event for async injection
      // https://github.com/MetaMask/detect-provider#synchronous-and-asynchronous-injection=
      this.provider = window.okexchain;
    }
    return this.provider;
  }

  // private getReady(okexchain?: OKEXChain) {
  //   const isOKXWallet = !!okexchain?.isOKExWallet;
  //   if (!isOKXWallet) return;
  //   // Brave tries to make itself look like MetaMask
  //   // Could also try RPC `web3_clientVersion` if following is unreliable
  //   if (okexchain.isBraveWallet && !okexchain._events && !okexchain._state) return;
  //   if (okexchain.isTokenPocket) return;
  //   if (okexchain.isTokenary) return;
  //   return okexchain;
  // }

  // private findProvider(okexchain?: OKEXChain) {
  //   if (okexchain?.providers) return okexchain.providers.find(this.getReady);
  //   return this.getReady(okexchain);
  // }
}
