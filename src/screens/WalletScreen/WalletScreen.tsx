import React from 'react';

import ErrorBoundary from 'react-native-error-boundary';

import ErrorScreenEmpty from '@@components/BasicComponents/ErrorBoundary/ErrorScreenEmpty';
import Account from '@@components/Wallet/Account';
import TokenList from '@@components/Wallet/TokenList';

import * as S from './WalletScreen.style';
import useWalletScreen from './useWalletScreen';

function WalletScreen() {
  useWalletScreen();
  return (
    <ErrorBoundary FallbackComponent={ErrorScreenEmpty}>
      <S.Container>
        <Account />
        <S.Seperator />
        <TokenList />
      </S.Container>
    </ErrorBoundary>
  );
}

export default WalletScreen;
