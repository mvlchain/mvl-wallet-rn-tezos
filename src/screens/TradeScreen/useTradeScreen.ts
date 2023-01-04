import { useEffect, useMemo, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { IBottomSelectMenuProps } from '@@components/BasicComponents/Modals/BottomSelectModal/BottomSelectMenu/BottomSelectMenu.type';
import useBottomSelectModal from '@@components/BasicComponents/Modals/BottomSelectModal/useBottomSelectModal';
import { MODAL_TYPES } from '@@components/BasicComponents/Modals/GlobalModal';
import { getNetworkByBase } from '@@constants/network.constant';
import globalModalStore from '@@store/globalModal/globalModalStore';
import tokenPersistStore from '@@store/token/tokenPersistStore';
import tradeStore from '@@store/trade/tradeStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';

export const useTradeScreen = () => {
  const { t } = useTranslation();
  const { openModal } = globalModalStore();
  const { selectedNetwork } = walletPersistStore();
  const { tokenList } = tokenPersistStore();
  const { selectedToken, selectToken } = tradeStore();
  const selectedTokenList = useMemo(() => tokenList[getNetworkByBase(selectedNetwork)], [selectedNetwork]);
  const [fromTradeMenu, setFromTradeMenu] = useState<IBottomSelectMenuProps[]>([]);
  const [toTradeMenu, setToTradeMenu] = useState<IBottomSelectMenuProps[]>([]);

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
        onPress: () => {
          onPressSelectToken(token.symbol, 'to');
        },
      }))
    );
  }, [selectedToken.to]);

  useEffect(() => {
    selectToken(selectedTokenList[0].symbol, 'from');
    if (selectedTokenList.length > 2) {
      selectToken(selectedTokenList[1].symbol, 'to');
    }
  }, []);

  const onPressChange = () => {
    selectToken(selectedToken.to, 'from');
    selectToken(selectedToken.from, 'to');
  };

  return {
    fromToken: selectedTokenList.find((token) => token.symbol === selectedToken.from),
    toToken: selectedTokenList.find((token) => token.symbol === selectedToken.to),
    onPressToken,
    onPressChange,
  };
};
