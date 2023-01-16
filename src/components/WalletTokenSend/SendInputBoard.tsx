import React from 'react';

import { useRoute, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import AddressTextField from '@@components/BasicComponents/TextFields/AddressTextField';
import { TradeVolume } from '@@components/BasicComponents/TextFields/TradeVolume/TradeVolume';
import { ROOT_STACK_ROUTE } from '@@navigation/RootStack/RootStack.type';
import { TScanQRRootStackProps } from '@@screens/WalletScreen/WalletScanQR/WalletScanQR.type';
import { TTokenSendRouteProps } from '@@screens/WalletScreen/WalletTokenSend/WalletTokenSend.type';
import gasStore from '@@store/gas/gasStore';
import { transactionRequestStore } from '@@store/transaction/transactionRequestStore';

import * as S from './SendInputBoard.style';
import { ISendInputBoardProps } from './SendInputBoard.type';

function SendInputBoard({ amount, setAmount, address, setAddress }: ISendInputBoardProps) {
  const { params } = useRoute<TTokenSendRouteProps>();
  const { t } = useTranslation();
  const navigation = useNavigation<TScanQRRootStackProps>();
  const gotoScan = () => {
    navigation.navigate(ROOT_STACK_ROUTE.WALLET_SCAN_QR, params);
  };
  const { setState } = transactionRequestStore();

  const setAddressValid = (valid: boolean) => {
    setState({ toValid: valid });
  };
  const setTradeVolumeValid = (valid: boolean) => {
    setState({ valueValid: valid });
  };

  return (
    <S.Container>
      <AddressTextField
        value={address}
        onChange={setAddress}
        label={t('send_address')}
        placeholder={t('input_address')}
        gotoScan={gotoScan}
        setParentValid={setAddressValid}
      />
      <S.Gap />
      <TradeVolume
        label={t('send_amount')}
        setValue={setAmount}
        value={amount}
        useMax={true}
        tokenDto={params.tokenDto}
        setValueValid={setTradeVolumeValid}
      />
    </S.Container>
  );
}

export default SendInputBoard;
