// @ts-ignore
import { ethErrors } from 'eth-json-rpc-errors';
import { createAsyncMiddleware } from 'json-rpc-engine';
import { getVersion } from 'react-native-device-info';

import { controllerManager } from '@@components/BasicComponents/Modals/RPCMethodsModal/controllerManager';
import { getNetworkConfig, NETWORK } from '@@constants/network.constant';

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
      throw ethErrors.rpc.invalidParams({
        message: `Invalid parameters: must provide an Ethereum address.`,
      });
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
      const selectedAddress = '0xf2B8288Ea9FC59447BfB88EA853849733d90D632';
      return [selectedAddress];

      // const isEnabled = !!getApprovedHosts()[hostname];
      // console.log(`isEnabled: ${isEnabled}, ${selectedAddress}`);
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
      console.log(`requestUserApproval called`);
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
        // res.result = await polyfillGasPrice('getTransactionByHash', req.params);
        res.result = {
          tx: true,
        };
      },
      eth_getTransactionByBlockHashAndIndex: async () => {
        // res.result = await polyfillGasPrice('getTransactionByBlockHashAndIndex', req.params);
        res.result = {
          tx: true,
        };
      },
      eth_getTransactionByBlockNumberAndIndex: async () => {
        // res.result = await polyfillGasPrice('getTransactionByBlockNumberAndIndex', req.params);
        res.result = {
          tx: true,
        };
      },
      eth_chainId: async () => {
        // const { provider } = Engine.context.NetworkController.state;
        // const networkProvider = provider;
        // const networkType = provider.type as NetworkType;
        // const isInitialNetwork = networkType && getAllNetworks().includes(networkType);
        // let chainId;
        //
        // if (isInitialNetwork) {
        //   chainId = NetworksChainId[networkType];
        // } else if (networkType === RPC) {
        //   chainId = networkProvider.chainId;
        // }

        const chainId = getNetworkConfig(NETWORK.GOERLI).chainId.toString(10);
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
        // const {
        //   provider: { type: networkType },
        // } = Engine.context.NetworkController.state;

        // const isInitialNetwork = networkType && getAllNetworks().includes(networkType);
        // if (isInitialNetwork) {
        //   res.result = (Networks as any)[networkType].networkId;
        // } else {
        //   return next();
        // }
        res.result = getNetworkConfig(NETWORK.GOERLI).chainId.toString(10);
      },
      eth_requestAccounts: async () => {
        const { params } = req;
        // const {
        //   privacy: { privacyMode },
        // } = store.getState();
        //
        // let { selectedAddress } = Engine.context.PreferencesController.state;
        //
        // selectedAddress = selectedAddress?.toLowerCase();
        //
        // if (isWalletConnect || !privacyMode || ((!params || !params.force) && getApprovedHosts()[hostname])) {
        //   res.result = [selectedAddress];
        // } else {
        //   try {
        //     await requestUserApproval({
        //       type: ApprovalTypes.CONNECT_ACCOUNTS,
        //       requestData: { hostname },
        //     });
        //     const fullHostname = hostname;
        //     approveHost?.(fullHostname);
        //     setApprovedHosts?.({
        //       ...getApprovedHosts?.(),
        //       [fullHostname]: true,
        //     });
        //
        //     res.result = selectedAddress ? [selectedAddress] : [];
        //   } catch (e) {
        //     throw ethErrors.provider.userRejectedRequest('User denied account authorization.');
        //   }
        // }
        // FIXME: get selectedAddress
        const selectedAddress = '0xf2B8288Ea9FC59447BfB88EA853849733d90D632';
        console.log(`eth_requestAccounts: ${selectedAddress}`);
        res.result = [selectedAddress];
      },
      eth_accounts: async () => {
        console.log(`WB INCOMING> 6. eth_accounts called`);
        res.result = await getAccounts();
      },

      eth_coinbase: async () => {
        const accounts = await getAccounts();
        res.result = accounts.length > 0 ? accounts[0] : null;
      },
      eth_sendTransaction: () => {
        console.log(`WB INCOMING> 6. eth_sendTransaction called: ${JSON.stringify(req.params, null, 2)}`);
        checkTabActive();
        checkActiveAccountAndChainId({
          address: req.params[0].from,
          chainId: req.params[0].chainId,
          activeAccounts: getAccounts(),
        });
        next();
      },
      eth_signTransaction: async () => {
        console.log(`WB INCOMING> 6. eth_signTransaction`);
        // This is implemented later in our middleware stack – specifically, in
        // eth-json-rpc-middleware – but our UI does not support it.
        throw ethErrors.rpc.methodNotSupported();
      },
      eth_sign: async () => {
        console.log(`WB INCOMING> 6. eth_sign`);
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
          activeAccounts: getAccounts(),
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
          throw ethErrors.rpc.invalidParams(AppConstants.ETH_SIGN_ERROR);
        }
      },

      personal_sign: async () => {
        console.log(`WB INCOMING> 6. personal_sign`);
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
          activeAccounts: getAccounts(),
        });

        const rawSig = await personalMessageManager.addUnapprovedMessageAsync({
          ...params,
          ...pageMeta,
          origin: hostname,
        });

        res.result = rawSig;
      },

      eth_signTypedData: async () => {
        console.log(`WB INCOMING> 6. eth_signTypedData`);
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
          activeAccounts: getAccounts(),
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
        console.log(`WB INCOMING> 6. eth_signTypedData_v3`);
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
          activeAccounts: getAccounts(),
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
        console.log(`WB INCOMING> 6. eth_signTypedData_v4`);
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
          activeAccounts: getAccounts(),
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

      wallet_scanQRCode: () =>
        new Promise<void>((resolve, reject) => {
          checkTabActive();
          navigation.navigate('QRScanner', {
            onScanSuccess: (data: any) => {
              const regex = new RegExp(req.params[0]);
              if (regex && !regex.exec(data)) {
                reject({ message: 'NO_REGEX_MATCH', data });
              } else if (!regex && !/^(0x){1}[0-9a-fA-F]{40}$/i.exec(data.target_address)) {
                reject({
                  message: 'INVALID_ETHEREUM_ADDRESS',
                  data: data.target_address,
                });
              }
              let result = data;
              if (data.target_address) {
                result = data.target_address;
              } else if (data.scheme) {
                result = JSON.stringify(data);
              }
              res.result = result;
              resolve();
            },
            onScanError: (e: { toString: () => any }) => {
              throw ethErrors.rpc.internal(e.toString());
            },
          });
        }),

      wallet_watchAsset: async () => {
        console.log(`wallet_watchAsset called`);
        res.result = true;
        // const {
        //   params: {
        //     options: { address, decimals, image, symbol },
        //     type,
        //   },
        // } = req;
        // const { TokensController } = Engine.context;
        //
        // checkTabActive();
        // try {
        //   const watchAssetResult = await TokensController.watchAsset({ address, symbol, decimals, image }, type);
        //   await watchAssetResult.result;
        //   res.result = true;
        // } catch (error) {
        //   if ((error as Error).message === 'User rejected to watch the asset.') {
        //     throw ethErrors.provider.userRejectedRequest();
        //   }
        //   throw error;
        // }
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
        console.log('called wallet_addEthereumChain');
        checkTabActive();
        // return RPCMethods.wallet_addEthereumChain({
        //   req,
        //   res,
        //   requestUserApproval,
        // });
      },

      wallet_switchEthereumChain: () => {
        console.log('called wallet_switchEthereumChain');
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

    console.log(`WB INCOMING> 5. rpcMethods[req.method]: ${rpcMethods[req.method]}`);
    if (!rpcMethods[req.method]) {
      console.log('WB INCOMING> 6. no rpc method so next()');
      return next();
    }
    await rpcMethods[req.method]();
  });

export default getRpcMethodMiddleware;
