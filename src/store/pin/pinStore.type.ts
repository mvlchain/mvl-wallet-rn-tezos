import { PIN_MODE, PIN_SETUP_STAGE } from '@@constants/pin.constant';

export interface PinstoreInitialDTO {
  pinModalResolver: Function | undefined;
  pinModalRejector: Function | undefined;
  pinMode: TPinMode;
  error: TError | null;
  showError: boolean;
  stage: TPinSetupStage;
}

export interface PinStore extends PinstoreInitialDTO {
  setState: TSetState<PinStore>;
  success: (pin: string) => void;
  fail: (message: string) => void;
  resetStore: () => void;
}

export interface AuthModalStore {
  isOpen: TAuthModal;
  open: (type: keyof TAuthModal) => void;
  close: (type: keyof TAuthModal) => void;
}

export type TAuthModal = {
  tos: boolean;
  guide: boolean;
};

export type TError = {
  message: string;
};

export type TPinMode = typeof PIN_MODE[keyof typeof PIN_MODE];
export type TPinSetupStage = typeof PIN_SETUP_STAGE[keyof typeof PIN_SETUP_STAGE];
export type TSetState<T> = (newState: Partial<Omit<T, 'setState'>>) => void;
