import { useEffect, useState } from 'react';

import { BigNumber } from 'bignumber.js';
import { useTranslation } from 'react-i18next';

import useCoinDto from '@@hooks/useCoinDto';
import { formatBigNumber } from '@@utils/formatBigNumber';

import useGasUtil from '../../common/hooks/useGasUtil';
import useRemainBalance from '../../common/hooks/useRemainBalance';

interface IUseTezosBaseFeeValidationProps {
  advanced: boolean;
  value: BigNumber | null | undefined;
  baseFee: BigNumber | null;
  leveledTip: BigNumber | null;
  storageFee: BigNumber | null;
  storageLimit: BigNumber | null;
  userInputBaseFee: BigNumber | null;
  userInputTip: BigNumber | null;
}

const useTezosTipValidation = ({
  advanced,
  value,
  baseFee,
  leveledTip,
  storageFee,
  storageLimit,
  userInputBaseFee,
  userInputTip,
}: IUseTezosBaseFeeValidationProps) => {
  const { t } = useTranslation();
  const [status, setStatus] = useState<boolean>(false);
  const [text, setText] = useState<string>('');
  const [textColor, setTextColor] = useState<string>('');
  const { remainBalanceStr, remainBalance } = useRemainBalance(value);
  const { red, grey, maximumIS } = useGasUtil();
  const { coinDto } = useCoinDto();

  const check = (baseFee: BigNumber | null, tip: BigNumber | null) => {
    if (!BigNumber.isBigNumber(baseFee) || !BigNumber.isBigNumber(tip)) {
      setStatus(false);
      setText(maximumIS(remainBalanceStr));
      setTextColor(grey);
      return;
    } else if (tip.eq(0)) {
      setStatus(false);
      setText(t('warning_zero_input'));
      setTextColor(red);
      return;
    } else if (tip.lt(new BigNumber(100))) {
      setStatus(true);
      setText(t('warning_lower_than_network'));
      setTextColor(red);
      return;
    } else if (remainBalance.minus(baseFee).lt(tip)) {
      setStatus(false);
      setText(t('msg_insufficient_funds'));
      setTextColor(red);
      return;
    } else {
      setStatus(true);
      setText(maximumIS(formatBigNumber(remainBalance.minus(baseFee), coinDto.decimals).toString(10)));
      setTextColor(grey);
      return;
    }
  };

  const runCheck = () => {
    switch (advanced) {
      case true:
        check(userInputBaseFee, userInputTip);
        return;
      case false:
        check(baseFee, leveledTip);
        return;
    }
  };

  useEffect(() => {
    runCheck();
  }, [advanced, baseFee, leveledTip, userInputBaseFee, userInputTip]);

  return {
    status,
    text,
    textColor,
  };
};

export default useTezosTipValidation;
