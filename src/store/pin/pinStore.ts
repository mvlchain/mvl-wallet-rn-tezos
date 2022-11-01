import create from 'zustand';
import { devtools } from 'zustand/middleware';

import { AuthModalStore, PinStore, TAuthModal } from './pinStore.type';

export const pinStore = create<PinStore>()(
  devtools((set, get) => ({
    pinMode: 'confirm',
    isOpen: false,
    mode: 'enter',
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
    init: ({ mode, pinModalResolver, pinModalRejector }) =>
      set({ mode: mode, pinModalResolver: pinModalResolver, pinModalRejector: pinModalRejector }, false, 'initPin'),
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
