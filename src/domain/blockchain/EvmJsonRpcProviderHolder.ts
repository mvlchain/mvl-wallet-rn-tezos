import { ethers } from 'ethers';
import { injectable } from 'tsyringe';

import { JsonRpcProviderHolder } from '@@domain/blockchain/JsonRpcProviderHolder';

@injectable()
export class EvmJsonRpcProviderHolder implements JsonRpcProviderHolder<ethers.providers.JsonRpcProvider> {
  private readonly providerMap: {
    [key: string]: ethers.providers.JsonRpcProvider | undefined;
  } = {};

  getProvider(rpcUrl: string): ethers.providers.JsonRpcProvider {
    const check = this.providerMap[rpcUrl];
    if (check === undefined) {
      console.log('new provider instantiate');
      const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
      this.providerMap[rpcUrl] = provider;
      return provider;
    }

    return check;
  }
}
