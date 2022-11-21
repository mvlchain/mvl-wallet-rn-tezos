import { SvgProps } from 'react-native-svg/lib/typescript/elements/Svg';

import settingPersistStore from '@@store/setting/settingPersistStore';

export const getAssetFromTheme = (appTheme: string, light: React.FC<SvgProps>, dark: React.FC<SvgProps>) => {
  let asset = light;
  switch (appTheme) {
    case 'light':
      asset = light;
      break;
    case 'dark':
      asset = dark;
      break;
    default:
      asset = light;
  }
  return asset;
};

export const useAssetFromTheme = (light: any, dark: any) => {
  const { appTheme } = settingPersistStore();
  const asset = getAssetFromTheme(appTheme.value, light, dark);

  return asset;
};
