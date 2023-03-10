import { useEffect, useState } from 'react';

import { BigNumber } from 'bignumber.js';
import { useTranslation } from 'react-i18next';

import useCoinDto from '@@hooks/useCoinDto';
import { formatBigNumber } from '@@utils/formatBigNumber';

import useGasUtil from '../../common/hooks/useGasUtil';
import useRemainBalance from '../../common/hooks/useRemainBalance';

interface IUseEVMGasPriceValidationProps {
  advanced: boolean;
  leveledGasPrice: BigNumber | null;
  userInputGasPrice: BigNumber | null;
  gasLimit: BigNumber | null;
  userInputGasLimit: BigNumber | null;
  total: BigNumber | null;
  value: BigNumber | null | undefined;
}

const useEVMGasPriceValidation = ({
  advanced,
  leveledGasPrice,
  userInputGasPrice,
  gasLimit,
  userInputGasLimit,
  total,
  value,
}: IUseEVMGasPriceValidationProps) => {
  const { t } = useTranslation();
  const [status, setStatus] = useState<boolean>(false);
  const [text, setText] = useState<string>('');
  const [textColor, setTextColor] = useState<string>('');
  const { remainBalanceStr, remainBalance } = useRemainBalance(value);
  const { red, grey, maximumIS } = useGasUtil();
  const { coinDto } = useCoinDto();

  const check = (gasPrice: BigNumber | null, gasLimit: BigNumber | null) => {
    if (!BigNumber.isBigNumber(gasLimit) || !BigNumber.isBigNumber(gasPrice)) {
      setStatus(false);
      setText(maximumIS(remainBalanceStr));
      setTextColor(grey);
      return;
    } else if (gasPrice.eq(0)) {
      setStatus(false);
      setText(t('warning_zero_input'));
      setTextColor(red);
      return;
    } else if (remainBalance.dividedBy(gasLimit).lt(gasPrice)) {
      setStatus(false);
      setText(t('msg_insufficient_funds'));
      setTextColor(red);
      return;
    } else {
      setStatus(true);
      setText(maximumIS(formatBigNumber(remainBalance.dividedBy(gasLimit), coinDto.decimals).toFixed()));
      setTextColor(grey);
      return;
    }
  };

  const runCheck = () => {
    switch (advanced) {
      case true:
        check(userInputGasPrice, userInputGasLimit);
        return;
      case false:
        check(leveledGasPrice, gasLimit);
        return;
    }
  };

  useEffect(() => {
    runCheck();
  }, [advanced, leveledGasPrice, userInputGasPrice, gasLimit, userInputGasLimit, total]);

  return {
    status,
    text,
    textColor,
  };
};

export default useEVMGasPriceValidation;
