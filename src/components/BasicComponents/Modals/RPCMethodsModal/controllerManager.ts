import {
  AssetsContractController,
  ControllerMessenger,
  NetworkController,
  PreferencesController,
  TransactionController,
  WalletDevice,
} from '@metamask/controllers';

import { MessageManager, PersonalMessageManager, TypedMessageManager } from '@@domain/message-manager';

let instance: ControllerManager;

const messageManager = new MessageManager();
const personalMessageManager = new PersonalMessageManager();
const typedMessageManager = new TypedMessageManager();

class ControllerManager {
  context: any;
  controllerMessenger: any;
  static instance: any;
  constructor() {
    if (ControllerManager.instance) {
      return ControllerManager.instance;
    }
    console.log(`controllerManager constructor`);

    this.controllerMessenger = new ControllerMessenger();

    const preferencesController = new PreferencesController(
      {},
      {
        ipfsGateway: 'https://cloudflare-ipfs.com/ipfs/',
        useTokenDetection: false,
        useNftDetection: false,
        openSeaEnabled: false,
      }
    );
    const provider = {
      rpcTarget: 'https://goerli.infura.io/v3/***REMOVED***',
      type: 'goerli',
      chainId: '5',
      ticker: 'goerliETH',
      nickname: 'Goerli',
    };

    const assetsContractController = new AssetsContractController(
      {
        onPreferencesStateChange: (listener) => preferencesController.subscribe(listener),
        onNetworkStateChange: (listener) => this.controllerMessenger.subscribe('NetworkController:stateChange', listener),
      },
      {
        provider,
        chainId: '5',
      }
    );

    const networkControllerOpts = {
      infuraProjectId: '***REMOVED***',
      state: {
        provider: provider,
      },
      messenger: this.controllerMessenger.getRestricted({
        name: 'NetworkController',
        allowedEvents: [],
        allowedActions: [],
      }),
    };

    // @ts-ignore
    const networkController = new NetworkController(networkControllerOpts);
    networkController.providerConfig = {
      // @ts-ignore
      static: {
        eth_sendTransaction: async (payload: { params: any[]; origin: any }, next: any, end: (arg0: undefined, arg1: undefined) => void) => {
          console.log(`WB INCOMING> 7-1. networkController.providerConfig static eth_sendTransaction`);
          const { TransactionController } = this.context;
          try {
            const hash = await (await TransactionController.addTransaction(payload.params[0], payload.origin, WalletDevice.MM_MOBILE)).result;
            end(undefined, hash);
          } catch (error: any) {
            end(error, undefined);
          }
        },
      },
      getAccounts: (end: (arg0: null, arg1: any[]) => void, payload: { hostname: string | number }) => {
        // const { approvedHosts, privacyMode } = store.getState();
        // const isEnabled = !privacyMode || approvedHosts[payload.hostname];
        // const { KeyringController } = this.context;
        // const isUnlocked = KeyringController.isUnlocked();
        // const selectedAddress = this.context.PreferencesController.state.selectedAddress;
        // end(null, isUnlocked && isEnabled && selectedAddress ? [selectedAddress] : []);
        // FIXME: get selectedAddress
        const selectedAddress = '0xf2B8288Ea9FC59447BfB88EA853849733d90D632';
        end(null, [selectedAddress]);
      },
    };

    const transactionController = new TransactionController({
      getNetworkState: () => networkController.state,
      // @ts-ignore
      onNetworkStateChange: (listener: any) => this.controllerMessenger.subscribe('NetworkController:stateChange', listener),
      getProvider: () => networkController.provider,
    });
    const controllers = [preferencesController, assetsContractController, networkController, transactionController];
    this.context = controllers.reduce((context: any, controller: any) => {
      context[controller.name] = controller;
      return context;
    }, {});
    console.log(Object.keys(this.context));
    ControllerManager.instance = this;
    return ControllerManager.instance;
  }
}

export const controllerManager = {
  get context() {
    return instance && instance.context;
  },
  init() {
    console.log(`controllerManager init`);
    instance = new ControllerManager();
  },
  get controllerMessenger() {
    return instance && instance.controllerMessenger;
  },
  get networkController() {
    return instance && instance.context.NetworkController;
  },
  get transactionController() {
    return instance && instance.context.TransactionController;
  },
  get assetsContractController() {
    return instance && instance.context.AssetsContractController;
  },
  messageManager,
  personalMessageManager,
  typedMessageManager,
};

export default controllerManager;
