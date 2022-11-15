import React from 'react';

import Account from '@@components/Wallet/Account';
import TokenList from '@@components/Wallet/TokenList';

import * as S from './WalletScreen.style';

function WalletScreen() {
  return (
    <S.Container>
      <Account />
      <S.Seperator />
      <TokenList />
    </S.Container>
  );
}

export default WalletScreen;
