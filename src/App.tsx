import React, { useEffect } from 'react';

import { Appearance } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ErrorBoundary from 'react-native-error-boundary';
import SplashScreen from 'react-native-splash-screen';
import { ThemeProvider } from 'styled-components';
import 'reflect-metadata';
/**
 * initializing DI modules, should be placed under reflect-metadata import statement
 */
import './di/di';
import '@@assets/locale/i18n';
import useApp from 'useApp';

import { THEME } from '@@constants/setting.constant';
import RootStack from '@@navigation/RootStack';
import ErrorBoundaryScreen from '@@screens/ErrorBoundaryScreen';
import RTNSettings from '@@store/RTNSetting';
import { theme } from '@@style/theme';
import SecureKeychain from '@@utils/SecureKeychain';

import SplashScreen from 'react-native-splash-screen';
const queryClient = new QueryClient();

function App(props: { foxCode?: string }) {
  SecureKeychain.init(props.foxCode || 'debug');

  const { appTheme, setAppTheme } = useApp();

  /**
   * Rn's splash screen poliy for Android has different policy as of Android 12(api 31)
   * if (android.version < 31) {
   *   legacy splash screen
   * } else {
   *   android native splash screen
   * }
   *
   * Platform: Platform.OS> ios, android
   * Detecting versions: Platform.Version
   */
  useEffect(() => {
    const themeType = RTNSettings.getThemeType();
    console.log(`Darby> fetching native theme settings: ${themeType}`);

    if (themeType === THEME.DEFAULT) {
      const theme = Appearance.getColorScheme() ?? 'light';
      setAppTheme({
        displayName: THEME.DEFAULT,
        value: theme,
      });
    } else if (themeType === THEME.LIGHT) {
      setAppTheme({
        displayName: THEME.LIGHT,
        value: THEME.LIGHT,
      });
    } else if (themeType === THEME.DARK) {
      setAppTheme({
        displayName: THEME.DARK,
        value: THEME.DARK,
      });
    }

    SplashScreen.hide();
  }, []);

  return (
    <ErrorBoundary FallbackComponent={ErrorBoundaryScreen}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme[appTheme.label]}>
          <RootStack />
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
