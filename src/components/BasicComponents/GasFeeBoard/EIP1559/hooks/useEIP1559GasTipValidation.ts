import { useEffect, useState } from 'react';

import { BigNumber } from 'bignumber.js';
import { useTranslation } from 'react-i18next';

import { TokenDto } from '@@store/token/tokenPersistStore.type';
import { formatBigNumber } from '@@utils/formatBigNumber';

import useGasUtil from '../../common/hooks/useGasUtil';
import useRemainBalance from '../../common/hooks/useRemainBalance';

interface IUseEIP1559GasTipValidationProps {
  tokenDto: TokenDto;
  advanced: boolean;
  maxFeePerGas: BigNumber | null;
  leveledMaxFeePriorityFeePerGas: BigNumber | null;
  gasLimit: BigNumber | null;
  userInputMaxFeePerGas: BigNumber | null;
  userInputMaxPriorityFeePerGas: BigNumber | null;
  userInputGasLimit: BigNumber | null;
  value: BigNumber | null | undefined;
}
const useEIP1559GasTipValidation = ({
  tokenDto,
  advanced,
  value,
  maxFeePerGas,
  leveledMaxFeePriorityFeePerGas,
  gasLimit,
  userInputMaxFeePerGas,
  userInputMaxPriorityFeePerGas,
  userInputGasLimit,
}: IUseEIP1559GasTipValidationProps) => {
  const { t } = useTranslation();
  const [status, setStatus] = useState<boolean>(false);
  const [text, setText] = useState<string>('');
  const [textColor, setTextColor] = useState<string>('');
  const { remainBalanceStr, remainBalance } = useRemainBalance(!tokenDto.contractAddress, value);
  const { red, grey, maximumIS } = useGasUtil();

  const check = (maxFeePerGas: BigNumber | null, maxPriorityFeePerGas: BigNumber | null, gasLimit: BigNumber | null) => {
    if (!BigNumber.isBigNumber(gasLimit) || !BigNumber.isBigNumber(maxPriorityFeePerGas) || !BigNumber.isBigNumber(maxFeePerGas)) {
      setStatus(false);
      setText(maximumIS(remainBalanceStr));
      setTextColor(grey);

      return;
    } else if (maxPriorityFeePerGas.eq(0)) {
      setStatus(false);
      setText(t('warning_zero_input'));
      setTextColor(red);

      return;
    } else if (maxPriorityFeePerGas.lt(new BigNumber('1').shiftedBy(9))) {
      setStatus(true);
      setText(t('warning_lower_than_network'));
      setTextColor(red);

      return;
    } else if (remainBalance.dividedBy(gasLimit).minus(maxFeePerGas).lt(maxPriorityFeePerGas)) {
      setStatus(false);
      setText(t('msg_insufficient_funds'));
      setTextColor(red);

      return;
    } else {
      setStatus(true);
      setText(maximumIS(formatBigNumber(remainBalance.dividedBy(gasLimit).minus(maxFeePerGas), tokenDto.decimals).toString(10)));
      setTextColor(grey);

      return;
    }
  };

  const runCheck = () => {
    switch (advanced) {
      case true:
        check(maxFeePerGas, leveledMaxFeePriorityFeePerGas, gasLimit);
        return;
      case false:
        check(userInputMaxFeePerGas, userInputMaxPriorityFeePerGas, userInputGasLimit);
        return;
    }
  };

  useEffect(() => {
    runCheck();
  }, [
    advanced,
    value,
    maxFeePerGas,
    leveledMaxFeePriorityFeePerGas,
    gasLimit,
    userInputMaxFeePerGas,
    userInputMaxPriorityFeePerGas,
    userInputGasLimit,
  ]);

  return {
    status,
    text,
    textColor,
  };
};

export default useEIP1559GasTipValidation;
