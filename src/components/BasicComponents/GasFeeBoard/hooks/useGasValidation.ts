import { useEffect, useState } from 'react';

import { BigNumber } from 'bignumber.js';
import { useTranslation } from 'react-i18next';

import { getNetworkConfig, NETWORK_FEE_TYPE } from '@@constants/network.constant';
import useDebounce from '@@hooks/useDebounce';
import gasStore from '@@store/gas/gasStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';
import { commonColors } from '@@style/colors';
import { format } from '@@utils/strings';

import { TGasHint } from '../GasFeeInputs/GasFeeInputs.type';

const useGasValidation = () => {
  const { t } = useTranslation();
  const { selectedNetwork } = walletPersistStore();
  const network = getNetworkConfig(selectedNetwork);

  const { gas, setState } = gasStore();

  const red = commonColors.red;

  const [gasCheck, setGasCheck] = useState<TGasHint | null>(null);

  const getGasCheck = useDebounce(() => {
    switch (network.networkFeeType) {
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
