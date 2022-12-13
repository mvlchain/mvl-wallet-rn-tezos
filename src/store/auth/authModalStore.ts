import zustandFlipper from 'react-native-flipper-zustand';
import create from 'zustand';

import { IAuthModalStore, TAuthModal } from './authModalStore.type';

export const authModalStore = create<IAuthModalStore>(
  zustandFlipper(
    (set, get) => ({
      isOpen: {
        tos: false,
        guide: false,
        pin: false,
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
          'openAuthModal'
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
          'closeAuthModal'
        ),
    }),
    'authModalStore'
  )
);
