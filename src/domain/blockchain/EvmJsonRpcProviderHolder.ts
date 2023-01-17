// @ts-ignore
import createInfuraProvider from 'eth-json-rpc-infura/src/createProvider';
import { ethers } from 'ethers';
import { injectable } from 'tsyringe';
// @ts-ignore
import Subprovider from 'web3-provider-engine/subproviders/provider';
// @ts-ignore
import createMetamaskProvider from 'web3-provider-engine/zero';

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
  static getMetamaskProvider(rpcUrl: string): any {
    const check = EvmJsonRpcProviderHolder.mmProviderMap[rpcUrl];
    if (check === undefined) {
      console.log('new mm provider instantiate');
      // FIXME: fixed network type and project id
      const infuraProvider = createInfuraProvider({
        network: 'goerli',
        projectId: '***REMOVED***',
      });
      const infuraSubprovider = new Subprovider(infuraProvider);
      const config = {
        rpcTarget: rpcUrl,
        type: 'goerli',
        chainId: '5',
        ...{
          dataSubprovider: infuraSubprovider,
          engineParams: {
            blockTrackerProvider: infuraProvider,
            pollingInterval: 12000,
          },
        },
      };
      const provider = createMetamaskProvider(config);

      EvmJsonRpcProviderHolder.mmProviderMap[rpcUrl] = provider;

      return provider;
    }

    return check;
  }
}
