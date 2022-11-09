import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { PrimaryButton, SecondaryButton } from '@@components/BasicComponents/Buttons/BaseButton';
import { ROOT_STACK_ROUTE } from '@@navigation/RootStack/RootStack.type';
import { TCancelRootStackProps } from '@@screens/Wallet/WalletTransactionCancel/WalletTransactionCancel.type';
import { TSpeedUpRootStackProps } from '@@screens/Wallet/WalletTransactionSpeedUp/WalletTransactionSpeedUp.type';

import * as S from './PendingTransactionButtons.style';

function PendingTransactionButtons() {
  const { t } = useTranslation();

  const navigation = useNavigation<TCancelRootStackProps | TSpeedUpRootStackProps>();

  const goToSpeedUp = () => {
    navigation.navigate(ROOT_STACK_ROUTE.WALLET_TRANSACTION_SPEED_UP);
  };

  const goToCancel = () => {
    navigation.navigate(ROOT_STACK_ROUTE.WALLET_TRANSACTION_CANCEL);
  };

  return (
    <S.Container>
      <SecondaryButton label={t('btn_cancel')} onPress={goToCancel} wrapperStyle={{ flex: 1 }} />
      <S.Gap />
      <PrimaryButton label={t('speedup')} onPress={goToSpeedUp} wrapperStyle={{ flex: 1 }} />
    </S.Container>
  );
}
export default PendingTransactionButtons;
