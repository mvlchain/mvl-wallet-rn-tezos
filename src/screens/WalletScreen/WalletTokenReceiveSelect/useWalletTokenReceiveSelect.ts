import { useEffect, useMemo, useState } from 'react';

import { RouteProp, useRoute } from '@react-navigation/native';
import { BigNumber } from 'bignumber.js';
import { useTranslation } from 'react-i18next';
import { Share } from 'react-native';

import { MODAL_TYPES } from '@@components/BasicComponents/Modals/GlobalModal';
import { getNetworkConfig } from '@@constants/network.constant';
import { TokenDto } from '@@generated/generated-scheme-clutch';
import useTokenQuery from '@@hooks/queries/useTokenQuery';
import useWalletsQuery from '@@hooks/queries/useWalletsQuery';
import { TRootStackParamList } from '@@navigation/RootStack/RootStack.type';
import globalModalStore from '@@store/globalModal/globalModalStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';
import { formatBigNumber } from '@@utils/formatBigNumber';

import { IHistory, ITokenReceiveListItem } from './WalletTokenReceiveSelect.type';

export const useWalletTokenReceiveSelect = () => {
  type SeedPhraseScreenRouteProp = RouteProp<TRootStackParamList, 'WALLET_TOKEN_RECEIVE_SELECT'>;
  const { t } = useTranslation();
  const { params } = useRoute<SeedPhraseScreenRouteProp>();
  const { openModal, closeModal } = globalModalStore();
  const [tokenList, setTokenList] = useState<ITokenReceiveListItem[]>([]);
  const [history, setHistory] = useState<IHistory[]>();
  const { selectedNetwork, selectedWalletIndex, receiveHistory } = walletPersistStore();
  const _selectedWalletIndex = useMemo(() => selectedWalletIndex[selectedNetwork], [selectedWalletIndex, selectedNetwork]);
  const { data } = useTokenQuery(getNetworkConfig(params?.network).networkId, {
    onSuccess: (data) => {
      setTokenList(data.map((token) => ({ title: token.symbol, logoURI: token.logoURI })));
    },
  });

  const { data: walletList } = useWalletsQuery(selectedNetwork);

  useEffect(() => {
    setHistory(receiveHistory[selectedNetwork].map((_history) => ({ token: _history.token, amount: _history.amount })));
  }, [receiveHistory, selectedNetwork]);

  const onPressConfirm = (amount: string, token: TokenDto, cacheQR?: string) => {
    if (!walletList) return;
    const address = walletList[_selectedWalletIndex]?.address;
    openModal(MODAL_TYPES.RECEIVE_QR, {
      title: t('qr_payment_send_link_title'),
      amount,
      token,
      address: address,
      cacheQR: cacheQR,
      confirmLabel: t('qr_payment_send_link_share_qr'),
      onConfirm: onPressShare,
      onCancel: closeModal,
    });
  };

  const onPressShare = async (qr: string) => {
    try {
      await Share.share({
        message: qr,
      });
    } catch (error) {
      throw new Error(`error:  ${error}`);
    }
  };

  const onPressReceivetoken = (token: TokenDto) => {
    openModal(MODAL_TYPES.AMOUNT_INPUT, {
      title: t('qr_payment_amount_title'),
      tokenDto: token,
      onConfirm: onPressConfirm,
    });
  };

  return { data, tokenList, history, onPressReceivetoken, onPressConfirm };
};
