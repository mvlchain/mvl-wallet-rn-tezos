import { useMemo, useEffect, useState } from 'react';

import { BigNumber } from 'bignumber.js';
import { useTranslation } from 'react-i18next';

import { GAS_LEVEL_SETTING } from '@@constants/gas.constant';
import { COIN_DTO, getNetworkConfig, NETWORK_FEE_TYPE } from '@@constants/network.constant';
import { TokenDto } from '@@generated/generated-scheme-clutch';
import useDebounce from '@@hooks/useDebounce';
import useOneTokenBalance from '@@hooks/useOneTokenBalance';
import gasStore from '@@store/gas/gasStore';
import { transactionRequestStore } from '@@store/transaction/transactionRequestStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';
import { commonColors } from '@@style/colors';
import { formatBigNumber } from '@@utils/formatBigNumber';

import { TGasHint } from '../GasFeeInputs/GasFeeInputs.type';

const useTipValidation = (tokenDto: TokenDto) => {
  const { t } = useTranslation();
  const { selectedNetwork } = walletPersistStore();
  const network = getNetworkConfig(selectedNetwork);
  const { balance } = useOneTokenBalance(tokenDto);
  const bnBalnce = new BigNumber(balance).shiftedBy(tokenDto.decimals);

  const { baseFee, tip, gas, setState } = gasStore();
  const { value } = transactionRequestStore();
  const grey = commonColors.grey500;
  const red = commonColors.red;

  const [tipCheck, setTipCheck] = useState<TGasHint | null>(null);

  const remainBalance = useMemo(() => {
    return value && tokenDto.contractAddress ? bnBalnce.minus(value) : bnBalnce;
  }, [tokenDto, balance]);

  const remainBalanceStr = formatBigNumber(remainBalance, tokenDto.decimals).toString(10);

  const textForm = (text: string) => {
    return `${t('maximum')} ${text} ${COIN_DTO[network.coin].symbol}`;
  };

  const getTipCheck = useDebounce(() => {
    switch (network.networkFeeType) {
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
