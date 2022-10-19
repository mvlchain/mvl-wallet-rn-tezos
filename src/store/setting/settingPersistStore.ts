import AsyncStorage from '@react-native-async-storage/async-storage';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { ISettingPersist, ISettingPersistState, TAppTheme, TCurrency, TLanguage, TTheme } from './settingPersistStore.type';

const initState: ISettingPersistState = {
  settedCurrency: 'USD',
  settedLanguage: 'en',
  settedTheme: 'dark',
  appTheme: 'dark',
};

const settingPersistStore = create<ISettingPersist>()(
  devtools(
    persist(
      (set) => ({
        ...initState,
        setCurrency: (currency: TCurrency) => set(() => ({ settedCurrency: currency }), false, 'setCurrency'),
        setLanguage: (language: TLanguage) => set(() => ({ settedLanguage: language }), false, 'setLanguage'),
        setTheme: (theme: TTheme) => set(() => ({ settedTheme: theme }), false, 'setTheme'),
        setAppTheme: (theme: TAppTheme) => set(() => ({ appTheme: theme }), false, 'setAppTheme'),
      }),
      {
        name: 'setting',
        getStorage: () => AsyncStorage,
      }
    )
  )
);

export default settingPersistStore;
