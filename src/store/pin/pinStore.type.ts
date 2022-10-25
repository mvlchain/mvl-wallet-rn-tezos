export type Mode = 'choose' | 'enter' | 'locked';

export interface PinstoreInitialDTO {
  mode: Mode;
  pinModalResolver: Function | undefined;
  pinModalRejector: Function | undefined;
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
