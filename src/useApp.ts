import { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Alert, StatusBar, Appearance } from 'react-native';
import { setJSExceptionHandler } from 'react-native-exception-handler';

import { THEME, STATUSBAR_THEME } from '@@constants/setting.constant';
import settingPersistStore from '@@store/setting/settingPersistStore';

const useApp = () => {
  const { i18n } = useTranslation();
  const { settedLanguage, appTheme, setAppTheme } = settingPersistStore();

  useEffect(() => {
    i18n.changeLanguage(settedLanguage);
  }, [settedLanguage]);

  useEffect(() => {
    console.log(`Theme> updating StatusBar style ${STATUSBAR_THEME[appTheme.displayName]}`);
    const statusBarThemeStyle = getStatusBarThemeStyle(appTheme.displayName);
    StatusBar.setBarStyle(STATUSBAR_THEME[statusBarThemeStyle]);
  }, [appTheme]);

  // appearance change events(Theme)
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (appTheme.displayName === THEME.DEFAULT) {
        const theme = Appearance.getColorScheme() ?? 'light';
        setAppTheme({
          displayName: THEME.DEFAULT,
          value: theme,
        });
      } else if (appTheme.displayName === THEME.LIGHT) {
        setAppTheme({
          displayName: THEME.LIGHT,
          value: THEME.LIGHT,
        });
      } else if (appTheme.displayName === THEME.DARK) {
        setAppTheme({
          displayName: THEME.DARK,
          value: THEME.DARK,
        });
      }
    });

    return () => {
      subscription.remove();
    };
  }, [appTheme]);

  const getStatusBarThemeStyle = (themeStyle: string) => {
    if (themeStyle === THEME.LIGHT) {
      return THEME.DARK;
    } else if (themeStyle === THEME.DARK) {
      return THEME.LIGHT;
    } else {
      return THEME.DEFAULT;
    }
  };

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
