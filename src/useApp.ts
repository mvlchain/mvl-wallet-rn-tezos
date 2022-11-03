import { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Alert, StatusBar } from 'react-native';
import { setJSExceptionHandler } from 'react-native-exception-handler';

import { STATUSBAR_THEME } from '@@constants/setting.constant';
import settingPersistStore from '@@store/setting/settingPersistStore';

const useApp = () => {
  const { i18n } = useTranslation();
  const { settedLanguage, appTheme, setAppTheme } = settingPersistStore();

  useEffect(() => {
    i18n.changeLanguage(settedLanguage);
  }, [settedLanguage]);

  useEffect(() => {
    StatusBar.setBarStyle(STATUSBAR_THEME[appTheme.displayName]);
  }, [appTheme]);

  const errorHandler = (error: Error) => {
    if (__DEV__) {
      // Alert.alert('Service Error', 'An unknown problem has occurred.');
      return;
    }

    // TODO: Error 처리 추가 (ex: sentry, crashlytics)
    Alert.alert('Service Error', 'An unknown problem has occurred.');
  };

  setJSExceptionHandler(errorHandler, true);

  return {
    appTheme,
    setAppTheme,
  };
};

export default useApp;
