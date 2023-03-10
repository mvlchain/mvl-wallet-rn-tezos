import { useEffect, useMemo, useState } from 'react';

import { formatFixed } from '@ethersproject/bignumber';
import { useIsFocused } from '@react-navigation/native';

import { getNetworkByBase, getNetworkConfig } from '@@constants/network.constant';
import { WalletDto } from '@@domain/model/WalletDto';
import { IGetPriceResponseDto } from '@@domain/wallet/repositories/WalletRepository.type';
import { IBalance, IBalanceData } from '@@domain/wallet/services/WalletBlockChainService.type';
import { useDi } from '@@hooks/useDi';
import settingPersistStore from '@@store/setting/settingPersistStore';
import tokenPersistStore from '@@store/token/tokenPersistStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';

import useBalanceQuery from './queries/useBalanceQuery';
import usePriceQuery from './queries/usePriceQuery';
import useWalletsQuery from './queries/useWalletsQuery';

export const useTokenBalance = () => {
  const isFocused = useIsFocused();
  const walletBlockChainService = useDi('WalletBlockChainService');
  const { settedCurrency } = settingPersistStore();
  const { selectedWalletIndex, selectedNetwork } = walletPersistStore();
  const _selectedWalletIndex = useMemo(() => selectedWalletIndex[selectedNetwork], [selectedWalletIndex, selectedNetwork]);
  const { tokenList } = tokenPersistStore();
  // @ts-ignore
  const [formalizedBalance, setFormalizedBalance] = useState<IBalanceData[]>();
  const [walletData, setWalletData] = useState<WalletDto[]>([]);
  const [balanceData, setBalanceData] = useState<IBalance>();
  const [priceIds, setPriceIds] = useState<string>();
  const [latestBalanceNetwork, setLatestBalanceNetwork] = useState<string>('');

  // 1. network변경 시 token list 조회
  const selectedTokenList = useMemo(() => tokenList[getNetworkByBase(selectedNetwork)], [selectedNetwork]);
  // 2. priceIds 업데이트
  useEffect(() => {
    setPriceIds(selectedTokenList.map((token) => token.priceId).join(','));
  }, [selectedNetwork]);

  useWalletsQuery(selectedNetwork, {
    onSuccess: (data) => {
      setWalletData(data);
    },
  });

  const { refetch } = useBalanceQuery(walletData[_selectedWalletIndex]?.address, getNetworkConfig(selectedNetwork).networkId, {
    enabled: false,
    keepPreviousData: true,
    select: (data) => {
      let newData: IBalance = {};
      data.forEach((balance) => {
        const token = selectedTokenList?.find((token) => token.symbol === balance.asset.ticker);
        newData = {
          ...newData,
          [balance.asset.ticker]: formatFixed(balance.amount, token?.decimals),
        };
      });
      return newData;
    },
    onSuccess: (data) => {
      setBalanceData(data);
      setLatestBalanceNetwork(selectedNetwork);
    },
  });

  // 3. priceIds 변경 시 price 조회
  const { data: price } = usePriceQuery(
    { ids: priceIds, vsCurrencies: settedCurrency },
    {
      onError: () => {
        // TODO: 일괄로 처리할것인가..?
        console.log('TODO: SERVER ERROR');
      },
      keepPreviousData: true,
    }
  );

  // 4. price 변경 시 blockchain에서 balance조회 후 balanceData업데이트
  const getBalance = async () => {
    try {
      if (!tokenList) return;
      const balance = await walletBlockChainService.getBalanceFromNetwork(_selectedWalletIndex, selectedNetwork, selectedTokenList);
      if (balance && Object.keys(balance).length === 0) {
        console.log('Data fetch from blockchain is fail -> Fetch from Server');
        refetch();
      }
      setBalanceData(balance);
      setLatestBalanceNetwork(selectedNetwork);
    } catch (e) {
      console.log('ERROR:  ', e);
      console.log('Data fetch from blockchain is fail -> Fetch from Server');
      refetch();
    }
  };

  useEffect(() => {
    // TODO: wallet data 못가져왔을 때 에러 로직 추가
    if (walletData.length === 0 || !isFocused || latestBalanceNetwork === selectedNetwork) return;
    getBalance();
  }, [walletData, _selectedWalletIndex, isFocused]);

  //5. balanceData, price 변경 시 formalizedBalance 업데이트
  useEffect(() => {
    if (!balanceData || !selectedTokenList) return;
    let formalizedArray: IBalanceData[] = [];
    for (const [crypto, balance] of Object.entries(balanceData)) {
      const token = selectedTokenList.find((token) => token.symbol === crypto);
      if (!token) continue;
      let floatBalance = 0;
      let valuatedPrice = 0;
      if (!token.priceId || !price) {
        floatBalance = 0;
      } else {
        const data = price[token.priceId] as IGetPriceResponseDto;
        const currency = settedCurrency.toLocaleLowerCase();
        if (data) {
          // TODO: 계산 테스트 필요(자리수 등등)
          floatBalance = parseFloat(balance);
          if (isNaN(floatBalance)) {
            // TODO: 0으로 넣는것 말고 다른 예외처리를 어떻게 해줄것인가?
            floatBalance = 0;
          }

          valuatedPrice = (data[currency] as unknown as number) * floatBalance;
          if (isNaN(valuatedPrice)) {
            // TODO: 0으로 넣는것 말고 다른 예외처리를 어떻게 해줄것인가?
            valuatedPrice = 0;
          }
        }
      }
      formalizedArray = [
        ...formalizedArray,
        {
          ticker: crypto,
          balance: floatBalance,
          valuatedPrice,
          logoURI: token.logoURI,
          tokenDto: token,
        },
      ];
    }
    setFormalizedBalance(formalizedArray);
  }, [price, balanceData]);

  return { formalizedBalance, getBalance };
};
