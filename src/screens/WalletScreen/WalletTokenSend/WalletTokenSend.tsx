// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';

import { useRoute } from '@react-navigation/native';
import { Keyboard } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';

import Divider from '@@components/BasicComponents/Divider';
import { DIVIDER_THICKNESS } from '@@components/BasicComponents/Divider/Divider.type';
import GasFeeBoard from '@@components/BasicComponents/GasFeeBoard';
import SendInputBoard from '@@components/WalletTokenSend/SendInputBoard';

import * as S from './WalletTokenSend.style';
import { TTokenSendRouteProps } from './WalletTokenSend.type';
import useTokenSend from './useTokenSend';

function WalletTokenSend() {
  const { params } = useRoute<TTokenSendRouteProps>();

  const { amount, setAmount, address, setAddress, confirm } = useTokenSend(params.tokenDto);
  return (
    <S.Container>
      <SendInputBoard amount={amount} setAmount={setAmount} address={address} setAddress={setAddress} />
      <Divider thickness={DIVIDER_THICKNESS.THICK} />
      <GasFeeBoard isRevision={false} onConfirm={confirm} tokenDto={params.tokenDto} />
    </S.Container>
  );
}

export default WalletTokenSend;
