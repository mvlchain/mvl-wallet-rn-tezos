import { useEffect } from 'react';

import BigNumber from 'bignumber.js';

import { TokenDto } from '@@generated/generated-scheme-clutch';
import useDebounce from '@@hooks/useDebounce';
import useOneTokenBalance from '@@hooks/useOneTokenBalance';
import { transactionRequestStore } from '@@store/transaction/transactionRequestStore';

const useSetAmount = (fee: string, tokenDto: TokenDto) => {
  const { value, setBody } = transactionRequestStore();
  const { balance } = useOneTokenBalance(tokenDto);
  const bnBalance = new BigNumber(balance).shiftedBy(tokenDto.decimals);
  const bnFee = new BigNumber(fee).shiftedBy(tokenDto.decimals);
  const bnTotal = value ? bnFee.plus(value) : null;

  useEffect(() => {
    if (fee === '-') return;
    debounceFix();
  }, [fee]);

  const fixValue = () => {
    if (!bnTotal || bnTotal.lt(bnBalance)) return;
    setBody({
      value: bnBalance.minus(bnFee),
    });
  };
  const debounceFix = useDebounce(fixValue, 800);
};

export default useSetAmount;
