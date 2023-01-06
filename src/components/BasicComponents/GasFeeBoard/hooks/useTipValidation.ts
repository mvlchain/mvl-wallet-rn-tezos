import { useEffect, useState } from 'react';

import { BigNumber } from 'bignumber.js';
import { useTranslation } from 'react-i18next';

import { GAS_LEVEL_SETTING } from '@@constants/gas.constant';
import { NETWORK_FEE_TYPE } from '@@constants/network.constant';
import useDebounce from '@@hooks/useDebounce';
import gasStore from '@@store/gas/gasStore';
import { TokenDto } from '@@store/token/tokenPersistStore.type';
import { formatBigNumber } from '@@utils/formatBigNumber';

import { TGasHint } from '../GasFeeInputs/GasFeeInputs.type';

import useGasUtil from './useGasUtil';
import useRemainBalance from './useRemainBalance';

const useTipValidation = (tokenDto: TokenDto) => {
  const { t } = useTranslation();

  const { baseFee, tip, gas, setState } = gasStore();
  const [tipCheck, setTipCheck] = useState<TGasHint | null>(null);
  const { remainBalanceStr, remainBalance } = useRemainBalance(!tokenDto.contractAddress);
  const { grey, red, textForm, networkFeeType } = useGasUtil();

  const getTipCheck = useDebounce(() => {
    switch (networkFeeType) {
      case NETWORK_FEE_TYPE.EIP1559:
        if (!BigNumber.isBigNumber(gas) || !BigNumber.isBigNumber(tip) || !BigNumber.isBigNumber(baseFee)) {
          setState({ tipValid: false });
          setTipCheck({ text: textForm(remainBalanceStr), color: grey });
          return;
        } else if (tip.eq(0)) {
          setState({ tipValid: false });
          setTipCheck({ text: t('warning_zero_input'), color: red });
          return;
        } else if (tip.lt(GAS_LEVEL_SETTING.LOW.tip.EIP1559)) {
          setState({ tipValid: true });
          setTipCheck({ text: t('warning _lower_than_network'), color: red });
          return;
        } else if (remainBalance.dividedBy(gas).minus(baseFee).lt(tip)) {
          setState({ tipValid: false });
          setTipCheck({ text: t('msg_insufficient_funds'), color: red });
          return;
        } else {
          setState({ tipValid: true });
          setTipCheck({ text: textForm(formatBigNumber(remainBalance.dividedBy(gas).minus(baseFee), tokenDto.decimals).toString(10)), color: grey });
          return;
        }

      case NETWORK_FEE_TYPE.EVM_LEGACY_GAS:
        setState({ tipValid: true });
        setTipCheck(null);
        return;

      case NETWORK_FEE_TYPE.TEZOS:
        if (!BigNumber.isBigNumber(gas) || !BigNumber.isBigNumber(tip) || !BigNumber.isBigNumber(baseFee)) {
          setState({ tipValid: false });
          setTipCheck({ text: textForm(remainBalanceStr), color: grey });
          return;
        } else if (tip.eq(0)) {
          setState({ tipValid: false });
          setTipCheck({ text: t('warning_zero_input'), color: red });
          return;
        } else if (remainBalance.minus(baseFee).lt(tip)) {
          setState({ tipValid: false });
          setTipCheck({ text: t('msg_insufficient_funds'), color: red });
          return;
        } else {
          setState({ tipValid: true });
          setTipCheck({ text: textForm(formatBigNumber(remainBalance.minus(baseFee), tokenDto.decimals).toString(10)), color: grey });
          return;
        }
    }
  }, 100);

  useEffect(() => {
    getTipCheck();
  }, [baseFee, gas, tip]);

  return {
    tipCheck,
  };
};

export default useTipValidation;
