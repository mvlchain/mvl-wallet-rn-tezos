import { AUTH_MODAL_NAME } from '@@constants/authModal.constant';
import { AUTH_STAGE } from '@@constants/authStage.constant';
import { PIN_MODE } from '@@constants/pin.constant';
import { pinStore, authModalStore } from '@@store/pin/pinStore';
import { Mode, PinMode } from '@@store/pin/pinStore.type';

export interface UIService {
  triggerGetPincode: () => Promise<string>;
  triggerSetPincode: (stage?: keyof typeof AUTH_STAGE) => Promise<string>;
  triggerGetMnemonic: () => Promise<string>;
  triggerSetMnemonic: () => Promise<string>;
  triggerConfirmMnemonic: (mnemonic: string) => Promise<boolean>;
}

export class UIServiceImpl implements UIService {
  constructor() {} //inject modalStore

  async triggerGetPincode() {
    return await this._triggerPincode(PIN_MODE.CONFIRM);
  }

  async triggerSetPincode(stage?: keyof typeof AUTH_STAGE) {
    return await this._triggerPincode(PIN_MODE.SETUP, stage);
  }

  private async _triggerPincode(pinMode: PinMode, stage?: keyof typeof AUTH_STAGE) {
    let pinModalResolver, pinModalRejector;
    const pinModalObserver = new Promise((resolve, reject) => {
      pinModalResolver = resolve;
      pinModalRejector = reject;
    });

    pinStore.getState().setState({ pinMode, pinModalResolver, pinModalRejector });
    // TODO: reset pin일 때 화면 처리 추가
    if (pinMode === PIN_MODE.CONFIRM) {
      pinStore.getState().open();
    } else {
      /**
       * Auth Stage에 따른 분기처리
       * TERMS_OF_SERVICE_STAGE -> Terms of Service 모달 띄우기
       * PIN_SETUP_STAGE -> pincode guide 모달 띄우기
       * BACKUP_SEED_PHRASE_STAGE -> authPersistStore의 stage값 확인 후 useSignInScreen에서 분기처리
       */
      if (stage === 'TERMS_OF_SERVICE_STAGE') {
        authModalStore.getState().open(AUTH_MODAL_NAME.TOS);
      } else if (stage === 'PIN_SETUP_STAGE') {
        authModalStore.getState().open(AUTH_MODAL_NAME.GUIDE);
      } else if (!stage) {
        pinStore.getState().open();
      }
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
