import { AUTH_MODAL_NAME } from '@@constants/authModal.constant';
import { AUTH_STAGE } from '@@constants/authStage.constant';
import { PIN_LAYOUT, PIN_MODE, PIN_STEP } from '@@constants/pin.constant';
import { authModalStore } from '@@store/auth/authModalStore';
import { pinStore } from '@@store/pin/pinStore';
import { TPinMode } from '@@store/pin/pinStore.type';

export interface UIService {
  triggerGetPincode: () => Promise<string>;
  triggerSetPincode: (stage?: keyof typeof AUTH_STAGE) => Promise<string>;
  triggerResetPincode: () => Promise<string>;
  currentPinUpdateToReset: () => void;
}

export class UIServiceImpl implements UIService {
  constructor() {} //inject modalStore

  triggerGetPincode = async () => {
    return await this._triggerPincode(PIN_MODE.CONFIRM);
  };

  triggerSetPincode = async (stage?: keyof typeof AUTH_STAGE) => {
    return await this._triggerPincode(PIN_MODE.SETUP, stage);
  };

  triggerResetPincode = async () => {
    return await this._triggerPincode(PIN_MODE.RESET);
  };

  private _triggerPincode = async (pinMode: TPinMode, stage?: keyof typeof AUTH_STAGE) => {
    let pinModalResolver, pinModalRejector;
    const pinModalObserver = new Promise((resolve, reject) => {
      pinModalResolver = resolve;
      pinModalRejector = reject;
    });

    pinStore.getState().setState({ pinMode, pinModalResolver, pinModalRejector, layout: PIN_LAYOUT.FULLSCREEN, step: PIN_STEP.ENTER });

    if (!stage) {
      authModalStore.getState().open(AUTH_MODAL_NAME.PIN);
    } else {
      /**
       * Auth Stage에 따른 분기처리
       * TERMS_OF_SERVICE_STAGE -> Terms of Service 모달 띄우기
       * PIN_SETUP_STAGE -> pincode guide 모달 띄우기
       * BACKUP_SEED_PHRASE_STAGE -> authPersistStore의 stage값 확인 후 useSignInScreen에서 분기처리
       */
      if (stage === AUTH_STAGE.TERMS_OF_SERVICE_STAGE) {
        authModalStore.getState().open(AUTH_MODAL_NAME.TOS);
      } else if (stage === AUTH_STAGE.PIN_SETUP_STAGE) {
        authModalStore.getState().open(AUTH_MODAL_NAME.GUIDE);
      }
    }
    const password = await pinModalObserver;
    return password as string;
  };

  currentPinUpdateToReset = () => {
    pinStore.getState().setState({ pinMode: PIN_MODE.RESET, step: PIN_STEP.ENTER });
  };
}
