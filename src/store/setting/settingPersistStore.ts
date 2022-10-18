import AsyncStorage from '@react-native-async-storage/async-storage';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { ISettingPersist, ISettingPersistState, TCurrency, TLanguage, TTheme } from './settingPersistStore.type';

const initState: ISettingPersistState = {
  settedCurrency: 'USD',
  settedLanguage: 'en',
  settedTheme: 'dark',
};

const settingStore = create<ISettingPersist>()(
  devtools(
    persist(
      (set) => ({
        ...initState,
        setCurrency: (currency: TCurrency) => set(() => ({ settedCurrency: currency }), false, 'setCurrency'),
        setLanguage: (language: TLanguage) => set(() => ({ settedLanguage: language }), false, 'setLanguage'),
        setTheme: (theme: TTheme) => set(() => ({ settedTheme: theme }), false, 'setTheme'),
      }),
      {
        name: 'setting',
        getStorage: () => AsyncStorage,
      }
    )
  )
);

export default settingStore;
