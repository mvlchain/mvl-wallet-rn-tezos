import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { Appearance } from 'react-native';

import settingPersistStore from '@@store/setting/settingPersistStore';
import { TAppTheme } from '@@store/setting/settingPersistStore.type';

const useApp = () => {
  const { i18n } = useTranslation();
  const { settedLanguage, settedTheme, appTheme, setAppTheme } = settingPersistStore();

  useEffect(() => {
    if (settedTheme === 'default') {
      const Theme = Appearance.getColorScheme() ?? 'light';
      setAppTheme(Theme);
    } else {
      setAppTheme(settedTheme as TAppTheme);
    }
  }, [settedTheme]);

  useEffect(() => {
    i18n.changeLanguage(settedLanguage);
  }, [settedLanguage]);

  return {
    appTheme,
  };
};

export default useApp;
