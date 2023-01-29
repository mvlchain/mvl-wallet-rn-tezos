import { BaseControllerV2, RestrictedControllerMessenger } from '@metamask/controllers';
import { createProvider as createInfuraProvider } from '@metamask/eth-json-rpc-infura';
import { Mutex } from 'async-mutex';
// @ts-ignore
import EthQuery from 'eth-query';
// @ts-ignore
import Subprovider from 'web3-provider-engine/subproviders/provider';
// @ts-ignore
import createMetamaskProvider from 'web3-provider-engine/zero';

import { getNetworkConfig, NETWORK, Network } from '@@constants/network.constant';
import type { Patch } from 'immer';

export type ProviderConfig = {
  rpcTarget?: string;
  type: Network;
  chainId: string;
  ticker?: string;
  nickname?: string;
};

export type Block = {
  baseFeePerGas?: string;
};

export type NetworkProperties = {
  isEIP1559Compatible?: boolean;
};

/**
 * @type NetworkState
 *
 * Network controller state
 * @property network - Network ID as per net_version
 * @property isCustomNetwork - Identifies if the network is a custom network
 * @property provider - RPC URL and network name provider settings
 */
export type NetworkState = {
  network: string;
  isCustomNetwork: boolean;
  providerConfig: ProviderConfig;
  properties: NetworkProperties;
};

const name = 'NetworkController';

export type EthQuery = any;

export type NetworkControllerStateChangeEvent = {
  type: `NetworkController:stateChange`;
  payload: [NetworkState, Patch[]];
};

export type NetworkControllerProviderConfigChangeEvent = {
  type: `NetworkController:providerConfigChange`;
  payload: [ProviderConfig];
};

export type NetworkControllerGetProviderConfigAction = {
  type: `NetworkController:getProviderConfig`;
  handler: () => ProviderConfig;
};

export type NetworkControllerGetEthQueryAction = {
  type: `NetworkController:getEthQuery`;
  handler: () => EthQuery;
};

export type NetworkControllerMessenger = RestrictedControllerMessenger<
  typeof name,
  NetworkControllerGetProviderConfigAction | NetworkControllerGetEthQueryAction,
  NetworkControllerStateChangeEvent | NetworkControllerProviderConfigChangeEvent,
  string,
  string
>;

export type NetworkControllerOptions = {
  messenger: NetworkControllerMessenger;
  infuraProjectId: string;
  state?: Partial<NetworkState>;
};

export const defaultState: NetworkState = {
  network: 'loading',
  isCustomNetwork: false,
  providerConfig: { type: NETWORK.ETH, chainId: '1' },
  properties: { isEIP1559Compatible: false },
};

/**
 * Controller that creates and manages an Ethereum network provider.
 */
export class NetworkController extends BaseControllerV2<typeof name, NetworkState, NetworkControllerMessenger> {
  private ethQuery: EthQuery;

  private internalProviderConfig: ProviderConfig = {} as ProviderConfig;

  private readonly infuraProjectId: string;

  private mutex = new Mutex();

  constructor({ messenger, state, infuraProjectId }: NetworkControllerOptions) {
    super({
      name,
      metadata: {
        network: {
          persist: true,
          anonymous: false,
        },
        isCustomNetwork: {
          persist: true,
          anonymous: false,
        },
        properties: {
          persist: true,
          anonymous: false,
        },
        providerConfig: {
          persist: true,
          anonymous: false,
        },
      },
      messenger,
      state: { ...defaultState, ...state },
    });
    this.infuraProjectId = infuraProjectId;
    this.messagingSystem.registerActionHandler(`${this.name}:getProviderConfig`, () => {
      return this.state.providerConfig;
    });

    this.messagingSystem.registerActionHandler(`${this.name}:getEthQuery`, () => {
      return this.ethQuery;
    });
  }

  private initializeProvider(type: Network, chainId?: string) {
    this.update((state) => {
      state.isCustomNetwork = this.getIsCustomNetwork(chainId);
    });
    const networkConfig = getNetworkConfig(type);

    switch (type) {
      case NETWORK.ETH:
      case NETWORK.GOERLI:
      case NETWORK.BSC:
      case NETWORK.BSC_TESTNET:
        const infuraNetwork = networkConfig.infuraNetwork;
        if (infuraNetwork) {
          this.setupInfuraProvider(infuraNetwork);
        } else {
          this.setupStandardProvider(networkConfig.rpcUrl, networkConfig.chainId.toString(10), networkConfig.coin, networkConfig.shortName);
        }
        break;
      default:
        throw new Error(`Unrecognized network type: '${type}'`);
    }
    this.getEIP1559Compatibility();
  }

  private refreshNetwork() {
    this.update((state) => {
      state.network = 'loading';
      state.properties = {};
    });
    const { type, chainId } = this.state.providerConfig;
    this.initializeProvider(type, chainId);
    this.lookupNetwork();
  }

  private registerProvider() {
    this.provider.on('error', this.verifyNetwork.bind(this));
    this.ethQuery = new EthQuery(this.provider);
  }

  private setupInfuraProvider(type: 'mainnet' | 'goerli') {
    const infuraProvider = createInfuraProvider({
      network: type,
      projectId: this.infuraProjectId,
    });
    const infuraSubprovider = new Subprovider(infuraProvider);
    const config = {
      ...this.internalProviderConfig,
      ...{
        dataSubprovider: infuraSubprovider,
        engineParams: {
          blockTrackerProvider: infuraProvider,
          pollingInterval: 36000,
        },
      },
    };
    this.updateProvider(createMetamaskProvider(config));
  }

  private getIsCustomNetwork(chainId?: string) {
    return false;
  }

  private setupStandardProvider(rpcTarget: string, chainId?: string, ticker?: string, nickname?: string) {
    const config = {
      ...this.internalProviderConfig,
      ...{
        chainId,
        engineParams: { pollingInterval: 36000 },
        nickname,
        rpcUrl: rpcTarget,
        ticker,
      },
    };
    this.updateProvider(createMetamaskProvider(config));
  }

  private updateProvider(provider: any) {
    this.safelyStopProvider(this.provider);
    this.provider = provider;
    this.registerProvider();
  }

  private safelyStopProvider(provider: any) {
    setTimeout(() => {
      provider?.stop();
    }, 500);
  }

  private verifyNetwork() {
    this.state.network === 'loading' && this.lookupNetwork();
  }

  /**
   * Ethereum provider object for the current network
   */
  provider: any;

  /**
   * Sets a new configuration for web3-provider-engine.
   *
   * TODO: Replace this wth a method.
   *
   * @param providerConfig - The web3-provider-engine configuration.
   */
  set providerConfig(providerConfig: ProviderConfig) {
    console.log(`setter providerConfig: ${JSON.stringify(providerConfig, null, 2)}`);
    this.internalProviderConfig = providerConfig;
    const { type, chainId } = this.state.providerConfig;
    console.log(`providerConfig: ${JSON.stringify(this.state.providerConfig, null, 2)}`);
    this.initializeProvider(type, chainId);
    this.registerProvider();
    this.lookupNetwork();
  }

  get providerConfig() {
    throw new Error('Property only used for setting');
  }

  private async getNetworkId(): Promise<string> {
    return await new Promise((resolve, reject) => {
      this.ethQuery.sendAsync({ method: 'net_version' }, (error: Error, result: string) => {
        if (error) {
          reject(error);
        } else {
          console.log(`getNetworkId net_version res: ${result}`);
          resolve(result);
        }
      });
    });
  }

  /**
   * Refreshes the current network code.
   */
  async lookupNetwork() {
    /* istanbul ignore if */
    if (!this.ethQuery || !this.ethQuery.sendAsync) {
      return;
    }
    const releaseLock = await this.mutex.acquire();

    try {
      try {
        const networkId = await this.getNetworkId();
        if (this.state.network === networkId) {
          return;
        }

        this.update((state) => {
          state.network = networkId;
        });
      } catch (_error) {
        this.update((state) => {
          state.network = 'loading';
        });
      }

      this.messagingSystem.publish(`NetworkController:providerConfigChange`, this.state.providerConfig);
    } finally {
      releaseLock();
    }
  }

  /**
   * Convenience method to update provider network type settings.
   *
   * @param type - Human readable network name.
   */
  setProviderType(type: Network) {
    const networkConfig = getNetworkConfig(type);
    const ticker = networkConfig.coin;
    const chainId = networkConfig.chainId.toString(10);

    this.update((state) => {
      state.providerConfig.type = type;
      state.providerConfig.ticker = ticker;
      state.providerConfig.chainId = chainId;
      state.providerConfig.rpcTarget = networkConfig.rpcUrl;
      state.providerConfig.nickname = networkConfig.shortName;
    });
    this.refreshNetwork();
  }

  getEIP1559Compatibility() {
    const { properties = {} } = this.state;

    if (!properties.isEIP1559Compatible) {
      if (typeof this.ethQuery?.sendAsync !== 'function') {
        return Promise.resolve(true);
      }
      return new Promise((resolve, reject) => {
        this.ethQuery.sendAsync({ method: 'eth_getBlockByNumber', params: ['latest', false] }, (error: Error, block: Block) => {
          if (error) {
            reject(error);
          } else {
            const isEIP1559Compatible = typeof block.baseFeePerGas !== 'undefined';
            if (properties.isEIP1559Compatible !== isEIP1559Compatible) {
              this.update((state) => {
                state.properties.isEIP1559Compatible = isEIP1559Compatible;
              });
            }
            resolve(isEIP1559Compatible);
          }
        });
      });
    }
    return Promise.resolve(true);
  }
}

export default NetworkController;
