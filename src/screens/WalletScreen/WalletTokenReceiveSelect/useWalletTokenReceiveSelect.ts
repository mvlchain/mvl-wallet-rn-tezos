import { useEffect, useMemo, useState } from 'react';

import { RouteProp, useRoute } from '@react-navigation/native';
import { BigNumber } from 'bignumber.js';
import { useTranslation } from 'react-i18next';
import { Share } from 'react-native';

import { MODAL_TYPES } from '@@components/BasicComponents/Modals/GlobalModal';
import { useReceiveQRModal } from '@@components/BasicComponents/Modals/ReceiveQRModal/useReceiveQRModal';
import { getNetworkConfig } from '@@constants/network.constant';
import useTokenQuery from '@@hooks/queries/useTokenQuery';
import useWalletsQuery from '@@hooks/queries/useWalletsQuery';
import { TRootStackParamList } from '@@navigation/RootStack/RootStack.type';
import globalModalStore from '@@store/globalModal/globalModalStore';
import { TokenDto } from '@@store/token/tokenPersistStore.type';
import walletPersistStore from '@@store/wallet/walletPersistStore';
import { tagLogger } from '@@utils/Logger';
import { formatBigNumber } from '@@utils/formatBigNumber';

import { IHistory, ITokenReceiveListItem } from './WalletTokenReceiveSelect.type';

export const useWalletTokenReceiveSelect = () => {
  type walletTokenReceiveSelectRouteProps = RouteProp<TRootStackParamList, 'WALLET_TOKEN_RECEIVE_SELECT'>;
  const qrPayLogger = tagLogger('QrPay');
  const { t } = useTranslation();
  const { params } = useRoute<walletTokenReceiveSelectRouteProps>();
  const { openModal, closeModal } = globalModalStore();
  const [tokenList, setTokenList] = useState<ITokenReceiveListItem[]>([]);
  const [history, setHistory] = useState<IHistory[]>();
  const { selectedNetwork, selectedWalletIndex, receiveHistory, addReceiveHistory } = walletPersistStore();
  const { generateQR } = useReceiveQRModal();
  const _selectedWalletIndex = useMemo(() => selectedWalletIndex[selectedNetwork], [selectedWalletIndex, selectedNetwork]);
  const { data } = useTokenQuery(getNetworkConfig(params?.network).networkId, {
    onSuccess: (data) => {
      setTokenList(data.map((token) => ({ title: token.symbol, logoURI: token.logoURI })));
    },
  });

  const { data: walletList } = useWalletsQuery(selectedNetwork);

  useEffect(() => {
    setHistory(receiveHistory[selectedNetwork].map((_history) => ({ token: _history.token, amount: _history.amount, cacheQR: _history.cacheQR })));
  }, [receiveHistory, selectedNetwork]);

  const onPressConfirm = async (amount: string, token: TokenDto, cacheQR?: string) => {
    if (!walletList) return;
    const address = walletList[_selectedWalletIndex]?.address;
    const bnAmount = new BigNumber(amount);
    const qr = cacheQR ? cacheQR : await generateQR({ token, address, value: bnAmount });
    qrPayLogger.log(`QrLink generated: ${qr}`);

    const formalize = formatBigNumber(bnAmount, token.decimals);
    addReceiveHistory(selectedNetwork, token, amount, qr);
    openModal(MODAL_TYPES.RECEIVE_QR, {
      title: t('qr_payment_send_link_title'),
      amount: formalize.toFixed(),
      token,
      address: address,
      qr: qr,
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
