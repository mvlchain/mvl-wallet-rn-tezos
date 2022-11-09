import { NativeModules } from 'react-native';
const { RTNSettings } = NativeModules;

interface RTNSettingInterface {
  getThemeType(): Promise<string>;
}

export default RTNSettings as RTNSettingInterface;
