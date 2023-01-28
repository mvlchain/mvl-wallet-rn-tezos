import { ethers } from 'ethers';
import { injectable } from 'tsyringe';

import { JsonRpcProviderHolder } from '@@domain/blockchain/JsonRpcProviderHolder';

@injectable()
export class EvmJsonRpcProviderHolder implements JsonRpcProviderHolder<ethers.providers.JsonRpcProvider> {
  private static readonly providerMap: {
    [key: string]: ethers.providers.JsonRpcProvider | undefined;
  } = {};
  private static readonly mmProviderMap: {
    [key: string]: any;
  } = {};

  getProvider(rpcUrl: string): ethers.providers.JsonRpcProvider {
    const check = EvmJsonRpcProviderHolder.providerMap[rpcUrl];
    if (check === undefined) {
      console.log('new provider instantiate');
      const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
      EvmJsonRpcProviderHolder.providerMap[rpcUrl] = provider;
      return provider;
    }

    return check;
  }
}
