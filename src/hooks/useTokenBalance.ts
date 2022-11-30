import { useEffect, useState } from 'react';

import { formatUnits } from 'ethers/lib/utils';

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

export const useTokenBalance = () => {
  // @TODO 데이터 연결
  const ethService = useDi('WalletBlockChainService');
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
          [balance.asset.ticker]: formatUnits(balance.amount),
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
      // TODO: address에 따라 token list호출 후 해당 값에 대해 balance 조회
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
  }, [selectedNetwork, walletData, selectedWalletIndex]);

  useEffect(() => {
    if (!price || !balanceData) return;
    let formalizedArray: IBalanceData[] = [];
    // TODO: 타입 캐스팅이 너무 많습니다. 해결방안이 있다면 수정해야할 것 같습니다.
    for (const [crypto, balance] of Object.entries(balanceData)) {
      const data = price[PRICE_NAME[crypto as keyof typeof PRICE_NAME]] as IGetPriceResponseDto;
      const currency = settedCurrency.toLocaleLowerCase();
      if (data) {
        // TODO: 계산 테스트 필요(자리수 등등)
        let floatBalance = parseFloat(balance);
        if (isNaN(floatBalance)) {
          // TODO: 0으로 넣는것 말고 다른 예외처리를 어떻게 해줄것인가?
          floatBalance = 0;
        }

        let valuatedPrice = (data[currency] as unknown as number) * floatBalance;
        if (isNaN(valuatedPrice)) {
          // TODO: 0으로 넣는것 말고 다른 예외처리를 어떻게 해줄것인가?
          valuatedPrice = 0;
        }
        formalizedArray = [
          ...formalizedArray,
          {
            ticker: crypto,
            balance: floatBalance,
            valuatedPrice,
          },
        ];
      }
    }
    setFormalizedBalance(formalizedArray);
  }, [price, balanceData]);

  return { formalizedBalance };
};
