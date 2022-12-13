import React from 'react';

import { useRoute, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { BaseTextField } from '@@components/BasicComponents/TextFields/BaseTextField';
import { TradeVolume } from '@@components/BasicComponents/TextFields/TradeVolume';
import { ROOT_STACK_ROUTE } from '@@navigation/RootStack/RootStack.type';
import { TScanQRRootStackProps } from '@@screens/WalletScreen/WalletScanQR/WalletScanQR.type';
import { TTokenSendRouteProps } from '@@screens/WalletScreen/WalletTokenSend/WalletTokenSend.type';

import * as S from './SendInputBoard.style';
import { ISendInputBoardProps } from './SendInputBoard.type';

function SendInputBoard({ amount, setAmount, address, setAddress }: ISendInputBoardProps) {
  const { params } = useRoute<TTokenSendRouteProps>();
  const { t } = useTranslation();
  const navigation = useNavigation<TScanQRRootStackProps>();
  const gotoScan = () => {
    console.log('???');
    navigation.navigate(ROOT_STACK_ROUTE.WALLET_SCAN_QR, params);
  };

  return (
    <S.Container>
      <BaseTextField
        value={address}
        onChange={setAddress}
        scanable={true}
        type={'address'}
        label={t('send_address')}
        placeholder={t('input_address')}
        gotoScan={gotoScan}
      />
      <S.Gap />
      <TradeVolume label={t('send_amount')} onChange={setAmount} value={amount} useMax={true} tokenDto={params.tokenDto} />
    </S.Container>
  );
}

export default SendInputBoard;
