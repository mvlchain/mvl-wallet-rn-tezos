import { useEffect, useState } from 'react';

import { PRICE_NAME, PRICE_TYPE } from '@@constants/wallet.constant';
import { WalletDto } from '@@domain/model/WalletDto';
import { IGetPriceResponseDto } from '@@domain/wallet/repositories/WalletRepository.type';
import { IBalance, IBalanceData } from '@@domain/wallet/services/WalletBlockChainService.type';
import settingPersistStore from '@@store/setting/settingPersistStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';

import { useDi } from './common/useDi';
import useBalanceQuery from './queries/useBalanceQuery';
import usePriceQuery from './queries/usePriceQuery';
import useWalletsQuery from './queries/useWalletsQuery';
export const useTokenBalanceList = () => {
  // @TODO 데이터 연결
  const ethService = useDi('WalletBlockChainService');
  const wallet = useDi('WalletService');
  const { settedCurrency } = settingPersistStore();
  const { selectedWalletIndex, selectedNetwork } = walletPersistStore();
  const priceIds = Object.values(PRICE_TYPE[selectedNetwork]).flat();
  const [formalizedBalance, setFormalizedBalance] = useState<IBalanceData[]>();
  const [walletData, setWalletData] = useState<WalletDto[]>([]);
  const [balanceData, setBalanceData] = useState<IBalance>();

  useWalletsQuery({
    onSuccess: (data) => {
      setWalletData(data);
    },
  });

  const { refetch } = useBalanceQuery(walletData[selectedWalletIndex]?.address, selectedNetwork, {
    enabled: false,
    keepPreviousData: true,
    select: (data) => {
      let newData: IBalance = {};
      data.forEach((balance) => {
        newData = {
          ...newData,
          [balance.asset.ticker]: balance.amount,
        };
      });
      return newData;
    },
    onSuccess: (data) => {
      setBalanceData(data);
    },
  });

  const { data: price } = usePriceQuery(
    { network: selectedNetwork, currency: settedCurrency },
    { ids: priceIds.join(','), vsCurrencies: settedCurrency },
    {
      onError: () => {
        // TODO: 일괄로 처리할것인가..?
        console.log('TODO: SERVER ERROR');
      },
      keepPreviousData: true,
    }
  );

  const getBalance = async () => {
    try {
      const balance = await ethService.getBalanceFromNetwork(selectedWalletIndex, selectedNetwork);
      if (balance && Object.keys(balance).length === 0) {
        console.log('Data fetch from blockchain is fail -> Fetch from Server');
        refetch();
      }
      setBalanceData(balance);
    } catch (e) {
      console.log('Data fetch from blockchain is fail -> Fetch from Server');
      refetch();
    }
  };

  useEffect(() => {
    // TODO: wallet data 못가져왔을 때 에러 로직 추가
    if (walletData.length === 0) return;
    getBalance();
  }, [selectedNetwork, walletData]);

  useEffect(() => {
    if (!price || !balanceData) return;
    let formalizedArray: IBalanceData[] = [];
    // TODO: 타입 형변환이 너무 무식하게 들어감 위험해보임.
    for (const [crypto, balance] of Object.entries(balanceData)) {
      const data = price[PRICE_NAME[crypto as keyof typeof PRICE_NAME]] as IGetPriceResponseDto;
      const currency = settedCurrency.toLocaleLowerCase();
      if (data) {
        const floatBalance = parseFloat(balance);
        formalizedArray = [
          ...formalizedArray,
          {
            ticker: crypto,
            balance: floatBalance,
            valuatedAmount: (data[currency] as unknown as number) * floatBalance,
          },
        ];
      }
    }
    setFormalizedBalance(formalizedArray);
  }, [price, balanceData]);

  return { formalizedBalance };
};
