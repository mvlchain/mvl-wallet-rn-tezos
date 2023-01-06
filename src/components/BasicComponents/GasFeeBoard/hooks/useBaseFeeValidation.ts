import { useEffect, useState } from 'react';

import { BigNumber } from 'bignumber.js';
import { useTranslation } from 'react-i18next';

import { NETWORK_FEE_TYPE } from '@@constants/network.constant';
import useDebounce from '@@hooks/useDebounce';
import gasStore from '@@store/gas/gasStore';
import { TokenDto } from '@@store/token/tokenPersistStore.type';
import { formatBigNumber } from '@@utils/formatBigNumber';

import { TGasHint } from '../GasFeeInputs/GasFeeInputs.type';

import useGasUtil from './useGasUtil';
import useRemainBalance from './useRemainBalance';
const useBaseFeeValidation = (tokenDto: TokenDto, blockBaseFee: BigNumber | null) => {
  const { t } = useTranslation();

  const { remainBalanceStr, remainBalance } = useRemainBalance(!tokenDto.contractAddress);
  const { baseFee, tip, gas, setState } = gasStore();
  const [baseFeeCheck, setBaseFeeCheck] = useState<TGasHint | null>(null);
  const { grey, red, textForm, networkFeeType } = useGasUtil();

  const getBaseFeeCheck = useDebounce(() => {
    switch (networkFeeType) {
      case NETWORK_FEE_TYPE.EIP1559:
        if (!BigNumber.isBigNumber(gas) || !BigNumber.isBigNumber(tip) || !BigNumber.isBigNumber(baseFee) || !BigNumber.isBigNumber(blockBaseFee)) {
          setState({ baseFeeValid: false });
          setBaseFeeCheck({ text: textForm(remainBalanceStr), color: grey });
          return;
        } else if (baseFee.eq(0)) {
          setState({ baseFeeValid: false });
          setBaseFeeCheck({ text: t('warning_zero_input'), color: red });

          return;
        } else if (baseFee.lt(blockBaseFee)) {
          setState({ baseFeeValid: true });
          setBaseFeeCheck({ text: t('warning _lower_than_network'), color: red });

          return;
        } else if (remainBalance.dividedBy(gas).minus(tip).lt(baseFee)) {
          setState({ baseFeeValid: false });
          setBaseFeeCheck({ text: t('msg_insufficient_funds'), color: red });
          return;
        } else {
          setState({ baseFeeValid: true });
          setBaseFeeCheck({ text: textForm(formatBigNumber(remainBalance.dividedBy(gas).minus(tip), tokenDto.decimals).toString(10)), color: grey });

          return;
        }

      case NETWORK_FEE_TYPE.EVM_LEGACY_GAS:
        if (!BigNumber.isBigNumber(gas) || !BigNumber.isBigNumber(baseFee)) {
          setState({ baseFeeValid: false });
          setBaseFeeCheck({ text: textForm(remainBalanceStr), color: grey });
          return;
        } else if (baseFee.eq(0)) {
          setState({ baseFeeValid: false });
          setBaseFeeCheck({ text: t('warning_zero_input'), color: red });
          return;
        } else if (remainBalance.dividedBy(gas).lt(baseFee)) {
          setState({ baseFeeValid: false });
          setBaseFeeCheck({ text: t('msg_insufficient_funds'), color: red });
          return;
        } else {
          setState({ baseFeeValid: true });
          setBaseFeeCheck({ text: textForm(formatBigNumber(remainBalance.dividedBy(gas), tokenDto.decimals).toString(10)), color: grey });

          return;
        }

      case NETWORK_FEE_TYPE.TEZOS:
        if (!BigNumber.isBigNumber(blockBaseFee) || !BigNumber.isBigNumber(baseFee) || !BigNumber.isBigNumber(tip)) {
          setState({ baseFeeValid: false });
          setBaseFeeCheck({ text: textForm(remainBalanceStr), color: grey });
          return;
        } else if (baseFee.eq(0)) {
          setState({ baseFeeValid: false });
          setBaseFeeCheck({ text: t('warning_zero_input'), color: red });
          return;
        } else if (baseFee.lt(blockBaseFee)) {
          setState({ baseFeeValid: true });
          setBaseFeeCheck({ text: t('warning _lower_than_network'), color: red });
          return;
        } else {
          setState({ tipValid: true });
          setBaseFeeCheck({ text: textForm(formatBigNumber(remainBalance.minus(tip), tokenDto.decimals).toString(10)), color: grey });
          return;
        }
    }
  }, 100);

  useEffect(() => {
    getBaseFeeCheck();
  }, [baseFee, gas, tip, blockBaseFee]);
  return {
    baseFeeCheck,
  };
};

export default useBaseFeeValidation;
