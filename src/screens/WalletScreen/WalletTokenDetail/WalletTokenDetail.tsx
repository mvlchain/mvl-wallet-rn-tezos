import React, { useLayoutEffect } from 'react';

import { useRoute, useNavigation } from '@react-navigation/native';
import ErrorBoundary from 'react-native-error-boundary';

import Divider from '@@components/BasicComponents/Divider';
import { DIVIDER_THICKNESS } from '@@components/BasicComponents/Divider/Divider.type';
import ErrorScreenInRootStack from '@@components/BasicComponents/ErrorBoundary/ErrorScreenInRootStack';
import TokenDetailBoard from '@@components/WalletTokenDetail/TokenDetailBoard';
import TransactionHistoryList from '@@components/WalletTokenDetail/TransactionHistoryList';
import useHeader from '@@hooks/useHeader';

import * as S from './WalletTokenDetail.style';
import { TTokenDetailRouteProps, TTokenDetailRootStackProps } from './WalletTokenDetail.type';

function WalletTokenDetail() {
  const { params } = useRoute<TTokenDetailRouteProps>();
  const { handleStackHeaderOption } = useHeader();
  const navigation = useNavigation<TTokenDetailRootStackProps>();

  useLayoutEffect(() => {
    const title = params.tokenDto.symbol;
    const headerOption = handleStackHeaderOption({ title });
    navigation.setOptions(headerOption);
  }, []);
  return (
    <ErrorBoundary FallbackComponent={ErrorScreenInRootStack}>
      <S.Container>
        <TokenDetailBoard />
        <Divider thickness={DIVIDER_THICKNESS.THICK} />
        <TransactionHistoryList />
      </S.Container>
    </ErrorBoundary>
  );
}

export default WalletTokenDetail;
