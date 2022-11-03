import create from 'zustand';
import { devtools } from 'zustand/middleware';

import { PIN_MODE, PIN_SETUP_STAGE } from '@@constants/pin.constant';

import { PinStore } from './pinStore.type';

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
    pinModalResolver: null,
    pinModalRejector: null,
    success: (pin: string) => {
      get().pinModalResolver?.(pin);
    },
    fail: (message: string) => {
      get().pinModalRejector?.(message);
    },
  }))
);
