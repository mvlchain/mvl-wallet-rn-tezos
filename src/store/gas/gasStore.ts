import zustandFlipper from 'react-native-flipper-zustand';
import create from 'zustand';

import { GAS_LEVEL } from '@@constants/gas.constant';
import { formatBigNumber } from '@@utils/formatBigNumber';

import { IGasStore, IGasStoreState } from './gasStore.type';

const INITIAL_GAS_STORE_STATE = {
  baseFee: null,
  tip: null,
  gas: null,
  total: null,
  level: GAS_LEVEL.LOW,
  baseFeeValid: false,
  tipValid: false,
  gasValid: false,
};
const gasStore = create<IGasStore>(
  zustandFlipper(
    (set, get) => ({
      ...INITIAL_GAS_STORE_STATE,
      setState: (newState) => {
        set(
          (prevState) => ({
            ...prevState,
            ...newState,
          }),
          false,
          `setGas`
        );
      },
      resetState: () => {
        set(
          (prevState) => ({
            ...prevState,
            ...INITIAL_GAS_STORE_STATE,
          }),
          false,
          'resetGas'
        );
      },
    }),
    'gasStore'
  )
);
export default gasStore;
