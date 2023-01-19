import { useEffect, useState } from 'react';

import { BigNumber } from 'bignumber.js';
import { useTranslation } from 'react-i18next';

import { TokenDto } from '@@store/token/tokenPersistStore.type';
import { formatBigNumber } from '@@utils/formatBigNumber';

import useGasUtil from '../../common/hooks/useGasUtil';
import useRemainBalance from '../../common/hooks/useRemainBalance';

interface IUseTezosBaseFeeValidationProps {
  tokenDto: TokenDto;
  advanced: boolean;
  value: BigNumber | null | undefined;
  baseFee: BigNumber | null;
  leveledTip: BigNumber | null;
  storageFee: BigNumber | null;
  storageLimit: BigNumber | null;
  userInputBaseFee: BigNumber | null;
  userInputTip: BigNumber | null;
}

const useTezosBaseFeeValidation = ({
  tokenDto,
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
  const { remainBalanceStr, remainBalance } = useRemainBalance(!tokenDto.contractAddress, value);
  const { red, grey, maximumIS } = useGasUtil();

  const check = (basicBaseFee: BigNumber | null, baseFee: BigNumber | null, tip: BigNumber | null) => {
    if (!BigNumber.isBigNumber(basicBaseFee) || !BigNumber.isBigNumber(baseFee) || !BigNumber.isBigNumber(tip)) {
      setStatus(false);
      setText(maximumIS(remainBalanceStr));
      setTextColor(grey);
      return;
    } else if (baseFee.eq(0)) {
      setStatus(false);
      setText(t('warning_zero_input'));
      setTextColor(red);
      return;
    } else if (baseFee.lt(basicBaseFee)) {
      setStatus(true);
      setText(t('warning _lower_than_network'));
      setTextColor(red);
      return;
    } else {
      setStatus(true);
      setText(maximumIS(formatBigNumber(remainBalance.minus(tip), tokenDto.decimals).toString(10)));
      setTextColor(grey);
      return;
    }
  };

  const runCheck = () => {
    switch (advanced) {
      case true:
        check(baseFee, userInputBaseFee, userInputTip);
        return;
      case false:
        check(baseFee, baseFee, leveledTip);
        return;
    }
  };

  useEffect(() => {
    runCheck();
  }, [advanced, baseFee, leveledTip, userInputBaseFee, userInputTip, tokenDto]);

  return {
    status,
    text,
    textColor,
  };
};

export default useTezosBaseFeeValidation;
