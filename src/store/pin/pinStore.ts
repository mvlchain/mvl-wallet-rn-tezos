import zustandFlipper from 'react-native-flipper-zustand';
import create from 'zustand';

import { PinStore } from './pinStore.type';

const INITIAL_PINSTORE_STATE = {
  pinMode: null,
  step: null,
  layout: null,
  error: null,
  showError: false,
  pinModalResolver: null,
  pinModalRejector: null,
};

export const pinStore = create<PinStore>(
  zustandFlipper(
    (set, get) => ({
      ...INITIAL_PINSTORE_STATE,
      setState: (newState) => {
        set(
          (prevState) => ({
            ...prevState,
            ...newState,
          }),
          false,
          //@ts-ignore
          `setState-${JSON.stringify(newState)}`
        );
      },
      resetStore: () => {
        set((prevState) => ({
          ...prevState,
          ...INITIAL_PINSTORE_STATE,
        }));
      },
      success: (pin: string) => {
        get().pinModalResolver?.(pin);
      },
      fail: (message: string) => {
        get().pinModalRejector?.(message);
      },
    }),
    'pinStore'
  )
);
