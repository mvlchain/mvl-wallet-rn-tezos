import { useMemo, useEffect, useState, useCallback } from 'react';

import { BigNumber } from 'bignumber.js';
import { useTranslation } from 'react-i18next';

import { COIN_DTO, getNetworkConfig, NETWORK_FEE_TYPE } from '@@constants/network.constant';
// import { TokenDto } from '@@generated/generated-scheme-clutch';
import useDebounce from '@@hooks/useDebounce';
import useOneTokenBalance from '@@hooks/useOneTokenBalance';
import gasStore from '@@store/gas/gasStore';
import { TokenDto } from '@@store/token/tokenPersistStore.type';
import { transactionRequestStore } from '@@store/transaction/transactionRequestStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';
import { commonColors } from '@@style/colors';
import { formatBigNumber } from '@@utils/formatBigNumber';

import { TGasHint } from '../GasFeeInputs/GasFeeInputs.type';
const useBaseFeeValidation = (tokenDto: TokenDto, blockBaseFee: BigNumber | null) => {
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

  const remainBalance = useMemo(() => {
    return value && tokenDto.contractAddress ? bnBalnce.minus(value) : bnBalnce;
  }, [tokenDto, balance]);

  const remainBalanceStr = formatBigNumber(remainBalance, tokenDto.decimals).toString(10);

  const textForm = (text: string) => {
    return `${t('maximum')} ${text} ${COIN_DTO[network.coin].symbol}`;
  };

  const getBaseFeeCheck = useDebounce(() => {
    switch (network.networkFeeType) {
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
