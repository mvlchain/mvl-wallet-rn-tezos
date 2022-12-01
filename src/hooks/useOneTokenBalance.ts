import { useEffect, useState } from 'react';

import { formatUnits } from 'ethers/lib/utils';

import { Network } from '@@constants/network.constant';
import { WALLET_TOKEN } from '@@constants/token.constant';
import { PRICE_NAME, PRICE_TYPE } from '@@constants/wallet.constant';
import { WalletDto } from '@@domain/model/WalletDto';
import { IGetPriceResponseDto } from '@@domain/wallet/repositories/WalletRepository.type';
import { IBalance, IBalanceData } from '@@domain/wallet/services/WalletBlockChainService.type';
import { useDi } from '@@hooks/useDi';
import settingPersistStore from '@@store/setting/settingPersistStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';

import useBalanceQuery from './queries/useBalanceQuery';
import usePriceQuery from './queries/usePriceQuery';
import useWalletsQuery from './queries/useWalletsQuery';

export const useOneTokenBalance = (symbol: keyof typeof WALLET_TOKEN) => {
  // @TODO 데이터 연결
  const ethService = useDi('WalletBlockChainService');
  const walletService = useDi('WalletService');

  const { settedCurrency } = settingPersistStore();
  const { selectedWalletIndex, selectedNetwork } = walletPersistStore();
  // @ts-ignore
  const priceIds = PRICE_NAME[symbol];
  const [balance, setBalance] = useState<string>('-');

  const getBalance = async () => {
    try {
      const balance = await ethService.getOneBalanceFromNetwork(selectedWalletIndex, selectedNetwork, symbol);
      setBalance(balance);
    } catch (e) {
      console.log('Data fetch from blockchain is fail -> Fetch from Server');
    }
  };

  return { balance };
};
