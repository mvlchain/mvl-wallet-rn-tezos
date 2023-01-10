/* eslint-disable max-lines */
import { useEffect, useState } from 'react';

import { useFocusEffect, useIsFocused } from '@react-navigation/native';
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
import { useColor } from '@@hooks/useTheme';
import globalModalStore from '@@store/globalModal/globalModalStore';
import { TokenDto } from '@@store/token/tokenPersistStore.type';
import tradeStore from '@@store/trade/tradeStore';
import { transactionRequestStore } from '@@store/transaction/transactionRequestStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';
import { formatBigNumber } from '@@utils/formatBigNumber';

const BSC_DEFAULT_ADDRESS = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';

export const useTradeScreen = () => {
  const isFocused = useIsFocused();
  const { t } = useTranslation();
  const { openModal } = globalModalStore();
  const { selectedNetwork, selectNetwork } = walletPersistStore();
  const { setState } = transactionRequestStore();
  const [tokenList, setTokenList] = useState<TokenDto[]>([]);
  const { color } = useColor();
  useTradeTokeneQuery(selectedNetwork, {
    enabled: isFocused,
    onSuccess: (data) => {
      const tokens = Object.values(data.tokens).map((token) => {
        // unknown으로 와서 any캐스팅 할 수 밖에 없었음...
        const tokenData = token as any;
        return {
          ...tokenData,
          contractAddress: tokenData?.address === BSC_DEFAULT_ADDRESS ? null : tokenData?.address,
        };
      });

      setTokenList(tokens as TokenDto[]);
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
  const [priceImpactColor, setPriceImpactColor] = useState<string>(color.whiteBlack);
  const { data: quoteData, refetch } = useTradeQuoteQuery(selectedNetwork, quoteDto, {
    enabled: false,
    onSuccess: (data) => {
      const { priceImpact, toTokenAmount } = data;
      if (!priceImpact || !toTokenAmount) return;
      setPriceImpact(priceImpact);
      const amount = formatBigNumber(new BigNumber(toTokenAmount), data.toToken?.decimals ?? 18);
      setTradeToValue(amount);
      setState({
        value: tradeFromValue,
      });
    },
  });

  const handlePriceImpactColor = (priceImpact: string) => {
    let textColor: string = color.whiteBlack;
    if (priceImpact === '-') {
      return textColor;
    }
    const numberImpact = parseFloat(priceImpact);
    if (numberImpact < 1) {
      textColor = color.green;
    } else if (numberImpact >= 1 && numberImpact < 3) {
      textColor = color.whiteBlack;
    } else if (numberImpact >= 3 && numberImpact < 5) {
      textColor = color.yellow;
    } else if (numberImpact >= 5) {
      textColor = color.red;
    }
    return textColor;
  };

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
    setPriceImpactColor(handlePriceImpactColor(priceImpact));
  }, [priceImpact]);

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
    openModal(MODAL_TYPES.GAS_FEE, { tokenDto: selectedTokenList[0], onConfirm: async (gasfee: IGasFeeInfo) => {} });
  };

  useEffect(() => {
    if (!tradeFromValue) {
      setPriceImpact('-');
      setTradeToValue(new BigNumber(0));
      return;
    }

    setQuoteDto({
      fromTokenAddress: selectedTokenList.find((token) => token.symbol === selectedToken.from)?.address ?? '',
      toTokenAddress: selectedTokenList.find((token) => token.symbol === selectedToken.to)?.address ?? '',
      amount: tradeFromValue?.toString(10) ?? '',
    });
  }, [tradeFromValue]);

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
    priceImpactColor,
    quoteData,
    setShowTip,
    onPressToken,
    onPressChange,
    onPressTrade,
    setTradeFromValue,
    setTradeFromValidation,
  };
};
