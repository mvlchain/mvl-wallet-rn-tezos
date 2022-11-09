import React from 'react';

import { StyleSheet, View } from 'react-native';

import Account from '@@components/Wallet/Account';
import TokenList from '@@components/Wallet/TokenList';

import * as S from './WalletScreen.style';
import useWalletScreen from './useWalletScreen';

function WalletScreen() {
  useWalletScreen();

  return (
    <S.Container>
      <Account />
      <S.Seperator />
      <TokenList />
    </S.Container>
  );
}

export default WalletScreen;
