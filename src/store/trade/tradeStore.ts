import zustandFlipper from 'react-native-flipper-zustand';
import create from 'zustand';

import { ITrade, ITradeState } from './tradeStore.type';

const initState: ITradeState = {
  selectedToken: {
    from: '',
    to: '',
  },
};

const tradeStore = create<ITrade>(
  zustandFlipper(
    (set) => ({
      ...initState,
      selectToken: (symbol: string, type: 'from' | 'to') =>
        set(
          (state) => ({
            selectedToken: {
              ...state.selectedToken,
              [type]: symbol,
            },
          }),
          false,
          'selectToken'
        ),
    }),
    'tradeStore'
  )
);
export default tradeStore;
