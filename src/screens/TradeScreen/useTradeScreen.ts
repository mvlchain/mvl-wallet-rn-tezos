import { useEffect, useState } from 'react';

import { useFocusEffect } from '@react-navigation/native';
import BigNumber from 'bignumber.js';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';

import { IBottomSelectMenuProps } from '@@components/BasicComponents/Modals/BottomSelectModal/BottomSelectMenu/BottomSelectMenu.type';
import { MODAL_TYPES } from '@@components/BasicComponents/Modals/GlobalModal';
import { NETWORK } from '@@constants/network.constant';
import TOAST_DEFAULT_OPTION from '@@constants/toastConfig.constant';
import { IGasFeeInfo } from '@@domain/gas/GasService.type';
import { IQuoteDto } from '@@domain/trade/repositories/tradeRepository.type';
import useTradeQuoteQuery from '@@hooks/queries/useTradeQuoteQuery';
import useTradeTokeneQuery from '@@hooks/queries/useTradeTokenQuery';
import globalModalStore from '@@store/globalModal/globalModalStore';
import { TokenDto } from '@@store/token/tokenPersistStore.type';
import tradeStore from '@@store/trade/tradeStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';
import { formatBigNumber } from '@@utils/formatBigNumber';

const BSC_DEFAULT_ADDRESS = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';

export const useTradeScreen = () => {
  const { t } = useTranslation();
  const { openModal } = globalModalStore();
  const { selectedNetwork, selectNetwork } = walletPersistStore();
  const { data: tokenList } = useTradeTokeneQuery(selectedNetwork, {
    select: (data) => {
      const tokens = Object.values(data.tokens).map((token) => {
        // unknown으로 와서 any캐스팅 할 수 밖에 없었음...
        const tokenData = token as any;
        return {
          ...tokenData,
          contractAddress: tokenData?.address === BSC_DEFAULT_ADDRESS ? null : tokenData?.address,
        };
      });

      return tokens as TokenDto[];
    },
  });
  const { selectedToken, selectToken } = tradeStore();
  const [selectedTokenList, setSelectedTokenList] = useState<TokenDto[]>([]);
  const [fromTradeMenu, setFromTradeMenu] = useState<IBottomSelectMenuProps[]>([]);
  const [toTradeMenu, setToTradeMenu] = useState<IBottomSelectMenuProps[]>([]);
  const [showTip, setShowTip] = useState(false);

  const [tradeFromValue, setTradeFromValue] = useState<BigNumber | null>(null);
  const [tradeToValue, setTradeToValue] = useState<BigNumber | null>(new BigNumber(0));
  const [tradeFromValidation, setTradeFromValidation] = useState(false);
  const [quoteDto, setQuoteDto] = useState<IQuoteDto | null>(null);
  const [priceImpact, setPriceImpact] = useState('-');
  const { refetch } = useTradeQuoteQuery(selectedNetwork, quoteDto, {
    enabled: false,
    onSuccess: (data) => {
      const { priceImpact, toTokenAmount } = data;
      if (!priceImpact || !toTokenAmount) return;
      setPriceImpact(priceImpact);
      const amount = formatBigNumber(new BigNumber(toTokenAmount), data.toToken?.decimals ?? 18);
      setTradeToValue(amount);
    },
  });

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
    if (!tokenList) return;
    setSelectedTokenList(tokenList);
  }, [tokenList]);

  useEffect(() => {
    if (selectedTokenList.length === 0) return;
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
    setPriceImpact('-');
    setTradeFromValue(null);
    setTradeToValue(new BigNumber(0));
  };

  const onPressTrade = () => {
    openModal(MODAL_TYPES.GAS_FEE, { tokenDto: selectedTokenList[0], trade: async (gasfee: IGasFeeInfo) => {} });
  };

  useEffect(() => {
    if (!tradeFromValue || !tradeFromValidation) {
      setPriceImpact('-');
      setTradeToValue(new BigNumber(0));
      return;
    }

    setQuoteDto({
      fromTokenAddress: selectedTokenList.find((token) => token.symbol === selectedToken.from)?.address ?? '',
      toTokenAddress: selectedTokenList.find((token) => token.symbol === selectedToken.to)?.address ?? '',
      amount: tradeFromValue?.toString() ?? '',
    });
  }, [tradeFromValue, tradeFromValidation]);

  useEffect(() => {
    if (!quoteDto) return;
    refetch();
  }, [quoteDto]);

  return {
    fromToken: selectedTokenList.find((token) => token.symbol === selectedToken.from),
    toToken: selectedTokenList.find((token) => token.symbol === selectedToken.to),
    showTip,
    tradeFromValue,
    tradeToValue,
    priceImpact,
    setShowTip,
    onPressToken,
    onPressChange,
    onPressTrade,
    setTradeFromValue,
    setTradeFromValidation,
  };
};
