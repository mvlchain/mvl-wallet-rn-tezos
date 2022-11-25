import { injectable } from 'tsyringe';

import RTNSettings from '@@store/RTNSetting';
import { TTheme } from '@@store/setting/settingPersistStore.type';

export interface RTNSettingsRepository {
  getThemeType(): Promise<TTheme>;
  putThemeType(themeType: TTheme): void;
}

/**
 * Get or save the preference value directly from/to platforms'(Android, iOS) preference
 * Use this repository if you need to save values in platforms' storage,
 */
@injectable()
export class RTNSettingsRepositoryImpl implements RTNSettingsRepository {
  constructor() {}

  /**
   * @returns Get current themeType value saved in preference. This will
   * return system-default value if not ever set before.
   */
  getThemeType(): Promise<TTheme> {
    return RTNSettings.getThemeType();
  }

  /**
   * Sava a themeType value
   * @param themeType TTheme type value
   */
  putThemeType(themeType: TTheme): void {
    RTNSettings.putThemeType(themeType);
  }
}
