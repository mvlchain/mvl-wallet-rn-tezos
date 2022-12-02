import { useEffect, useState, useMemo } from 'react';

import Decimal from 'decimal.js';
import { BigNumber } from 'ethers';
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

const useOneTokenPrice = (symbol: keyof typeof WALLET_TOKEN, amount: BigNumber) => {
  const { settedCurrency } = settingPersistStore();
  const { selectedWalletIndex, selectedNetwork } = walletPersistStore();
  // @ts-ignore
  const priceIds = PRICE_NAME[symbol];

  const { data } = usePriceQuery(
    { network: selectedNetwork, currency: settedCurrency },
    { ids: priceIds, vsCurrencies: settedCurrency },
    {
      keepPreviousData: true,
    }
  );

  const price = useMemo(() => {
    console.log('data', data);
    return '-';
    // const amountInDecimal = new Decimal(amount.toString());
    // const unitInDecimal = new Decimal(data.);
    // const priceInDecimal = amountInDecimal.mul(unitInDecimal);

    // return priceInDecimal.toString();
  }, [data]);

  return { price };
};
export default useOneTokenPrice;
