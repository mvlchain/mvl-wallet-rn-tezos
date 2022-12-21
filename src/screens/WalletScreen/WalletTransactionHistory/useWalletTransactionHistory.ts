import { useEffect, useState } from 'react';

import { useRoute } from '@react-navigation/native';

import { getNetworkByBase, getNetworkConfig } from '@@constants/network.constant';
import { TTransactionStatus } from '@@domain/transaction/TransactionService.type';
import useRefreshTransactionQuery from '@@hooks/queries/useRefreshTransactionQuery';
import { useDi } from '@@hooks/useDi';
import useOneTokenPrice from '@@hooks/useOneTokenPrice';
import settingPersistStore from '@@store/setting/settingPersistStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';

import { TTransactionHistoryRouteProps } from './WalletTransactionHistory.type';

export const useWalletTransactionHistory = () => {
  const { params } = useRoute<TTransactionHistoryRouteProps>();
  const { type, status, value, ticker, updatedAt, to, from, tokenDto, fee, hash } = params;

  const { settedCurrency } = settingPersistStore();
  const { price } = useOneTokenPrice(tokenDto, fee);
  const [valueSign, setValueSign] = useState('');
  const [displayStatus, setDisplayStatus] = useState<TTransactionStatus>(status);
  const [displayFee, setDisplayFee] = useState<string>(fee);

  const walletService = useDi('WalletService');
  const { selectedNetwork: pickNetwork, selectedWalletIndex } = walletPersistStore();
  const selectedNetwork = getNetworkByBase(pickNetwork);
  const networkConfig = getNetworkConfig(selectedNetwork);

  const { refetch } = useRefreshTransactionQuery(
    { network: networkConfig.networkId, hash },
    {
      enabled: status === TTransactionStatus.PENDING,
      onSuccess: (data) => {
        setDisplayStatus(data.status as TTransactionStatus);
        setDisplayFee(data.fee);
      },
    }
  );

  const setSign = async () => {
    const wallet = await walletService.getWalletInfo({ index: selectedWalletIndex[selectedNetwork], network: selectedNetwork });
    const valueSign = from === wallet.address ? '-' : '';
    setValueSign(valueSign);
  };

  useEffect(() => {
    setSign();
  }, []);

  return {
    price,
    fee: displayFee,
    settedCurrency,
    type,
    valueSign,
    value,
    ticker,
    updatedAt,
    status: displayStatus,
    to,
    hash,
    refetch,
  };
};
