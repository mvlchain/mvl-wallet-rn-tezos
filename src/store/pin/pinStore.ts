import create from 'zustand';
import { devtools } from 'zustand/middleware';

import { PIN_MODE, PIN_SETUP_STAGE } from '@@constants/pin.constant';

import { AuthModalStore, PinStore, TAuthModal } from './pinStore.type';

const INITIAL_PINSTORE_STATE = {
  pinMode: PIN_MODE.CONFIRM,
  isError: false,
  errorMessage: null,
  stage: PIN_SETUP_STAGE.FIRST,
  current: 0,
  isOpen: false,
  mode: 'enter' as const,
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
    open: () => set({ isOpen: true }, false, 'openPinModal'),
    close: () => set({ isOpen: false }, false, 'closePinModal'),
    success: (pin: string) => {
      get().pinModalResolver?.(pin);
    },
    fail: (message: string) => {
      get().pinModalRejector?.(message);
    },
    destroy: () => set({}),
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
