import { useEffect, useMemo, useState } from 'react';

import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';

import { IBottomSelectMenuProps } from '@@components/BasicComponents/Modals/BottomSelectModal/BottomSelectMenu/BottomSelectMenu.type';
import { MODAL_TYPES } from '@@components/BasicComponents/Modals/GlobalModal';
import { getNetworkByBase, NETWORK } from '@@constants/network.constant';
import TOAST_DEFAULT_OPTION from '@@constants/toastConfig.constant';
import { IGasFeeInfo } from '@@domain/gas/GasService.type';
import globalModalStore from '@@store/globalModal/globalModalStore';
import tokenPersistStore from '@@store/token/tokenPersistStore';
import { TokenDto } from '@@store/token/tokenPersistStore.type';
import tradeStore from '@@store/trade/tradeStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';

export const useTradeScreen = () => {
  const { t } = useTranslation();
  const { openModal } = globalModalStore();
  const { selectedNetwork, selectNetwork } = walletPersistStore();
  const { tokenList } = tokenPersistStore();
  const { selectedToken, selectToken } = tradeStore();
  const [selectedTokenList, setSelectedTokenList] = useState<TokenDto[]>(tokenList[getNetworkByBase(selectedNetwork)]);
  const [fromTradeMenu, setFromTradeMenu] = useState<IBottomSelectMenuProps[]>([]);
  const [toTradeMenu, setToTradeMenu] = useState<IBottomSelectMenuProps[]>([]);
  const [showTip, setShowTip] = useState(false);

  const onPressToken = (type: string) => {
    const menuList = type === 'from' ? fromTradeMenu : toTradeMenu;
    openModal(MODAL_TYPES.BOTTOM_SELECT, { menuList, modalTitle: t('token_editor_title') });
  };

  const onPressSelectToken = (symbol: string, type: 'from' | 'to') => {
    const anotherToken = type === 'from' ? selectedToken.to : selectedToken.from;
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
    setFromTradeMenu(
      selectedTokenList.map((token) => ({
        id: token.symbol,
        title: token.symbol,
        isSelected: token.symbol === selectedToken.from,
        logo: token.logoURI,
        onPress: () => {
          onPressSelectToken(token.symbol, 'from');
        },
      }))
    );
  }, [selectedToken.from]);

  useEffect(() => {
    setToTradeMenu(
      selectedTokenList.map((token) => ({
        id: token.symbol,
        title: token.symbol,
        isSelected: token.symbol === selectedToken.to,
        logo: token.logoURI,
        onPress: () => {
          onPressSelectToken(token.symbol, 'to');
        },
      }))
    );
  }, [selectedToken.to]);

  useEffect(() => {
    setSelectedTokenList(tokenList[getNetworkByBase(selectedNetwork)]);
  }, [selectedNetwork]);

  useEffect(() => {
    selectToken(selectedTokenList[0].symbol, 'from');
    if (selectedTokenList.length > 1) {
      selectToken(selectedTokenList[1].symbol, 'to');
    }
  }, [selectedTokenList]);

  useFocusEffect(() => {
    if (selectedNetwork !== NETWORK.BSC) {
      selectNetwork(NETWORK.BSC);
      Toast.show({
        ...TOAST_DEFAULT_OPTION,
        type: 'basic',
        text1: t('trade_noitce_network_change'),
      });
    }
  });

  const onPressChange = () => {
    selectToken(selectedToken.to, 'from');
    selectToken(selectedToken.from, 'to');
  };

  const onPressTrade = () => {
    openModal(MODAL_TYPES.GAS_FEE, { tokenDto: selectedTokenList[0], trade: async (gasfee: IGasFeeInfo) => {} });
  };

  return {
    fromToken: selectedTokenList.find((token) => token.symbol === selectedToken.from),
    toToken: selectedTokenList.find((token) => token.symbol === selectedToken.to),
    showTip,
    setShowTip,
    onPressToken,
    onPressChange,
    onPressTrade,
  };
};
