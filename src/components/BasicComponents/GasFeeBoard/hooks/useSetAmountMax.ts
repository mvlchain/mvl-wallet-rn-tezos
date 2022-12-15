import { useEffect } from 'react';

import { parseUnits } from 'ethers/lib/utils';

import { TokenDto } from '@@generated/generated-scheme-clutch';
import useDebounce from '@@hooks/useDebounce';
import useOneTokenBalance from '@@hooks/useOneTokenBalance';
import { transactionRequestStore } from '@@store/transaction/transactionRequestStore';

const useSetAmount = (fee: string, tokenDto: TokenDto) => {
  const { value, setBody } = transactionRequestStore();
  const { balance } = useOneTokenBalance(tokenDto);
  const bnBalance = parseUnits(balance, tokenDto.decimals);
  const bnFee = parseUnits(fee, tokenDto.decimals);
  const bnTotal = value ? bnFee.add(value) : null;

  useEffect(() => {
    if (fee === '-') return;
    debounceFix();
  }, [fee]);

  const fixValue = () => {
    if (!bnTotal || bnTotal.lt(bnBalance)) return;
    setBody({
      value: bnBalance.sub(bnFee),
    });
  };
  const debounceFix = useDebounce(fixValue, 800);
};

export default useSetAmount;
