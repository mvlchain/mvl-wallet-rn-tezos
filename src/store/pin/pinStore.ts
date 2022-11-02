import create from 'zustand';
import { devtools } from 'zustand/middleware';

import { PIN_MODE, PIN_SETUP_STAGE } from '@@constants/pin.constant';

import { AuthModalStore, PinStore, TAuthModal } from './pinStore.type';

const INITIAL_PINSTORE_STATE = {
  pinMode: PIN_MODE.CONFIRM,
  error: null,
  showError: false,
  stage: PIN_SETUP_STAGE.FIRST,
};

export const pinStore = create<PinStore>()(
  devtools((set, get) => ({
    ...INITIAL_PINSTORE_STATE,
    setState: (newState) => {
      set((prevState) => ({
        ...prevState,
        ...newState,
      }));
    },
    resetStore: () => {
      set((prevState) => ({
        ...prevState,
        ...INITIAL_PINSTORE_STATE,
      }));
    },
    pinModalResolver: () => {},
    pinModalRejector: () => {},
    success: (pin: string) => {
      get().pinModalResolver?.(pin);
    },
    fail: (message: string) => {
      get().pinModalRejector?.(message);
    },
  }))
);

export const authModalStore = create<AuthModalStore>()(
  devtools((set, get) => ({
    isOpen: {
      tos: false,
      guide: false,
    },
    open: (type: keyof TAuthModal) =>
      set(
        {
          isOpen: {
            ...get().isOpen,
            [type]: true,
          },
        },
        false,
        `openAuthModal-${type}`
      ),
    close: (type: keyof TAuthModal) =>
      set(
        {
          isOpen: {
            ...get().isOpen,
            [type]: false,
          },
        },
        false,
        `closeAuthModal-${type}`
      ),
  }))
);
