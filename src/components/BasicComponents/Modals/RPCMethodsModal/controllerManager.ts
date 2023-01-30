import { INFURA_ID } from '@env';
import { ControllerMessenger, WalletDevice } from '@metamask/controllers';

import { getNetworkByBase, getNetworkConfig } from '@@constants/network.constant';
import { MessageManager, PersonalMessageManager, TypedMessageManager } from '@@domain/message-manager';
import { TransactionController } from '@@domain/transaction/TransactionController';
import NetworkController from '@@domain/wallet/services/NetworkController';
import walletPersistStore from '@@store/wallet/walletPersistStore';
import { IWalletPersist } from '@@store/wallet/walletPersistStore.type';
import { getAddress } from '@@utils/walletHelper';

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

    this.controllerMessenger = new ControllerMessenger();

    const { selectedNetwork: pickNetwork } = walletPersistStore.getState();
    const selectedNetwork = getNetworkByBase(pickNetwork);

    const networkConfig = getNetworkConfig(selectedNetwork);

    const initialState = networkConfig.supportBrowser
      ? {
          providerConfig: {
            type: selectedNetwork,
            chainId: networkConfig.chainId.toString(10),
          },
        }
      : undefined;
    const networkControllerOpts = {
      infuraProjectId: INFURA_ID,
      state: initialState,
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
        eth_sendTransaction: async (payload: { params: any[]; origin: any }, next: any, end: (err: any, res: any) => void) => {
          console.log(`WB INCOMING> 7-1. networkController.providerConfig static eth_sendTransaction, ${JSON.stringify(payload, null, 2)}`);
          const { TransactionController } = this.context;
          try {
            const addTransactionRes = await TransactionController.addTransaction(payload.params[0], payload.origin, WalletDevice.MM_MOBILE);
            console.log(`WB OUTGOING> static eth_sendTransaction addTransactionRes, ${addTransactionRes.transactionMeta}`);
            const hash = await addTransactionRes.result;
            console.log(`WB OUTGOING> static eth_sendTransaction res, ${hash}`);
            end(undefined, hash);
          } catch (error: any) {
            console.log(`WB OUTGOING> static eth_sendTransaction error, ${error}`);
            end(error, undefined);
          }
        },
      },
      getAccounts: (end: (arg0: null, arg1: any[]) => void, payload: { hostname: string | number }) => {
        const selectedAddress = getAddress();
        end(null, [selectedAddress]);
      },
    };

    walletPersistStore.subscribe((state: IWalletPersist, prevState: IWalletPersist) => {
      if (prevState.selectedNetwork === state.selectedNetwork) {
        return;
      }
      const networkByBase = getNetworkByBase(state.selectedNetwork);
      if (!getNetworkConfig(networkByBase).supportBrowser) {
        return;
      }
      networkController.setProviderType(networkByBase);
    });

    const myTransactionController = new TransactionController({
      getSelectedNetworkConfig: () => {
        const { selectedNetwork } = walletPersistStore.getState();
        return getNetworkConfig(getNetworkByBase(selectedNetwork));
      },
    });

    const controllers = [networkController, myTransactionController];
    this.context = controllers.reduce((context: any, controller: any) => {
      context[controller.name] = controller;
      return context;
    }, {});
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
  get transactionController(): TransactionController {
    return instance && instance.context.TransactionController;
  },
  messageManager,
  personalMessageManager,
  typedMessageManager,
};

export default controllerManager;
