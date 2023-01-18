import { useEffect } from 'react';

import { Appearance } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import { THEME } from '@@constants/setting.constant';
import { useDi } from '@@hooks/useDi';
import settingPersistStore from '@@store/setting/settingPersistStore';

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
 */
export const useSplashScreenTransition = () => {
  const settingsRepository = useDi('RTNSettingsRepository');
  const { setAppTheme } = settingPersistStore();

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
};
