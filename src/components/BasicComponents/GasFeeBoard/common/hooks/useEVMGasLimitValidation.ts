import { useEffect, useState } from 'react';

import { BigNumber } from 'bignumber.js';
import { useTranslation } from 'react-i18next';

import { format } from '@@utils/strings';

import useGasUtil from '../../common/hooks/useGasUtil';

interface IUseEVMGasLimitValidationProps {
  advanced: boolean;
  gasLimit: BigNumber | null;
  userInputGasLimit: BigNumber | null;
}

const useEVMGasLimitValidation = ({ advanced, gasLimit, userInputGasLimit }: IUseEVMGasLimitValidationProps) => {
  const { t } = useTranslation();
  const [status, setStatus] = useState<boolean>(false);
  const [text, setText] = useState<string>('');
  const [textColor, setTextColor] = useState<string>('');
  const { red, grey, maximumIS } = useGasUtil();

  const check = (gasLimit: BigNumber | null) => {
    if (gasLimit?.lt(new BigNumber(21000))) {
      setStatus(false);
      setText(format(t('verification_gas_limit'), '21000'));
      setTextColor(red);
      return;
    } else {
      setStatus(true);
      setText('');
      setTextColor(grey);
      return;
    }
  };

  const runCheck = () => {
    switch (advanced) {
      case true:
        check(userInputGasLimit);
        return;
      case false:
        check(gasLimit);
        return;
    }
  };

  useEffect(() => {
    runCheck();
  }, [advanced, gasLimit, userInputGasLimit]);

  return {
    status,
    text,
    textColor,
  };
};

export default useEVMGasLimitValidation;
