import React, { useEffect } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Appearance } from 'react-native';
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
import { useDi } from '@@hooks/common/useDi';
import RootStack from '@@navigation/RootStack';
import ErrorBoundaryScreen from '@@screens/ErrorBoundaryScreen';
import { theme } from '@@style/theme';
import SecureKeychain from '@@utils/SecureKeychain';

const queryClient = new QueryClient();

function App(props: { foxCode?: string }) {
  SecureKeychain.init(props.foxCode || 'debug');

  const { appTheme, setAppTheme } = useApp();

  /**
   * Rn's splash screen policy for Android need to be handled in a separate solutin as of Android 12(api 31)
   * if (android.version < 31) {
   *   legacy splash screen
   * } else {
   *   android native splash screen
   * }
   *
   * splash screenf for Android 12(api 31) will be updated in the coming version.
   *
   * Platform: Platform.OS> ios, android
   * Detecting versions: Platform.Version
   *
   * NOTE!
   * this useEffect is subject to refacotring task
   */
  const settingsRepository = useDi('RTNSettingsRepository');
  useEffect(() => {
    (async () => {
      const themeType = await settingsRepository.getThemeType();
      console.log(`Theme> fetching native theme settings: ${themeType}`);

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
    })();
  }, []);

  return (
    <ErrorBoundary FallbackComponent={ErrorBoundaryScreen}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme[appTheme.value]}>
          <RootStack />
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
