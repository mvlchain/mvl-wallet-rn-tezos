import { useMemo } from 'react';

import { BigNumber } from 'bignumber.js';

import useCoinDto from '@@hooks/useCoinDto';
import useOneTokenBalance from '@@hooks/useOneTokenBalance';
import { transactionRequestStore } from '@@store/transaction/transactionRequestStore';
import { formatBigNumber } from '@@utils/formatBigNumber';

const useRemainBalance = (isCoin: boolean, value?: BigNumber) => {
  const { coinDto } = useCoinDto();
  const { balance } = useOneTokenBalance(coinDto);
  const bnBalnce = new BigNumber(balance).shiftedBy(coinDto.decimals);
  // const { value } = transactionRequestStore();

  const remainBalance = useMemo(() => {
    return value && isCoin ? bnBalnce.minus(value) : bnBalnce;
  }, [balance, value]);

  const remainBalanceStr = formatBigNumber(remainBalance, coinDto.decimals).toString(10);
  return { remainBalanceStr, remainBalance };
};

export default useRemainBalance;
