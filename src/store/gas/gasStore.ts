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
      inString: (target: keyof Omit<IGasStoreState, 'level'>, decimal: number) => {
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
export default gasStore;
