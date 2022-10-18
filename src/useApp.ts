import { useEffect, useState } from 'react';

import { TMyTheme } from 'App.type';
import { useTranslation } from 'react-i18next';
import { Appearance } from 'react-native';

import settingPersistStore from '@@store/setting/settingPersistStore';

const useApp = () => {
  const { i18n } = useTranslation();
  const { settedLanguage, settedTheme } = settingPersistStore();
  const [myTheme, setMyTheme] = useState<TMyTheme>('light');

  useEffect(() => {
    if (settedTheme === 'default') {
      const Theme = Appearance.getColorScheme() ?? 'light';
      setMyTheme(Theme);
    } else {
      setMyTheme(settedTheme as TMyTheme);
    }
  }, [settedTheme]);

  useEffect(() => {
    i18n.changeLanguage(settedLanguage);
  }, [settedLanguage]);

  return {
    myTheme,
  };
};

export default useApp;
