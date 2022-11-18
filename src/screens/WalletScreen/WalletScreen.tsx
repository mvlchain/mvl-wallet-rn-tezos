import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native';

import Account from '@@components/Wallet/Account';
import TokenList from '@@components/Wallet/TokenList';
import { ROOT_STACK_ROUTE } from '@@navigation/RootStack/RootStack.type';

import * as S from './WalletScreen.style';
import useWalletScreen from './useWalletScreen';

function WalletScreen() {
  useWalletScreen();
  const navigation = useNavigation<any>();
  return (
    <S.Container>
      <Account />
      <S.Seperator />
      <Button
        title={'click '}
        onPress={() => {
          navigation.navigate(ROOT_STACK_ROUTE.WALLET_TOKEN_SEND, { symbol: 'MVL' });
        }}
      />
      <TokenList />
    </S.Container>
  );
}

export default WalletScreen;
