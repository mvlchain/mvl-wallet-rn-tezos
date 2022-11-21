import { NativeModules } from 'react-native';

import { TTheme } from './setting/settingPersistStore.type';
const { RTNSettings } = NativeModules;

interface RTNSettingInterface {
  getThemeType(): TTheme;
  putThemeType(themeType: TTheme): void;
}

/**
 * React Native Component that enables to save configuration values to platforms'(Android, iOS)
 * preference store.
 *  - Android: SharedPreferenceStorage(Preference)
 *  - iOS: SettingsStorage(UserDefaults)
 *
 * RTNSettings directly bounds folling platforms' module
 *  RTNSettings
 *    Android: -> RTNSettingsModule -> SharedPreferenceStorage
 *    iOS: -> RTNSettingsModule -> SettingsStorage
 */
export default RTNSettings as RTNSettingInterface;
