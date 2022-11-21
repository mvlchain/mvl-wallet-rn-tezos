import React from 'react';

import { useRoute, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import * as Token from '@@assets/image/token';
import { BaseTextField } from '@@components/BasicComponents/TextFields/BaseTextField';
import { TradeVolume } from '@@components/BasicComponents/TextFields/TradeVolume';
import { TTokenSendRootStackProps, TTokenSendRouteProps } from '@@screens/WalletScreen/WalletTokenSend/WalletTokenSend.type';

import * as S from './SendInputBoard.style';
import { ISendInputBoardProps } from './SendInputBoard.type';

function SendInputBoard({ amount, setAmount, address, setAddress }: ISendInputBoardProps) {
  const { params } = useRoute<TTokenSendRouteProps>();
  const { t } = useTranslation();

  return (
    //TODO: 완성아님 tradevolumeinput 잘만들어야함
    <S.Container>
      <BaseTextField value={address} onChange={setAddress} scanable={true} type={'address'} label={t('send_address')} />
      <S.Gap />
      <TradeVolume label={t('send_amount')} onChange={setAmount} value={amount} useMax={true} symbol={params.symbol} />
    </S.Container>
  );
}

export default SendInputBoard;
