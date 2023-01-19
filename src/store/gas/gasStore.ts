import BigNumber from 'bignumber.js';
import zustandFlipper from 'react-native-flipper-zustand';
import create from 'zustand';

import { IGasStore } from './gasStore.type';

const INITIAL_GAS_STORE_STATE = {
  total: null,
};
const gasStore = create<IGasStore>(
  zustandFlipper(
    (set, get) => ({
      ...INITIAL_GAS_STORE_STATE,
      setTotal: (total: BigNumber | null) => {
        set(
          (prevState) => ({
            ...prevState,
            total,
          }),
          false,
          `setGasTotal`
        );
      },
      resetTotal: () => {
        set(
          (prevState) => ({
            ...prevState,
            ...INITIAL_GAS_STORE_STATE,
          }),
          false,
          'resetGasTotal'
        );
      },
    }),
    'gasStore'
  )
);
export default gasStore;
