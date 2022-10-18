import { CURRENCY, LANGUAGE_CODE, THEME } from '@@constants/setting.constant';
import settingStore from '@@store/setting/settingPersistStore';

import { ISettingBottomMenuProps } from './SettingBottomMenu/SettingBottomMenu.type';

const useSettingBottomModal = () => {
  const { settedTheme, settedCurrency, settedLanguage, setTheme, setCurrency, setLanguage } = settingStore();
  const currencyMenu: ISettingBottomMenuProps[] = [
    {
      title: 'USD',
      isSelected: settedCurrency === CURRENCY.USD,
      onPress: () => {
        setCurrency(CURRENCY.USD);
      },
    },
    {
      title: 'SGD',
      isSelected: settedCurrency === CURRENCY.SGD,
      onPress: () => {
        setCurrency(CURRENCY.SGD);
      },
    },
    {
      title: 'KRW',
      isSelected: settedCurrency === CURRENCY.KRW,
      onPress: () => {
        setCurrency(CURRENCY.KRW);
      },
    },
  ];

  const languageMenu: ISettingBottomMenuProps[] = [
    {
      title: 'English',
      isSelected: settedLanguage === LANGUAGE_CODE.EN,
      onPress: () => {
        setLanguage(LANGUAGE_CODE.EN);
      },
    },
    {
      title: 'ភាសាខ្មែរ',
      isSelected: settedLanguage === LANGUAGE_CODE.KM,
      onPress: () => {
        setLanguage(LANGUAGE_CODE.KM);
      },
    },
    {
      title: '한국어',
      isSelected: settedLanguage === LANGUAGE_CODE.KO,
      onPress: () => {
        setLanguage(LANGUAGE_CODE.KO);
      },
    },
  ];

  const themeMenu: ISettingBottomMenuProps[] = [
    {
      title: 'System Default',
      isSelected: settedTheme === THEME.DEFAULT,
      onPress: () => {
        setTheme(THEME.DEFAULT);
      },
    },
    {
      title: 'Light',
      isSelected: settedTheme === THEME.LIGHT,
      onPress: () => {
        setTheme(THEME.LIGHT);
      },
    },
    {
      title: 'Dark',
      isSelected: settedTheme === THEME.DARK,
      onPress: () => {
        setTheme(THEME.DARK);
      },
    },
  ];

  return {
    currencyMenu,
    languageMenu,
    themeMenu,
  };
};

export default useSettingBottomModal;
