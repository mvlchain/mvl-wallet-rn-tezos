import { getNetworkConfig, NETWORK } from '@@constants/network.constant';

import AppConstants from './AppConstants';

const EventEmitter = require('events').EventEmitter;

const { NOTIFICATION_NAMES } = AppConstants;

class WalletConnectPort extends EventEmitter {
  constructor(wcRequestActions: any) {
    super();
    this._wcRequestActions = wcRequestActions;
  }

  postMessage = (msg: any) => {
    try {
      if (msg?.data?.method === NOTIFICATION_NAMES.chainChanged) {
        // const { selectedAddress } = Engine.datamodel.flatState;
        // FIXME: get selectedAddress
        const selectedAddress = '0xf2B8288Ea9FC59447BfB88EA853849733d90D632';
        this._wcRequestActions?.updateSession?.({
          chainId: parseInt(msg.data.params.chainId, 16),
          accounts: [selectedAddress],
        });
      } else if (msg?.data?.method === NOTIFICATION_NAMES.accountsChanged) {
        const chainId = getNetworkConfig(NETWORK.GOERLI).chainId.toString(10);
        this._wcRequestActions?.updateSession?.({
          chainId: parseInt(chainId, 10),
          accounts: msg.data.params,
        });
      } else if (msg?.data?.method === NOTIFICATION_NAMES.unlockStateChanged) {
        // WC DOESN'T NEED THIS EVENT
      } else if (msg?.data?.error) {
        this._wcRequestActions?.rejectRequest?.({
          id: msg.data.id,
          error: msg.data.error,
        });
      } else {
        this._wcRequestActions?.approveRequest?.({
          id: msg.data.id,
          result: msg.data.result,
        });
      }
    } catch (e) {
      console.warn(e);
    }
  };
}

export default WalletConnectPort;
