import zustandFlipper from 'react-native-flipper-zustand';
import create from 'zustand';

import { IUtil, IUtilState } from './utilStore.type';

const initState: IUtilState = {
  isLoadingCnt: 0,
};

const utilStore = create<IUtil>(
  zustandFlipper(
    (set) => ({
      ...initState,
      startLoading: () => set((state) => ({ isLoadingCnt: state.isLoadingCnt + 1 }), false, 'startLoading'),
      endLoading: () => set((state) => ({ isLoadingCnt: state.isLoadingCnt - 1 > 0 ? state.isLoadingCnt - 1 : 0 }), false, 'endLoading'),
    }),
    'utilStore'
  )
);
export default utilStore;
