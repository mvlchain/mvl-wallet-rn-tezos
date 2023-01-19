import zustandFlipper from 'react-native-flipper-zustand';
import create from 'zustand';

import { IUseBrowserHistory, IUseBrowserHistoryState } from './useBrowserHistoryStore.type';

const initState: IUseBrowserHistoryState = {
  searchValue: '',
};

const useBrowserHistoryStore = create<IUseBrowserHistory>(
  zustandFlipper(
    (set) => ({
      ...initState,
      setSearchValue: (text: string) =>
        set(
          () => ({
            searchValue: text,
          }),
          false,
          'setSearchValue'
        ),
    }),
    'browserHistoryStore'
  )
);
export default useBrowserHistoryStore;
