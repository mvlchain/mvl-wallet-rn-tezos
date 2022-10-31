import { AUTH_MODAL_NAME } from '@@constants/authModal.constant';
import { pinStore, authModalStore } from '@@store/pin/pinStore';
import { Mode } from '@@store/pin/pinStore.type';

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

    pinStore.getState().init({ mode, pinModalResolver, pinModalRejector });
    // TODO: reset pin일 때 화면 처리 추가
    if (mode === 'enter') {
      pinStore.getState().open();
    } else {
      authModalStore.getState().open(AUTH_MODAL_NAME.TOS);
    }
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
