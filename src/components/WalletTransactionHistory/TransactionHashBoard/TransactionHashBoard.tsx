import React from 'react';

import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import { TextButton } from '@@components/BasicComponents/Buttons/TextButton';
import useHeader from '@@hooks/common/useHeader';
import { TWalletStackNavigationProps, TWalletStackParamList } from '@@navigation/WalletStack/WalletStack.type';

import * as S from './TransactionHashBoard.style';

function TransactionHashBoard() {
  type WalletStackProps = TWalletStackNavigationProps<'WALLET_TRANSACTION_HISTORY'>;
  type TokenDetailRouteProps = RouteProp<TWalletStackParamList, 'WALLET_TRANSACTION_HISTORY'>;
  const { params } = useRoute<TokenDetailRouteProps>();
  const { handleStackHeaderOption } = useHeader();
  const navigation = useNavigation<WalletStackProps>();
  const { t } = useTranslation();

  return (
    <S.TransactionHashBoardContainer>
      <S.LabelWrapper>
        <S.TransactionHashLabel>{t('transaction_hash')}</S.TransactionHashLabel>
        <TextButton label={t('view_etherscan')} onPress={() => {}} disabled={false} />
      </S.LabelWrapper>
      <S.TransactionHash>{params.txHash}</S.TransactionHash>
    </S.TransactionHashBoardContainer>
  );
}

export default TransactionHashBoard;
