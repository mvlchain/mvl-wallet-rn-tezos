import { useEffect, useMemo, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { Appearance } from 'react-native';

import { getNetworkByBase } from '@@constants/network.constant';
import { CURRENCY, LANGUAGE_CODE, THEME, THEME_NAME } from '@@constants/setting.constant';
import RTNSettings from '@@store/RTNSetting';
import settingPersistStore from '@@store/setting/settingPersistStore';
import tokenPersistStore from '@@store/token/tokenPersistStore';
import tradeStore from '@@store/trade/tradeStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';

import { IBottomSelectMenuProps } from './BottomSelectMenu/BottomSelectMenu.type';

const useBottomSelectModal = () => {
  const { t } = useTranslation();

  const { appTheme, settedCurrency, settedLanguage, setAppTheme, setCurrency, setLanguage } = settingPersistStore();
  const { selectedNetwork } = walletPersistStore();
  const { tokenList } = tokenPersistStore();
  const { selectedToken, selectToken } = tradeStore();
  const selectedTokenList = useMemo(() => tokenList[getNetworkByBase(selectedNetwork)], [selectedNetwork]);
  const [tradeMenu, setTradeMenu] = useState<IBottomSelectMenuProps[]>([]);
  const currencyMenu: IBottomSelectMenuProps[] = [
    {
      id: CURRENCY.USD,
      title: 'USD',
      isSelected: settedCurrency === CURRENCY.USD,
      onPress: () => {
        setCurrency(CURRENCY.USD);
      },
    },
    {
      id: CURRENCY.SGD,
      title: 'SGD',
      isSelected: settedCurrency === CURRENCY.SGD,
      onPress: () => {
        setCurrency(CURRENCY.SGD);
      },
    },
    {
      id: CURRENCY.KRW,
      title: 'KRW',
      isSelected: settedCurrency === CURRENCY.KRW,
      onPress: () => {
        setCurrency(CURRENCY.KRW);
      },
    },
  ];

  const languageMenu: IBottomSelectMenuProps[] = [
    {
      id: LANGUAGE_CODE.EN,
      title: 'English',
      isSelected: settedLanguage === LANGUAGE_CODE.EN,
      onPress: () => {
        setLanguage(LANGUAGE_CODE.EN);
      },
    },
    {
      id: LANGUAGE_CODE.KM,
      title: 'ភាសាខ្មែរ',
      isSelected: settedLanguage === LANGUAGE_CODE.KM,
      onPress: () => {
        setLanguage(LANGUAGE_CODE.KM);
      },
    },
    {
      id: LANGUAGE_CODE.KO,
      title: '한국어',
      isSelected: settedLanguage === LANGUAGE_CODE.KO,
      onPress: () => {
        setLanguage(LANGUAGE_CODE.KO);
      },
    },
  ];

  const themeMenu: IBottomSelectMenuProps[] = [
    {
      id: THEME.DEFAULT,
      title: t(THEME_NAME[THEME.DEFAULT]),
      isSelected: appTheme.displayName === THEME.DEFAULT,
      onPress: () => {
        const theme = Appearance.getColorScheme() ?? 'light';

        RTNSettings.putThemeType(THEME.DEFAULT);
        setAppTheme({
          displayName: THEME.DEFAULT,
          value: theme,
        });
      },
    },
    {
      id: THEME.LIGHT,
      title: t(THEME_NAME[THEME.LIGHT]),
      isSelected: appTheme.displayName === THEME.LIGHT,
      onPress: () => {
        RTNSettings.putThemeType(THEME.LIGHT);
        setAppTheme({
          displayName: THEME.LIGHT,
          value: THEME.LIGHT,
        });
      },
    },
    {
      id: THEME.DARK,
      title: t(THEME_NAME[THEME.DARK]),
      isSelected: appTheme.displayName === THEME.DARK,
      onPress: () => {
        RTNSettings.putThemeType(THEME.DARK);
        setAppTheme({
          displayName: THEME.DARK,
          value: THEME.DARK,
        });
      },
    },
  ];

  const onPressSelectToken = (symbol: string, type: 'from' | 'to') => {
    const anotherToken = type === 'from' ? selectedToken.from : selectedToken.to;
    if (anotherToken === symbol) {
      const symbolIndex = selectedTokenList.map((token) => token.symbol).indexOf(symbol);
      const anotherType = type === 'from' ? 'to' : 'from';
      selectToken(symbol, type);
      selectToken(selectedTokenList[(symbolIndex + 1) % selectedTokenList.length].symbol, anotherType);
    } else {
      selectToken(symbol, type);
    }
  };

  useEffect(() => {
    setTradeMenu(
      selectedTokenList.map((token) => ({
        id: token.symbol,
        title: token.symbol,
        isSelected: token.symbol === selectedToken,
        onPress: () => {
          selectToken(token.symbol);
        },
      }))
    );
  }, [selectedTokenList]);

  useEffect(() => {
    selectToken(selectedTokenList[0].symbol, 'from');
    if (selectedTokenList.length > 2) {
      selectToken(selectedTokenList[1].symbol, 'to');
    }
  }, []);

  return {
    currencyMenu,
    languageMenu,
    themeMenu,
    tradeMenu,
  };
};

export default useBottomSelectModal;
