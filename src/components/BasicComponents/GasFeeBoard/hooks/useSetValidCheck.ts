import { useMemo, useEffect, useState } from 'react';

import { BigNumber } from 'bignumber.js';
import { useTranslation } from 'react-i18next';

import { GAS_LEVEL_SETTING } from '@@constants/gas.constant';
import { COIN_DTO, getNetworkConfig, NETWORK_FEE_TYPE } from '@@constants/network.constant';
import { TokenDto } from '@@generated/generated-scheme-clutch';
import useOneTokenBalance from '@@hooks/useOneTokenBalance';
import gasStore from '@@store/gas/gasStore';
import { transactionRequestStore } from '@@store/transaction/transactionRequestStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';
import { commonColors } from '@@style/colors';
import { formatBigNumber } from '@@utils/formatBigNumber';
import { format } from '@@utils/strings';
import { valueOf } from '@@utils/types';

import { TGasHint } from '../GasFeeInputs/GasFeeInputs.type';

const GAS_CHECK_TYPE = {
  BASEFEE: 'baseFeeValid',
  TIP: 'tipValid',
  GAS: 'gasValid',
} as const;

const useSetValidCheck = (tokenDto: TokenDto, blockBaseFee: BigNumber | null) => {
  const { t } = useTranslation();
  const { selectedNetwork } = walletPersistStore();
  const network = getNetworkConfig(selectedNetwork);
  const { balance } = useOneTokenBalance(tokenDto);
  const bnBalnce = new BigNumber(balance).shiftedBy(tokenDto.decimals);

  const { baseFee, tip, gas, setState } = gasStore();
  const { value } = transactionRequestStore();
  const grey = commonColors.grey500;
  const red = commonColors.red;

  const [baseFeeCheck, setBaseFeeCheck] = useState<TGasHint | null>(null);
  const [tipCheck, setTipCheck] = useState<TGasHint | null>(null);
  const [gasCheck, setGasCheck] = useState<TGasHint | null>(null);

  const remainBalance = useMemo(() => {
    return value && tokenDto.contractAddress ? bnBalnce.minus(value) : bnBalnce;
  }, [tokenDto, balance]);

  const check = (valid: boolean, target: valueOf<typeof GAS_CHECK_TYPE>, color: string, text: string, useMaximumPrefix: boolean) => {
    setState({ [target]: valid });
    const textForm = useMaximumPrefix ? `${t('maximum')} ${text} ${COIN_DTO[network.coin].symbol}` : text;
    const state = {
      text: textForm,
      color,
    };
    switch (target) {
      case GAS_CHECK_TYPE.BASEFEE:
        setBaseFeeCheck(state);
        return;
      case GAS_CHECK_TYPE.TIP:
        setTipCheck(state);
        return;
      case GAS_CHECK_TYPE.GAS:
        setGasCheck(state);
        return;
    }
  };

  const zeroWarn = (target: valueOf<typeof GAS_CHECK_TYPE>) => {
    check(false, target, red, t('warning_zero_input'), false);
  };

  const balanceLack = (target: valueOf<typeof GAS_CHECK_TYPE>) => {
    check(false, target, red, t('msg_insufficient_funds'), false);
  };

  const lowerThanNetwork = (target: valueOf<typeof GAS_CHECK_TYPE>) => {
    check(true, target, red, t('warning _lower_than_network'), false);
  };

  const showRemainBalance = (target: valueOf<typeof GAS_CHECK_TYPE>) => {
    check(false, target, grey, formatBigNumber(remainBalance, tokenDto.decimals).toString(10), true);
  };

  useEffect(() => {
    switch (network.networkFeeType) {
      case NETWORK_FEE_TYPE.EIP1559:
        if (!BigNumber.isBigNumber(gas) || !BigNumber.isBigNumber(tip) || !BigNumber.isBigNumber(baseFee) || !BigNumber.isBigNumber(blockBaseFee)) {
          showRemainBalance(GAS_CHECK_TYPE.BASEFEE);
          return;
        } else if (baseFee.eq(0)) {
          zeroWarn(GAS_CHECK_TYPE.BASEFEE);
          return;
        } else if (baseFee.lt(blockBaseFee)) {
          lowerThanNetwork(GAS_CHECK_TYPE.BASEFEE);
          return;
        } else if (remainBalance.dividedBy(gas).minus(tip).lt(baseFee)) {
          balanceLack(GAS_CHECK_TYPE.BASEFEE);
          return;
        } else {
          check(true, GAS_CHECK_TYPE.BASEFEE, grey, formatBigNumber(remainBalance.dividedBy(gas).minus(tip), tokenDto.decimals).toString(10), true);
          return;
        }

      case NETWORK_FEE_TYPE.EVM_LEGACY_GAS:
        if (!BigNumber.isBigNumber(gas) || !BigNumber.isBigNumber(baseFee)) {
          showRemainBalance(GAS_CHECK_TYPE.BASEFEE);
          return;
        } else if (baseFee.eq(0)) {
          zeroWarn(GAS_CHECK_TYPE.BASEFEE);
          return;
        } else if (remainBalance.dividedBy(gas).lt(baseFee)) {
          balanceLack(GAS_CHECK_TYPE.BASEFEE);
          return;
        } else {
          check(true, GAS_CHECK_TYPE.BASEFEE, grey, formatBigNumber(remainBalance.dividedBy(gas), tokenDto.decimals).toString(10), true);
          return;
        }

      case NETWORK_FEE_TYPE.TEZOS:
        // check(true, GAS_CHECK_TYPE.BASEFEE, grey, 'can not change', false);
        setBaseFeeCheck(null);
        return;
    }
  }, [baseFee, gas, tip, blockBaseFee]);

  useEffect(() => {
    switch (network.networkFeeType) {
      case NETWORK_FEE_TYPE.EIP1559:
        if (!BigNumber.isBigNumber(gas) || !BigNumber.isBigNumber(tip) || !BigNumber.isBigNumber(baseFee)) {
          showRemainBalance(GAS_CHECK_TYPE.TIP);
          return;
        } else if (tip.eq(0)) {
          zeroWarn(GAS_CHECK_TYPE.TIP);
          return;
        } else if (tip.lt(GAS_LEVEL_SETTING.LOW.tip.EIP1559)) {
          lowerThanNetwork(GAS_CHECK_TYPE.TIP);
          return;
        } else if (remainBalance.dividedBy(gas).minus(baseFee).lt(tip)) {
          balanceLack(GAS_CHECK_TYPE.TIP);
          return;
        } else {
          check(true, GAS_CHECK_TYPE.TIP, grey, formatBigNumber(remainBalance.dividedBy(gas).minus(baseFee), tokenDto.decimals).toString(10), true);
          return;
        }

      case NETWORK_FEE_TYPE.EVM_LEGACY_GAS:
        setState({ tipValid: true });
        setTipCheck(null);
        return;

      case NETWORK_FEE_TYPE.TEZOS:
        if (!BigNumber.isBigNumber(gas) || !BigNumber.isBigNumber(tip) || !BigNumber.isBigNumber(baseFee)) {
          showRemainBalance(GAS_CHECK_TYPE.TIP);
          return;
        } else if (tip.eq(0)) {
          zeroWarn(GAS_CHECK_TYPE.TIP);
          return;
        } else if (remainBalance.minus(baseFee).lt(tip)) {
          balanceLack(GAS_CHECK_TYPE.TIP);
          return;
        } else {
          check(true, GAS_CHECK_TYPE.TIP, grey, formatBigNumber(remainBalance.minus(baseFee), tokenDto.decimals).toString(10), true);
          return;
        }
    }
  }, [baseFee, gas, tip]);

  useEffect(() => {
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
  }, [gas]);

  return {
    baseFeeCheck,
    tipCheck,
    gasCheck,
  };
};

export default useSetValidCheck;
