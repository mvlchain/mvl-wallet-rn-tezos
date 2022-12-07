import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { SuccessIcon } from '@@assets/image';
import { PrimaryButton } from '@@components/BasicComponents/Buttons/BaseButton';
import { ROOT_STACK_ROUTE, TRootStackNavigationProps } from '@@navigation/RootStack/RootStack.type';

import * as S from './WalletTransactionResult.style';

function WalletTokenSend() {
  const { t } = useTranslation();
  type rootStackProps = TRootStackNavigationProps<'MAIN'>;
  const navigation = useNavigation<rootStackProps>();
  const gohome = () => {
    navigation.navigate(ROOT_STACK_ROUTE.MAIN);
  };
  return (
    <S.Container>
      <S.Contents>
        <SuccessIcon />
        <S.Title>{t('succeed')}</S.Title>
        <S.Text>{t('succeed_lbl_description').toString()}</S.Text>
      </S.Contents>
      <S.ButtonWrapper>
        <PrimaryButton label={t('btn_confirm')} onPress={gohome} />
      </S.ButtonWrapper>
    </S.Container>
  );
}

export default WalletTokenSend;
