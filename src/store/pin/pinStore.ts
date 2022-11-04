import create from 'zustand';
import { devtools } from 'zustand/middleware';

import { PIN_LAYOUT, PIN_MODE, PIN_STEP } from '@@constants/pin.constant';

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

export const pinStore = create<PinStore>()(
  devtools((set, get) => ({
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
  }))
);
