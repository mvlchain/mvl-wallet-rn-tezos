import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';
import zustandFlipper from 'react-native-flipper-zustand';
import create from 'zustand';
import { persist } from 'zustand/middleware';

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

const settingPersistStore = create(
  zustandFlipper(
    persist<ISettingPersist>(
      (set) => ({
        ...initState,
        setCurrency: (currency: TCurrency) => set(() => ({ settedCurrency: currency })),
        setLanguage: (language: TLanguage) => set(() => ({ settedLanguage: language })),
        setAppTheme: (theme: ISettedTheme) => set(() => ({ appTheme: theme })),
        toggleBioAuth: () => set((state) => ({ settedBioAuth: !state.settedBioAuth })),
      }),
      {
        name: 'setting',
        getStorage: () => AsyncStorage,
      }
    ),
    'settingPersistStore'
  )
);

export default settingPersistStore;
