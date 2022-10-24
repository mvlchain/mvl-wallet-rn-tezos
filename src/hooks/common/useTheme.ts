import { SvgProps } from 'react-native-svg/lib/typescript/elements/Svg';

import settingStore from '@@store/setting/settingPersistStore';

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
  const { appTheme } = settingStore();
  const asset = getAssetFromTheme(appTheme.label, light, dark);

  return asset;
};
