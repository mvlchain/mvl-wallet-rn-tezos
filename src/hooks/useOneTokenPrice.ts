import { useMemo } from 'react';

import Decimal from 'decimal.js';
import { BigNumber } from 'ethers';
import { formatEther } from 'ethers/lib/utils';

import { TokenDto } from '@@generated/generated-scheme-clutch';
import settingPersistStore from '@@store/setting/settingPersistStore';

import usePriceQuery from './queries/usePriceQuery';

const useOneTokenPrice = (tokenDto: TokenDto, amount: string) => {
  const { settedCurrency } = settingPersistStore();
  // @ts-ignore
  const { data } = usePriceQuery(
    { ids: tokenDto.priceId, vsCurrencies: settedCurrency },
    {
      keepPreviousData: true,
    }
  );

  const price = useMemo(() => {
    if (!data) return '-';
    const priceInfo = Object.values(data)[0];
    const unitPrice = Object.values(priceInfo as Object)[0];
    if (amount === '-') return '-';
    const amountInDecimal = new Decimal(amount);
    const unitInDecimal = new Decimal(unitPrice as number);
    const priceInDecimal = amountInDecimal.mul(unitInDecimal);

    return priceInDecimal.toString();
  }, [data, amount]);

  return { price };
};
export default useOneTokenPrice;
