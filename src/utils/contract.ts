import { AddressZero } from '@ethersproject/constants';
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import { Contract, ContractInterface, providers, Signer, ContractFactory, BytesLike } from 'ethers';
import { isAddress } from './validate';

// account is not optional
// export function getSigner(
//   provider: Web3Provider,
//   account: string
// ): JsonRpcSigner {
//   return provider.getSigner(account).connectUnchecked();
// }

// // account is optional
// export function getProviderOrSigner(
//   provider: Web3Provider,
//   account?: string
// ): Web3Provider | JsonRpcSigner {
//   return account ? getSigner(provider, account) : provider;
// }

// account is optional
// export function getContract(
//   address: string,
//   ABI: any,
//   provider: Provider | Signer,
//   account?: string
// ): Contract {
//   if (!isAddress(address) || address === AddressZero) {
//     throw Error(`Invalid 'address' parameter '${address}'.`);
//   }
//   return new Contract(address, ABI, getProviderOrSigner(provider, account));
// }

export function getContract<T = Contract>(
  addressOrName: string,
  contractInterface: ContractInterface,
  signerOrProvider?: Signer | providers.Provider | null,
) {
  // if (!isAddress(address) || address === AddressZero) {
  //   throw Error(`Invalid 'address' parameter '${address}'.`);
  // }

  return <T>(
    (<unknown>new Contract(addressOrName, contractInterface, <Signer | providers.Provider | undefined>signerOrProvider))
  );
}

export function getContractFactory<T = Contract>(
  contractInterface: ContractInterface,
  contractByteCode: BytesLike,
  signer: Signer | null | undefined,
) {
  return <T>new ContractFactory(contractInterface, contractByteCode, <Signer | undefined>signer);
}
