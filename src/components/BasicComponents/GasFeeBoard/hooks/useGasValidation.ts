import { useEffect, useState } from 'react';

import { BigNumber } from 'bignumber.js';
import { useTranslation } from 'react-i18next';

import { NETWORK_FEE_TYPE } from '@@constants/network.constant';
import useDebounce from '@@hooks/useDebounce';
import gasStore from '@@store/gas/gasStore';
import { format } from '@@utils/strings';

import { TGasHint } from '../GasFeeInputs/GasFeeInputs.type';

import useGasUtil from './useGasUtil';

const useGasValidation = () => {
  const { t } = useTranslation();
  const { gas, setState } = gasStore();
  const { red, networkFeeType } = useGasUtil();
  const [gasCheck, setGasCheck] = useState<TGasHint | null>(null);

  const getGasCheck = useDebounce(() => {
    switch (networkFeeType) {
      case NETWORK_FEE_TYPE.EIP1559:
        if (gas?.lt(new BigNumber(21000))) {
          setState({ gasValid: false });
          setGasCheck({ text: format(t('verification_gas_limit'), '21000'), color: red });
          return;
        } else {
          setState({ gasValid: true });
          setGasCheck(null);
          return;
        }

      case NETWORK_FEE_TYPE.EVM_LEGACY_GAS:
        if (gas?.lt(new BigNumber(21000))) {
          setState({ gasValid: false });
          setGasCheck({ text: format(t('verification_gas_limit'), '21000'), color: red });
          return;
        } else {
          setState({ gasValid: true });
          setGasCheck(null);
          return;
        }

      case NETWORK_FEE_TYPE.TEZOS:
        setState({ gasValid: true });
        setGasCheck(null);
        return;
    }
  }, 100);

  useEffect(() => {
    getGasCheck();
  }, [gas]);

  return {
    gasCheck,
  };
};

export default useGasValidation;
