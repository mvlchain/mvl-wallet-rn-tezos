import zustandFlipper from 'react-native-flipper-zustand';
import create from 'zustand';

import { formatBigNumber } from '@@utils/formatBigNumber';

import { IGasStore, IGasStoreState } from './gasStore.type';

const INITIAL_GAS_STORE_STATE = {
  baseFee: null,
  tip: null,
  gas: null,
  total: null,
};
export const transactionRequestStore = create<IGasStore>(
  zustandFlipper(
    (set, get) => ({
      ...INITIAL_GAS_STORE_STATE,
      setGas: (newState) => {
        set(
          (prevState) => ({
            ...prevState,
            ...newState,
          }),
          false,
          `setGas`
        );
      },
      resetGas: () => {
        set(
          (prevState) => ({
            ...prevState,
            ...INITIAL_GAS_STORE_STATE,
          }),
          false,
          'resetGas'
        );
      },
      inString: (target: keyof IGasStoreState, decimal: number) => {
        const selectedTarget = get()[target];
        if (!selectedTarget) {
          return null;
        }
        return formatBigNumber(selectedTarget, decimal).toString(10);
      },
    }),
    'gasStore'
  )
);
