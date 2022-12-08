import create from 'zustand';
import { devtools } from 'zustand/middleware';

import { IUtil, IUtilState } from './utilStore.type';

const initState: IUtilState = {
  isLoadingCnt: 0,
};

const globalModalStore = create<IUtil>()(
  devtools(
    (set) => ({
      ...initState,
      startLoading: () => set((state) => ({ isLoadingCnt: state.isLoadingCnt + 1 }), false, 'startLoading'),
      endLoading: () => set((state) => ({ isLoadingCnt: state.isLoadingCnt - 1 > 0 ? state.isLoadingCnt - 1 : 0 }), false, 'endLoading'),
    }),
    { name: 'globalModalStore', enabled: __DEV__ }
  )
);
export default globalModalStore;
