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
  isDataRequired: false,
  //estimategas할때 tokenDto의 contractAddress유무에 따라 data를 보내서 가스를 계산할지 판단한다.
  //trade에서는 coin인 경우에도 데이터를 보내서 가스를 계산해야하므로 isDataRequired 를 셋해서 사용하도록 한다.
  //다른 판단기준을 만들어야하는지 고민.
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
