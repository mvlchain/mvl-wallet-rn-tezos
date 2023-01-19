// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';

import { useRoute } from '@react-navigation/native';

import DismissKeyboardView from '@@components/BasicComponents/DismissKeyboardView';
import Divider from '@@components/BasicComponents/Divider';
import { DIVIDER_THICKNESS } from '@@components/BasicComponents/Divider/Divider.type';
import GasFeeBoard from '@@components/BasicComponents/GasFeeBoard';
import SendInputBoard from '@@components/WalletTokenSend/SendInputBoard';
import { transactionRequestStore } from '@@store/transaction/transactionRequestStore';

import * as S from './WalletTokenSend.style';
import { TTokenSendRouteProps } from './WalletTokenSend.type';
import useTokenSend from './useTokenSend';

function WalletTokenSend() {
  const { params } = useRoute<TTokenSendRouteProps>();
  const { amount, setAmount, address, setAddress, confirm } = useTokenSend();
  const { value, data, toValid, valueValid } = transactionRequestStore();
  return (
    <DismissKeyboardView>
      <S.Container>
        <SendInputBoard amount={amount} setAmount={setAmount} address={address} setAddress={setAddress} />
        <Divider thickness={DIVIDER_THICKNESS.THICK} />
        <GasFeeBoard
          isRevision={false}
          hideDivider={false}
          onConfirm={confirm}
          tokenDto={params.tokenDto}
          to={address}
          value={value}
          data={data}
          isValidInput={toValid && valueValid}
        />
      </S.Container>
    </DismissKeyboardView>
  );
}

export default WalletTokenSend;
