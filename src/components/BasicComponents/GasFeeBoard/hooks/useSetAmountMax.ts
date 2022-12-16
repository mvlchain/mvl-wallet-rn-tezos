import { useEffect } from 'react';

import BigNumber from 'bignumber.js';

import { TokenDto } from '@@generated/generated-scheme-clutch';
import useDebounce from '@@hooks/useDebounce';
import useOneTokenBalance from '@@hooks/useOneTokenBalance';
import gasStore from '@@store/gas/gasStore';
import { transactionRequestStore } from '@@store/transaction/transactionRequestStore';

const useSetAmountMax = (tokenDto: TokenDto) => {
  const { value, setBody } = transactionRequestStore();
  const { balance } = useOneTokenBalance(tokenDto);
  const { total } = gasStore();
  const bnBalance = new BigNumber(balance).shiftedBy(tokenDto.decimals);
  const bnTotal = total && value ? total.plus(value) : null;

  useEffect(() => {
    if (!total) return;
    debounceFix();
  }, [total]);

  const fixValue = () => {
    if (!total || !bnTotal || bnTotal.lt(bnBalance)) return;
    setBody({
      value: bnBalance.minus(total),
    });
  };
  const debounceFix = useDebounce(fixValue, 800);
};

export default useSetAmountMax;
