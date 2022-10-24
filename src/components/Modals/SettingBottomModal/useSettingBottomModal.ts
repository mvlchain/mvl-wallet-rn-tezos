import { useTranslation } from 'react-i18next';
import { Appearance } from 'react-native';

import { CURRENCY, LANGUAGE_CODE, THEME, THEME_NAME } from '@@constants/setting.constant';
import settingStore from '@@store/setting/settingPersistStore';

import { ISettingBottomMenuProps } from './SettingBottomMenu/SettingBottomMenu.type';

const useSettingBottomModal = () => {
  const { t } = useTranslation();

  const { appTheme, settedCurrency, settedLanguage, setAppTheme, setCurrency, setLanguage } = settingStore();
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
      title: t(THEME_NAME[THEME.DEFAULT]),
      isSelected: appTheme.value === THEME.DEFAULT,
      onPress: () => {
        const Theme = Appearance.getColorScheme() ?? 'light';
        setAppTheme({
          value: THEME.DEFAULT,
          label: Theme,
        });
      },
    },
    {
      title: t(THEME_NAME[THEME.LIGHT]),
      isSelected: appTheme.value === THEME.LIGHT,
      onPress: () => {
        setAppTheme({
          value: THEME.LIGHT,
          label: THEME.LIGHT,
        });
      },
    },
    {
      title: t(THEME_NAME[THEME.DARK]),
      isSelected: appTheme.value === THEME.DARK,
      onPress: () => {
        setAppTheme({
          value: THEME.DARK,
          label: THEME.DARK,
        });
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
