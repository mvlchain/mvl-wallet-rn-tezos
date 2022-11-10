import { NativeModules } from 'react-native';

import { TTheme } from './setting/settingPersistStore.type';
const { RTNSettings } = NativeModules;

interface RTNSettingInterface {
  getThemeType(): TTheme;
  putThemeType(themeType: TTheme): void;
}

export default RTNSettings as RTNSettingInterface;
