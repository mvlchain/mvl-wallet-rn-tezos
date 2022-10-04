import { usePinStore, Mode } from '@@store/pin';

import SecureKeychain, { SECURE_TYPES } from '../../../utils/SecureKeychain';
export interface UIService {
  triggerGetPincode: () => Promise<string>;
  triggerSetPincode: () => Promise<string>;
  triggerGetMnemonic: () => Promise<string>;
  triggerSetMnemonic: () => Promise<string>;
  triggerConfirmMnemonic: (mnemonic: string) => Promise<boolean>;
}

export class UIServiceImpl implements UIService {
  constructor() {} //inject modalStore

  async triggerGetPincode() {
    return await this._triggerPincode('enter');
  }

  async triggerSetPincode() {
    return await this._triggerPincode('choose');
  }

  private async _triggerPincode(mode: Mode) {
    let pinModalResolver, pinModalRejector;
    const pinModalObserver = new Promise((resolve, reject) => {
      pinModalResolver = resolve;
      pinModalRejector = reject;
    });

    usePinStore.getState().init({ mode, pinModalResolver, pinModalRejector });
    usePinStore.getState().open();

    const password = await pinModalObserver;
    return password as string;
  }

  async triggerGetMnemonic() {
    return 'AGDFSHFSJSJFGJSGFJSGJSJGSJ';
  }
  async triggerSetMnemonic() {
    return 'AGDFSHFSJSJFGJSGFJSGJSJGSJ';
  }
  async triggerConfirmMnemonic(mnemonic: string) {
    return true;
  }
  async _triggerMnemonic() {
    return 'AGDFSHFSJSJFGJSGFJSGJSJGSJ';
  }
}
