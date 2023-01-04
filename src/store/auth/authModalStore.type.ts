export interface IAuthModalStore {
  isOpen: TAuthModal;
  open: (type: keyof TAuthModal) => void;
  close: (type: keyof TAuthModal) => void;
}

export type TAuthModal = {
  // terms of service
  tos: boolean;
  guide: boolean;
  pin: boolean;
};
