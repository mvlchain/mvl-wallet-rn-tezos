import React from 'react';

import Account from '@@components/Wallet/Account';
import TokenList from '@@components/Wallet/TokenList';
import { useDi } from '@@hooks/common/useDi';
import { useCurrentWallet } from '@@hooks/wallet/useCurrentWallet';

import * as S from './WalletScreen.style';

function WalletScreen() {
  const walletService = useDi('WalletService');
  // fetch wallet data
  useCurrentWallet(walletService);
  return (
    <S.Container>
      <Account />
      <S.Seperator />
      <TokenList />
    </S.Container>
  );
}

export default WalletScreen;
