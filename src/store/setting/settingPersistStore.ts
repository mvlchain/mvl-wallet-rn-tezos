import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { THEME } from '@@constants/setting.constant';

import { ISettedTheme, ISettingPersist, ISettingPersistState, TCurrency, TLanguage } from './settingPersistStore.type';

const initState: ISettingPersistState = {
  settedCurrency: 'USD',
  settedLanguage: 'en',
  appTheme: {
    displayName: THEME.DEFAULT,
    value: Appearance.getColorScheme() ?? 'light',
  },
  settedBioAuth: false,
};

const settingPersistStore = create<ISettingPersist>()(
  devtools(
    persist(
      (set) => ({
        ...initState,
        setCurrency: (currency: TCurrency) => set(() => ({ settedCurrency: currency }), false, 'setCurrency'),
        setLanguage: (language: TLanguage) => set(() => ({ settedLanguage: language }), false, 'setLanguage'),
        setAppTheme: (theme: ISettedTheme) => set(() => ({ appTheme: theme }), false, 'setAppTheme'),
        toggleBioAuth: () => set((state) => ({ settedBioAuth: !state.settedBioAuth }), false, 'toggleBioAuth'),
      }),
      {
        name: 'setting',
        getStorage: () => AsyncStorage,
      }
    ),
    { name: 'settingPersistStore', enabled: __DEV__ }
  )
);

export default settingPersistStore;
