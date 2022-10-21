import { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { StatusBar } from 'react-native';

import { STATUSBAR_THEME } from '@@constants/setting.constant';
import settingPersistStore from '@@store/setting/settingPersistStore';

const useApp = () => {
  const { i18n } = useTranslation();
  const { settedLanguage, appTheme } = settingPersistStore();

  useEffect(() => {
    i18n.changeLanguage(settedLanguage);
  }, [settedLanguage]);

  useEffect(() => {
    StatusBar.setBarStyle(STATUSBAR_THEME[appTheme.value]);
  }, [appTheme]);

  return {
    appTheme,
  };
};

export default useApp;
