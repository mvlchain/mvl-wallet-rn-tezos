import { useEffect } from 'react';

import { useTranslation } from 'react-i18next';

import settingPersistStore from '@@store/setting/settingPersistStore';

const useApp = () => {
  const { i18n } = useTranslation();
  const { settedLanguage, appTheme } = settingPersistStore();

  useEffect(() => {
    i18n.changeLanguage(settedLanguage);
  }, [settedLanguage]);

  return {
    appTheme,
  };
};

export default useApp;
