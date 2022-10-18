export interface ISettingPersist extends ISettingPersistState {
  setCurrency: (currency: TCurrency) => void;
  setLanguage: (language: TLanguage) => void;
  setTheme: (theme: TTheme) => void;
}

export interface ISettingPersistState {
  settedCurrency: TCurrency;
  settedLanguage: TLanguage;
  settedTheme: TTheme;
}

export type TCurrency = 'USD' | 'SGD' | 'KRW';

export type TLanguage = 'en' | 'km' | 'ko';

export type TTheme = 'light' | 'dark' | 'default';
