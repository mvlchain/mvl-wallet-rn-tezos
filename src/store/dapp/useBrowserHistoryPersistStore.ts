import AsyncStorage from '@react-native-async-storage/async-storage';
import zustandFlipper from 'react-native-flipper-zustand';
import create from 'zustand';
import { persist } from 'zustand/middleware';

import { IUseBrowserHistoryPersist, IBrowserHistoryPersistState, IBrowserHistory } from './useBrowserHistoryPersistStore.type';

const initState: IBrowserHistoryPersistState = {
  browserHistory: [],
};

const useBrowserHistoryPersistStore = create(
  zustandFlipper(
    persist<IUseBrowserHistoryPersist>(
      (set) => ({
        ...initState,
        addBrowserHistory: (history: IBrowserHistory) =>
          set((state) => ({
            browserHistory: [history, ...state.browserHistory.filter((_history) => _history.link !== history.link)],
          })),
        deleteBrowserHistory: (link: string) =>
          set((state) => ({ browserHistory: [...state.browserHistory.filter((_history) => _history.link !== link)] })),
      }),
      {
        name: 'tokenPersist',
        getStorage: () => AsyncStorage,
      }
    ),
    'browserHistoryStore'
  )
);
export default useBrowserHistoryPersistStore;
