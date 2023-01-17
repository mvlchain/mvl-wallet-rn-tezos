import React from 'react';

import { EventEmitter } from 'events';

// @ts-ignore
import createFilterMiddleware from 'eth-json-rpc-filters';
// @ts-ignore
import createSubscriptionManager from 'eth-json-rpc-filters/subscriptionManager';
import { JsonRpcEngine } from 'json-rpc-engine';
import { createEngineStream } from 'json-rpc-middleware-stream';
// @ts-ignore
import ObjectMultiplex from 'obj-multiplex';
import pump from 'pump';
import { WebView } from 'react-native-webview';
// @ts-ignore
import { createEventEmitterProxy, createSwappableProxy } from 'swappable-obj-proxy';
import URL from 'url-parse';

import { controllerManager } from '@@components/BasicComponents/Modals/RPCMethodsModal/controllerManager';
import { getNetworkByBase, getNetworkConfig, NETWORK } from '@@constants/network.constant';
import walletPersistStore from '@@store/wallet/walletPersistStore';
import { getAddress } from '@@utils/walletHelper';

import AppConstants from './AppConstants';
import MobilePortStream from './MobilePortStream';
import Port from './Port';

const USER_REJECTED_ERRORS = ['user_rejected_transaction'];
const USER_REJECTED_ERROR_CODE = 4001;

function containsUserRejectedError(errorMessage: any, errorCode: any) {
  try {
    if (!errorMessage || !(typeof errorMessage === 'string')) return false;

    const userRejectedErrorMessage = USER_REJECTED_ERRORS.some((userRejectedError) =>
      errorMessage.toLowerCase().includes(userRejectedError.toLowerCase())
    );

    if (userRejectedErrorMessage) return true;

    if (errorCode === USER_REJECTED_ERROR_CODE) return true;

    return false;
  } catch (e) {
    return false;
  }
}

export function createLoggerMiddleware(opts: any) {
  return function loggerMiddleware(req: any, res: any, next: any) {
    next((cb: any) => {
      if (res.error) {
        const { error, ...resWithoutError } = res;
        if (error) {
          if (containsUserRejectedError(error.message, error.code)) {
            // trackErrorAsAnalytics(
            //   `Error in RPC response: User rejected`,
            //   error.message,
            // );
          } else {
            /**
             * Example of a rpc error:
             * { "code":-32603,
             *   "message":"Internal JSON-RPC error.",
             *   "data":{"code":-32000,"message":"gas required exceeds allowance (59956966) or always failing transaction"}
             * }
             * This will make the error log to sentry with the title "gas required exceeds allowance (59956966) or always failing transaction"
             * making it easier to differentiate each error.
             */
            let errorToLog = error;
            const errorParams: any = {
              message: 'Error in RPC response',
              orginalError: error,
              res: resWithoutError,
            };

            if (error.message) {
              errorToLog = new Error(error.message);
            }

            if (error.data) {
              errorParams.data = error.data;

              if (error.data.message) {
                errorToLog = new Error(error.data.message);
              }
            }

            console.error(errorToLog, errorParams);
          }
        }
      }
      if (req.isMetamaskInternal) {
        return;
      }
      console.log(`WB MIDDLEWARE LOGGING> RPC (${opts.origin}):`, req, '->', res);
      cb();
    });
  };
}

export function createOriginMiddleware(opts: any) {
  return function originMiddleware(req: any, _: any, next: any) {
    console.log(`called originMiddleware`);
    req.origin = opts.origin;

    if (!req.params) {
      req.params = [];
    }

    next();
  };
}

const { NOTIFICATION_NAMES } = AppConstants;

function setupMultiplex(connectionStream: any) {
  const mux = new ObjectMultiplex();
  pump(connectionStream, mux, connectionStream, (err: any) => {
    if (err) {
      console.warn(err);
    }
  });
  return mux;
}

export class BackgroundBridge extends EventEmitter {
  private url: any;
  private hostname: any;
  private _webviewRef: any;
  private disconnected: any;
  private createMiddleware: any;
  private _providerProxy: any;
  private _blockTrackerProxy: any;
  private port: any;
  private engine: any;
  private chainIdSent: any;
  private provider: any;
  private blockTracker: any;

  constructor({
    webview,
    url,
    getRpcMethodMiddleware,
  }: {
    webview: React.MutableRefObject<WebView<any> | null>;
    url: string;
    getRpcMethodMiddleware: any;
  }) {
    super();
    this.url = url;
    this.hostname = new URL(url).hostname;
    this._webviewRef = webview && webview.current;
    this.disconnected = false;

    this.createMiddleware = getRpcMethodMiddleware;

    const networkConfig = getNetworkConfig(NETWORK.GOERLI);

    const { networkController } = controllerManager;
    const provider = networkController.provider;
    // @ts-ignore
    const blockTracker = provider._blockTracker;

    // provider and block tracker proxies - because the network changes
    this._providerProxy = null;
    this._blockTrackerProxy = null;

    this.setProviderAndBlockTracker({ provider, blockTracker });

    this.port = new Port(this._webviewRef);

    this.engine = null;

    this.chainIdSent = `0x${networkConfig.chainId.toString(16)}`;

    const portStream = new MobilePortStream(this.port, url);
    // setup multiplexing
    const mux = setupMultiplex(portStream);
    // connect features
    this.setupProviderConnection(mux.createStream('metamask-provider'));

    // Engine.controllerMessenger.subscribe(AppConstants.NETWORK_STATE_CHANGE_EVENT, this.sendStateUpdate);
    // Engine.context.PreferencesController.subscribe(this.sendStateUpdate);

    // Engine.context.KeyringController.onLock(this.onLock.bind(this));
    // Engine.context.KeyringController.onUnlock(this.onUnlock.bind(this));

    this.on('update', this.onStateUpdate);
  }

  setProviderAndBlockTracker({ provider, blockTracker }: any) {
    // update or intialize proxies
    if (this._providerProxy) {
      this._providerProxy.setTarget(provider);
    } else {
      this._providerProxy = createSwappableProxy(provider);
    }
    if (this._blockTrackerProxy) {
      this._blockTrackerProxy.setTarget(blockTracker);
    } else {
      this._blockTrackerProxy = createEventEmitterProxy(blockTracker, {
        eventFilter: 'skipInternal',
      });
    }
    // set new provider and blockTracker
    this.provider = provider;
    this.blockTracker = blockTracker;
  }

  getProviderNetworkState({ network: chainId }: { network: string }) {
    let hexChainId: string;
    if (chainId && !chainId.startsWith('0x')) {
      // Convert to hex
      hexChainId = `0x${parseInt(chainId, 10).toString(16)}`;
    } else {
      hexChainId = chainId;
    }

    return {
      networkVersion: chainId,
      chainId: hexChainId,
    };
  }

  notifyChainChanged(params: any) {
    this.sendNotification({
      method: NOTIFICATION_NAMES.chainChanged,
      params,
    });
  }

  notifySelectedAddressChanged(selectedAddress: any) {
    this.sendNotification({
      method: NOTIFICATION_NAMES.accountsChanged,
      params: [selectedAddress],
    });
  }

  onStateUpdate() {
    // const networkConfig = getNetworkConfig(NETWORK.GOERLI);
    // const provider = EvmJsonRpcProviderHolder.getMetamaskProvider(networkConfig.rpcUrl);
    const { networkController } = controllerManager;
    const provider = networkController.provider;
    // @ts-ignore
    const blockTracker = provider._blockTracker;
    this.setProviderAndBlockTracker({ provider, blockTracker });
    const memState = this.getState();
    const publicState = this.getProviderNetworkState(memState);

    // Check if update already sent
    if (this.chainIdSent !== publicState.chainId && publicState.networkVersion !== 'loading') {
      this.chainIdSent = publicState.chainId;
      this.notifyChainChanged(publicState);
    }
  }

  isUnlocked() {
    console.log(`isUnlocked: true`);
    return true;
  }

  getProviderState() {
    const memState = this.getState();
    return {
      isUnlocked: this.isUnlocked(),
      ...this.getProviderNetworkState(memState),
    };
  }

  sendStateUpdate = () => {
    this.emit('update');
  };

  onMessage = (msg: any) => {
    console.log(`WB INCOMING> 3. onMessage in bridge this.port.emit message`);
    this.port.emit('message', { name: msg.name, data: msg.data });
  };

  onDisconnect = () => {
    this.disconnected = true;
    // Engine.controllerMessenger.unsubscribe(AppConstants.NETWORK_STATE_CHANGE_EVENT, this.sendStateUpdate);
    // Engine.context.PreferencesController.unsubscribe(this.sendStateUpdate);
    this.port.emit('disconnect', { name: this.port.name, data: null });
  };

  /**
   * A method for serving our ethereum provider over a given stream.
   * @param {*} outStream - The stream to provide over.
   */
  setupProviderConnection(outStream: any) {
    this.engine = this.setupProviderEngine();

    // setup connection
    const providerStream = createEngineStream({ engine: this.engine });

    pump(outStream, providerStream, outStream, (err: any) => {
      // handle any middleware cleanup
      this.engine._middleware.forEach((mid: any) => {
        if (mid.destroy && typeof mid.destroy === 'function') {
          mid.destroy();
        }
      });
      if (err) console.log('Error with provider stream conn', err);
    });
  }

  /**
   * A method for creating a provider that is safely restricted for the requesting domain.
   **/
  setupProviderEngine() {
    const origin = this.hostname;
    // setup json rpc engine stack
    const engine = new JsonRpcEngine();
    const provider = this._providerProxy;
    console.log(`WB SETUP> setupProviderEngine provider: ${this._providerProxy}, sendAsync: ${this._providerProxy && this._providerProxy.sendAsync}`);

    const blockTracker = this._blockTrackerProxy;

    // create filter polyfill middleware
    const filterMiddleware = createFilterMiddleware({ provider, blockTracker });

    // create subscription polyfill middleware
    const subscriptionManager = createSubscriptionManager({
      provider,
      blockTracker,
    });
    subscriptionManager.events.on('notification', (message: any) => engine.emit('notification', message));

    // metadata
    engine.push(createOriginMiddleware({ origin }));
    engine.push(createLoggerMiddleware({ origin }));
    // filter and subscription polyfills
    engine.push(filterMiddleware);
    engine.push(subscriptionManager.middleware);
    // watch asset

    // user-facing RPC methods
    engine.push(
      this.createMiddleware({
        hostname: this.hostname,
        getProviderState: this.getProviderState.bind(this),
      })
    );

    function providerAsMiddleware(provider: any) {
      return (req: any, res: any, next: any, end: any) => {
        // send request to provider
        console.log(`WB INCOMING> 7. provider.sendAsync middleware`);
        provider.sendAsync(req, (err: any, providerRes: any) => {
          console.log(`WB OUTGOING> provider.sendAsync ${err}, ${providerRes}`);
          // forward any error
          if (err) return end(err);
          // copy provider response onto original response
          Object.assign(res, providerRes);
          end();
        });
      };
    }

    // forward to metamask primary provider
    engine.push(providerAsMiddleware(provider));

    return engine;
  }

  sendNotification(payload: any) {
    this.engine && this.engine.emit('notification', payload);
  }

  /**
   * The metamask-state of the various controllers, made available to the UI
   *
   * @returns {Object} status
   */
  getState() {
    const { selectedNetwork } = walletPersistStore.getState();
    const networkConfig = getNetworkConfig(getNetworkByBase(selectedNetwork));

    const selectedAddress = getAddress();

    return {
      isInitialized: true,
      isUnlocked: true,
      network: networkConfig.chainId.toString(10),
      selectedAddress,
    };
  }
}

export default BackgroundBridge;
