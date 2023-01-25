import React from 'react';

import ErrorBoundary from 'react-native-error-boundary';

import ErrorScreenAtWalletMain from '@@components/BasicComponents/ErrorBoundary/ErrorScreenAtWalletMain';
import Account from '@@components/Wallet/Account';
import TokenList from '@@components/Wallet/TokenList';

import * as S from './WalletScreen.style';
import useWalletScreen from './useWalletScreen';

function WalletScreen() {
  useWalletScreen();
  return (
    <ErrorBoundary FallbackComponent={ErrorScreenAtWalletMain}>
      <S.Container>
        <Account />
        <S.Seperator />
        <TokenList />
      </S.Container>
    </ErrorBoundary>
  );
}

export default WalletScreen;
