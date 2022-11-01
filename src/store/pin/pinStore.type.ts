import { PIN_MODE } from '@@constants/pin.constant';

export type Mode = 'choose' | 'enter' | 'locked';

export interface PinstoreInitialDTO {
  mode: Mode;
  pinModalResolver: Function | undefined;
  pinModalRejector: Function | undefined;
  pinMode: PinMode;
}

export interface PinStore extends PinstoreInitialDTO {
  isOpen: boolean;
  open: Function;
  close: Function;
  success: (pin: string) => void;
  fail: (message: string) => void;
  init: (init: PinstoreInitialDTO) => void;
  destroy: Function;
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
