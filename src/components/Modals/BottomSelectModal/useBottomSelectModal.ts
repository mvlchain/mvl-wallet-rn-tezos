import { useTranslation } from 'react-i18next';
import { Appearance } from 'react-native';

import { CURRENCY, LANGUAGE_CODE, THEME, THEME_NAME } from '@@constants/setting.constant';
import settingPersistStore from '@@store/setting/settingPersistStore';

import { IBottomSelectMenuProps } from './BottomSelectMenu/BottomSelectMenu.type';

const useBottomSelectModal = () => {
  const { t } = useTranslation();

  const { appTheme, settedCurrency, settedLanguage, setAppTheme, setCurrency, setLanguage } = settingPersistStore();
  const currencyMenu: IBottomSelectMenuProps[] = [
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

  const languageMenu: IBottomSelectMenuProps[] = [
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

  const themeMenu: IBottomSelectMenuProps[] = [
    {
      title: t(THEME_NAME[THEME.DEFAULT]),
      isSelected: appTheme.displayName === THEME.DEFAULT,
      onPress: () => {
        const Theme = Appearance.getColorScheme() ?? 'light';
        setAppTheme({
          displayName: THEME.DEFAULT,
          value: Theme,
        });
      },
    },
    {
      title: t(THEME_NAME[THEME.LIGHT]),
      isSelected: appTheme.displayName === THEME.LIGHT,
      onPress: () => {
        setAppTheme({
          displayName: THEME.LIGHT,
          value: THEME.LIGHT,
        });
      },
    },
    {
      title: t(THEME_NAME[THEME.DARK]),
      isSelected: appTheme.displayName === THEME.DARK,
      onPress: () => {
        setAppTheme({
          displayName: THEME.DARK,
          value: THEME.DARK,
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

export default useBottomSelectModal;
