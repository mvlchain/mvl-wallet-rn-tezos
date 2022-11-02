import { PIN_MODE, PIN_SETUP_STAGE } from '@@constants/pin.constant';

export type Mode = 'choose' | 'enter' | 'locked';

export interface PinstoreInitialDTO {
  mode: Mode;
  pinModalResolver: Function | undefined;
  pinModalRejector: Function | undefined;
  pinMode: PinMode;
  isError: boolean;
  errorMessage: string | null;
  stage: PinSetupStage;
  current: number;
}

export interface PinStore extends PinstoreInitialDTO {
  setState: SetState<PinStore>;
  isOpen: boolean;
  open: Function;
  close: Function;
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

export type PinMode = typeof PIN_MODE[keyof typeof PIN_MODE];
export type PinSetupStage = typeof PIN_SETUP_STAGE[keyof typeof PIN_SETUP_STAGE];
export type SetState<T> = (newState: Partial<Omit<T, 'setState'>>) => void;
