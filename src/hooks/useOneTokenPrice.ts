import { useMemo } from 'react';

import Decimal from 'decimal.js';

import settingPersistStore from '@@store/setting/settingPersistStore';
import { TokenDto } from '@@store/token/tokenPersistStore.type';

import usePriceQuery from './queries/usePriceQuery';

const useOneTokenPrice = (tokenDto: TokenDto, amount: string) => {
  const { settedCurrency } = settingPersistStore();
  // @ts-ignore
  const { data } = usePriceQuery(
    { ids: tokenDto.priceId, vsCurrencies: settedCurrency },
    {
      enabled: !!tokenDto.priceId,
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
    return priceInDecimal.toFixed();
  }, [data, amount]);

  return { price };
};
export default useOneTokenPrice;
