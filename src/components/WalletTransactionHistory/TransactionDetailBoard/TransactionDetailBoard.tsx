// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useState } from 'react';

import { useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { getNetworkConfig } from '@@constants/network.constant';
import { useDi } from '@@hooks/useDi';
import useOneTokenPrice from '@@hooks/useOneTokenPrice';
import { TTransactionHistoryRouteProps } from '@@screens/WalletScreen/WalletTransactionHistory/WalletTransactionHistory.type';
import settingPersistStore from '@@store/setting/settingPersistStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';

import * as S from './TransactionDetailBoard.style';

function TransactionDetailBoard() {
  const { params } = useRoute<TTransactionHistoryRouteProps>();
  const { type, status, value, ticker, updatedAt, to, from } = params;
  const { t } = useTranslation();
  const walletService = useDi('WalletService');
  const { selectedNetwork, selectedWalletIndex } = walletPersistStore();
  const { settedCurrency } = settingPersistStore();
  const price = useOneTokenPrice(params.tokenDto, value);
  const [valueSign, setValueSign] = useState('');
  const network = getNetworkConfig(selectedNetwork);

  const setSign = async () => {
    const wallet = await walletService.getWalletInfo({ index: selectedWalletIndex[selectedNetwork], bip44: network.bip44 });
    const valueSign = from === wallet.address ? '-' : '';
    setValueSign(valueSign);
  };
  useEffect(() => {
    setSign();
  }, []);

  return (
    <>
      <S.TransactionDetailBoardContainer>
        <S.TransactionType>{type}</S.TransactionType>
        <S.TransactionAmount>
          {valueSign}
          {value}
          {ticker}
        </S.TransactionAmount>
        <S.TransactionBaseCurrencyAmount>{`≈ ${price} ${settedCurrency}`}</S.TransactionBaseCurrencyAmount>
      </S.TransactionDetailBoardContainer>
      <S.TransactionDetailBoardContainer>
        <S.Row>
          <S.Label>{t('date')}</S.Label>
          <S.Value>{updatedAt}</S.Value>
        </S.Row>
        <S.Row isMiddle={true}>
          <S.Label>{t('status')}</S.Label>
          <S.Value>{status}</S.Value>
        </S.Row>
        <S.Row>
          <S.Label>{t('receiver')}</S.Label>
          <S.ReceiverWrapper>
            <S.Value>{to}</S.Value>
          </S.ReceiverWrapper>
        </S.Row>
      </S.TransactionDetailBoardContainer>
    </>
  );
}

export default TransactionDetailBoard;
