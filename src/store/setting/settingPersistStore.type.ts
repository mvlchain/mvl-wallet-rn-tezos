export interface ISettingPersist extends ISettingPersistState {
  setCurrency: (currency: TCurrency) => void;
  setLanguage: (language: TLanguage) => void;
  setAppTheme: (theme: ISettedTheme) => void;
  toggleBioAuth: () => void;
}

export interface ISettingPersistState {
  settedCurrency: TCurrency;
  settedLanguage: TLanguage;
  appTheme: ISettedTheme;
  settedBioAuth: boolean;
}

export type TCurrency = 'USD' | 'SGD' | 'KRW';

export type TLanguage = 'en' | 'km' | 'ko';

export type TTheme = 'light' | 'dark' | 'default';

export type TAppTheme = 'dark' | 'light';

export interface ISettedTheme {
  value: TAppTheme;
  displayName: TTheme;
}
