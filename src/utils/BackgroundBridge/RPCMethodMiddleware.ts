import { createAsyncMiddleware } from 'json-rpc-engine';
import { getVersion } from 'react-native-device-info';

import { controllerManager } from '@@components/BasicComponents/Modals/RPCMethodsModal/controllerManager';
import { getNetworkByBase, getNetworkConfig, NETWORK } from '@@constants/network.constant';
import walletPersistStore from '@@store/wallet/walletPersistStore';
import { polyfillGasPrice } from '@@utils/BackgroundBridge/utils';
import { tagLogger } from '@@utils/Logger';
import { getAddress } from '@@utils/walletHelper';

import AppConstants from './AppConstants';

let appVersion = '';

export function resemblesAddress(address: string) {
  return address.length === 2 + 20 * 2;
}

export enum ApprovalTypes {
  CONNECT_ACCOUNTS = 'CONNECT_ACCOUNTS',
  SIGN_MESSAGE = 'SIGN_MESSAGE',
  ADD_ETHEREUM_CHAIN = 'ADD_ETHEREUM_CHAIN',
  SWITCH_ETHEREUM_CHAIN = 'SWITCH_ETHEREUM_CHAIN',
}

interface RPCMethodsMiddleParameters {
  hostname: string;
  getProviderState: () => any;
  navigation: any;
  getApprovedHosts: any;
  setApprovedHosts: (approvedHosts: any) => void;
  approveHost: (fullHostname: string) => void;
  url: { current: string };
  title: { current: string };
  icon: { current: string | undefined | null };
  // Bookmarks
  isHomepage: () => boolean;
  // Show autocomplete
  fromHomepage: { current: boolean };
  toggleUrlModal: (shouldClearUrlInput: boolean) => void;
  // Wizard
  wizardScrollAdjusted: { current: boolean };
  // For the browser
  tabId: string;
  // For WalletConnect
}

export const checkActiveAccountAndChainId = ({ address, chainId, activeAccounts }: any) => {
  if (address) {
    if (!activeAccounts || !activeAccounts.length || address.toLowerCase() !== activeAccounts?.[0]?.toLowerCase()) {
      throw new Error(`Invalid parameters: must provide an Ethereum address.`);
    }
  }

  if (chainId) {
    // const { provider } = Engine.context.NetworkController.state;
    // const networkProvider = provider;
    // const networkType = provider.type as NetworkType;
    // const isInitialNetwork = networkType && getAllNetworks().includes(networkType);
    // let activeChainId;
    //
    // if (isInitialNetwork) {
    //   activeChainId = NetworksChainId[networkType];
    // } else if (networkType === RPC) {
    //   activeChainId = networkProvider.chainId;
    // }
    //
    // if (activeChainId && !activeChainId.startsWith('0x')) {
    //   // Convert to hex
    //   activeChainId = `0x${parseInt(activeChainId, 10).toString(16)}`;
    // }
    //
    // let chainIdRequest = String(chainId);
    // if (chainIdRequest && !chainIdRequest.startsWith('0x')) {
    //   // Convert to hex
    //   chainIdRequest = `0x${parseInt(chainIdRequest, 10).toString(16)}`;
    // }
    //
    // if (activeChainId !== chainIdRequest) {
    //   Alert.alert(`Active chainId is ${activeChainId} but received ${chainIdRequest}`);
    //   throw ethErrors.rpc.invalidParams({
    //     message: `Invalid parameters: active chainId is different than the one provided.`,
    //   });
    // }
  }
};

// const messageManager = new MessageManager();
// const personalMessageManager = new PersonalMessageManager();
// const typedMessageManager = new TypedMessageManager();

const { messageManager, personalMessageManager, typedMessageManager } = controllerManager;

const logger = tagLogger('RPCMethodMiddleware');
/**
 * Handle RPC methods called by dapps
 */
export const getRpcMethodMiddleware = ({
  hostname,
  getProviderState,
  navigation,
  getApprovedHosts,
  setApprovedHosts,
  approveHost,
  // Website info
  url,
  title,
  icon,
  // Bookmarks
  isHomepage,
  // Show autocomplete
  fromHomepage,
  toggleUrlModal,
  // Wizard
  wizardScrollAdjusted,
  // For the browser
  tabId,
}: RPCMethodsMiddleParameters) =>
  // all user facing RPC calls not implemented by the provider
  createAsyncMiddleware<any, any>(async (req, res, next) => {
    const getAccounts = (): string[] => {
      // const {
      //   privacy: { privacyMode },
      // } = store.getState();

      // FIXME: get selectedAddress
      const selectedAddress = getAddress();
      return [selectedAddress];

      // const isEnabled = !!getApprovedHosts()[hostname];
      // logger.log(`isEnabled: ${isEnabled}, ${selectedAddress}`);
      // return isEnabled && selectedAddress ? [selectedAddress] : [];
    };

    const checkTabActive = () => {
      return true;
      // if (!tabId) return true;
      // const { browser } = store.getState();
      // if (tabId !== browser.activeTab) throw ethErrors.provider.userRejectedRequest();
    };

    const getSource = () => {
      return AppConstants.REQUEST_SOURCES.IN_APP_BROWSER;
    };

    const requestUserApproval = async ({ type = '', requestData = {} }) => {
      logger.log(`requestUserApproval called`);
      checkTabActive();
      // await Engine.context.ApprovalController.clear(ethErrors.provider.userRejectedRequest());

      return true;
      // const responseData = await Engine.context.ApprovalController.add({
      //   origin: hostname,
      //   type,
      //   requestData: {
      //     ...requestData,
      //     pageMeta: {
      //       url: url.current,
      //       title: title.current,
      //       icon: icon.current,
      //     },
      //   },
      //   id: random(),
      // });
      // return responseData;
    };

    const rpcMethods: any = {
      eth_getTransactionByHash: async () => {
        res.result = await polyfillGasPrice('getTransactionByHash', req.params);
      },
      eth_getTransactionByBlockHashAndIndex: async () => {
        res.result = await polyfillGasPrice('getTransactionByBlockHashAndIndex', req.params);
      },
      eth_getTransactionByBlockNumberAndIndex: async () => {
        res.result = await polyfillGasPrice('getTransactionByBlockNumberAndIndex', req.params);
      },
      eth_chainId: async () => {
        const { selectedNetwork } = walletPersistStore.getState();

        const chainId = getNetworkConfig(getNetworkByBase(selectedNetwork)).chainId.toString(10);
        if (!chainId) {
          res.error = new Error('No chainId found');
        }
        if (chainId.startsWith('0x')) {
          res.result = chainId;
        } else {
          // Convert to hex
          res.result = `0x${parseInt(chainId, 10).toString(16)}`;
        }
      },
      net_version: async () => {
        const { selectedNetwork } = walletPersistStore.getState();

        const chainId = getNetworkConfig(getNetworkByBase(selectedNetwork)).chainId.toString(10);
        res.result = chainId;
      },
      eth_requestAccounts: async () => {
        const { params } = req;
        const selectedAddress = getAddress();

        logger.log(`eth_requestAccounts: ${selectedAddress}`);
        res.result = [selectedAddress];
      },
      eth_accounts: async () => {
        logger.log(`WB INCOMING> 6. eth_accounts called`);
        res.result = getAccounts();
      },

      eth_coinbase: async () => {
        const accounts = getAccounts();
        res.result = accounts.length > 0 ? accounts[0] : null;
      },
      eth_sendTransaction: async () => {
        logger.log(`WB INCOMING> 6. eth_sendTransaction called: ${JSON.stringify(req.params, null, 2)}`);
        checkTabActive();
        checkActiveAccountAndChainId({
          address: req.params[0].from,
          chainId: req.params[0].chainId,
          activeAccounts: getAccounts(),
        });
        next();
      },
      eth_signTransaction: async () => {
        logger.log(`WB INCOMING> 6. eth_signTransaction`);
        // This is implemented later in our middleware stack – specifically, in
        // eth-json-rpc-middleware – but our UI does not support it.
        throw new Error('-32004');
      },
      eth_sign: async () => {
        logger.log(`WB INCOMING> 6. eth_sign`);
        // const { MessageManager } = Engine.context;
        const pageMeta = {
          meta: {
            url: url.current,
            title: title.current,
            icon: icon.current,
          },
        };

        checkTabActive();
        checkActiveAccountAndChainId({
          address: req.params[0].from,
          activeAccounts: await getAccounts(),
        });

        if (req.params[1].length === 66 || req.params[1].length === 67) {
          const rawSig = await messageManager.addUnapprovedMessageAsync({
            data: req.params[1],
            from: req.params[0],
            ...pageMeta,
            origin: hostname,
          });

          res.result = rawSig;
        } else {
          res.result = AppConstants.ETH_SIGN_ERROR;
          throw new Error('eth_sign requires 32 byte message hash');
        }
      },

      personal_sign: async () => {
        logger.log(`WB INCOMING> 6. personal_sign`);
        // const { PersonalMessageManager } = Engine.context;
        const firstParam = req.params[0];
        const secondParam = req.params[1];
        const params = {
          data: firstParam,
          from: secondParam,
        };

        if (resemblesAddress(firstParam) && !resemblesAddress(secondParam)) {
          params.data = secondParam;
          params.from = firstParam;
        }

        const pageMeta = {
          meta: {
            url: url.current,
            title: title.current,
            icon: icon.current,
          },
        };

        checkTabActive();
        checkActiveAccountAndChainId({
          address: params.from,
          activeAccounts: await getAccounts(),
        });

        const rawSig = await personalMessageManager.addUnapprovedMessageAsync({
          ...params,
          ...pageMeta,
          origin: hostname,
        });

        res.result = rawSig;
      },

      eth_signTypedData: async () => {
        logger.log(`WB INCOMING> 6. eth_signTypedData, ${JSON.stringify(req.params, null, 2)}`);
        // const { TypedMessageManager } = Engine.context;
        const pageMeta = {
          meta: {
            url: url.current,
            title: title.current,
            icon: icon.current,
          },
        };

        checkTabActive();
        checkActiveAccountAndChainId({
          address: req.params[1],
          activeAccounts: await getAccounts(),
        });

        const rawSig = await typedMessageManager.addUnapprovedMessageAsync(
          {
            data: req.params[0],
            from: req.params[1],
            ...pageMeta,
            origin: hostname,
          },
          'V1'
        );

        res.result = rawSig;
      },

      eth_signTypedData_v3: async () => {
        logger.log(`WB INCOMING> 6. eth_signTypedData_v3`);
        // const { TypedMessageManager } = Engine.context;

        const data = JSON.parse(req.params[1]);
        const chainId = data.domain.chainId;

        const pageMeta = {
          meta: {
            url: url.current,
            title: title.current,
            icon: icon.current,
          },
        };

        checkTabActive();
        checkActiveAccountAndChainId({
          address: req.params[0],
          chainId,
          activeAccounts: await getAccounts(),
        });

        const rawSig = await typedMessageManager.addUnapprovedMessageAsync(
          {
            data: req.params[1],
            from: req.params[0],
            ...pageMeta,
            origin: hostname,
          },
          'V3'
        );

        res.result = rawSig;
      },

      eth_signTypedData_v4: async () => {
        logger.log(`WB INCOMING> 6. eth_signTypedData_v4`);
        // const { TypedMessageManager } = Engine.context;

        const data = JSON.parse(req.params[1]);
        const chainId = data.domain.chainId;

        const pageMeta = {
          meta: {
            url: url.current,
            title: title.current,
            icon: icon.current,
          },
        };

        checkTabActive();
        checkActiveAccountAndChainId({
          address: req.params[0],
          chainId,
          activeAccounts: await getAccounts(),
        });

        const rawSig = await typedMessageManager.addUnapprovedMessageAsync(
          {
            data: req.params[1],
            from: req.params[0],
            ...pageMeta,
            origin: hostname,
          },
          'V4'
        );

        res.result = rawSig;
      },

      web3_clientVersion: async () => {
        if (!appVersion) {
          appVersion = await getVersion();
        }
        res.result = `MetaMask/${appVersion}/Mobile`;
      },

      /**
       * This method is used by the inpage provider to get its state on
       * initialization.
       */
      metamask_getProviderState: async () => {
        res.result = {
          ...getProviderState(),
          accounts: await getAccounts(),
        };
      },

      /**
       * This method is sent by the window.web3 shim. It can be used to
       * record web3 shim usage metrics. These metrics are already collected
       * in the extension, and can optionally be added to mobile as well.
       *
       * For now, we need to respond to this method to not throw errors on
       * the page, and we implement it as a no-op.
       */
      metamask_logWeb3ShimUsage: () => (res.result = null),
      wallet_addEthereumChain: () => {
        logger.log('called wallet_addEthereumChain');
        checkTabActive();
        // return RPCMethods.wallet_addEthereumChain({
        //   req,
        //   res,
        //   requestUserApproval,
        // });
      },

      wallet_switchEthereumChain: () => {
        logger.log('called wallet_switchEthereumChain');
        checkTabActive();
        // return RPCMethods.wallet_switchEthereumChain({
        //   req,
        //   res,
        //   requestUserApproval,
        // });
      },
    };

    // const blockRefIndex = blockTagParamIndex(req);
    // if (blockRefIndex) {
    //   const blockRef = req.params?.[blockRefIndex];
    //   // omitted blockRef implies "latest"
    //   if (blockRef === undefined) {
    //     req.params[blockRefIndex] = 'latest';
    //   }
    // }

    logger.log(`WB INCOMING> 5. rpcMethods[req.method]: ${rpcMethods[req.method]}`);
    if (!rpcMethods[req.method]) {
      logger.log('WB INCOMING> 6. no rpc method so next()');
      return next();
    }
    await rpcMethods[req.method]();
  });

export default getRpcMethodMiddleware;
