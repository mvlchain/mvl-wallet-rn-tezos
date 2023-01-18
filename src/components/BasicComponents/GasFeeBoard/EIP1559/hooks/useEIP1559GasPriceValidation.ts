import { useEffect, useState } from 'react';

import { BigNumber } from 'bignumber.js';
import { useTranslation } from 'react-i18next';

import { TokenDto } from '@@store/token/tokenPersistStore.type';
import { formatBigNumber } from '@@utils/formatBigNumber';

import useGasUtil from '../../common/hooks/useGasUtil';
import useRemainBalance from '../../common/hooks/useRemainBalance';

interface IUseEIP1559GasPriceValidationProps {
  tokenDto: TokenDto;
  advanced: boolean;
  leveledMaxFeePerGas: BigNumber | null;
  leveledMaxFeePriorityFeePerGas: BigNumber | null;
  maxFeePerGas: BigNumber | null;
  gasLimit: BigNumber | null;
  userInputMaxFeePerGas: BigNumber | null;
  userInputMaxPriorityFeePerGas: BigNumber | null;
  userInputGasLimit: BigNumber | null;
  value: BigNumber | null | undefined;
}

const useEIP1559GasPriceValidation = ({
  tokenDto,
  advanced,
  value,
  leveledMaxFeePerGas,
  leveledMaxFeePriorityFeePerGas,
  maxFeePerGas,
  gasLimit,
  userInputMaxFeePerGas,
  userInputMaxPriorityFeePerGas,
  userInputGasLimit,
}: IUseEIP1559GasPriceValidationProps) => {
  const { t } = useTranslation();
  const [status, setStatus] = useState<boolean>(false);
  const [text, setText] = useState<string>('');
  const [textColor, setTextColor] = useState<string>('');
  const { remainBalanceStr, remainBalance } = useRemainBalance(!tokenDto.contractAddress, value);
  const { red, grey, maximumIS } = useGasUtil();

  const check = (
    maxFeePerGas: BigNumber | null,
    defaultMaxFeePerGas: BigNumber | null, //level에 따라 가중치를 주지 않은 블록체인으로부터 처음 받아 저장했던 값
    maxPriorityFeePerGas: BigNumber | null,
    gasLimit: BigNumber | null
  ) => {
    if (
      !BigNumber.isBigNumber(gasLimit) ||
      !BigNumber.isBigNumber(maxPriorityFeePerGas) ||
      !BigNumber.isBigNumber(maxFeePerGas) ||
      !BigNumber.isBigNumber(defaultMaxFeePerGas)
    ) {
      setStatus(false);
      setText(maximumIS(remainBalanceStr));
      setTextColor(grey);

      return;
    } else if (maxFeePerGas.eq(0)) {
      setStatus(false);
      setText(t('warning_zero_input'));
      setTextColor(red);

      return;
    } else if (maxFeePerGas.lt(defaultMaxFeePerGas)) {
      setStatus(true);
      setText(t('warning _lower_than_network'));
      setTextColor(red);

      return;
    } else if (remainBalance.dividedBy(gasLimit).minus(maxPriorityFeePerGas).lt(maxFeePerGas)) {
      setStatus(false);
      setText(t('msg_insufficient_funds'));
      setTextColor(red);

      return;
    } else {
      setStatus(true);
      setText(maximumIS(formatBigNumber(remainBalance.dividedBy(gasLimit).minus(maxPriorityFeePerGas), tokenDto.decimals).toString(10)));
      setTextColor(grey);

      return;
    }
  };

  const runCheck = () => {
    switch (advanced) {
      case true:
        check(leveledMaxFeePerGas, maxFeePerGas, leveledMaxFeePriorityFeePerGas, gasLimit);
        return;
      case false:
        check(userInputMaxFeePerGas, maxFeePerGas, userInputMaxPriorityFeePerGas, userInputGasLimit);
        return;
    }
  };

  useEffect(() => {
    runCheck();
  }, [
    advanced,
    value,
    leveledMaxFeePerGas,
    leveledMaxFeePriorityFeePerGas,
    maxFeePerGas,
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

export default useEIP1559GasPriceValidation;
