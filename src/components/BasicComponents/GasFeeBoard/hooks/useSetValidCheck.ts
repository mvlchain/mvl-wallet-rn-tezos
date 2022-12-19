import { useMemo } from 'react';

import BigNumber from 'bignumber.js';
import { useTranslation } from 'react-i18next';

import { GAS_LEVEL_SETTING } from '@@constants/gas.constant';
import { getNetworkConfig, NETWORK_FEE_TYPE } from '@@constants/network.constant';
import { TokenDto } from '@@generated/generated-scheme-clutch';
import useOneTokenBalance from '@@hooks/useOneTokenBalance';
import { useColor } from '@@hooks/useTheme';
import gasStore from '@@store/gas/gasStore';
import { transactionRequestStore } from '@@store/transaction/transactionRequestStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';
import { formatBigNumber } from '@@utils/formatBigNumber';

const useSetValidCheck = (tokenDto: TokenDto, blockBaseFee: BigNumber | null) => {
  const { selectedNetwork } = walletPersistStore();
  const { t } = useTranslation();
  const network = getNetworkConfig(selectedNetwork);
  const { balance } = useOneTokenBalance(tokenDto);
  const bnBalnce = new BigNumber(balance).shiftedBy(tokenDto.decimals);

  const { baseFee, tip, gas, setState } = gasStore();
  const { value } = transactionRequestStore();
  const { color } = useColor();

  const remainBalance = useMemo(() => {
    return value && tokenDto.contractAddress ? bnBalnce.minus(value) : bnBalnce;
  }, [tokenDto, balance]);

  //TODO: 다국어 등록 및 문구 논의 필요
  const baseFeeCheck = useMemo(() => {
    switch (network.networkFeeType) {
      case NETWORK_FEE_TYPE.EIP1559:
        if (!gas || !tip || !baseFee || !blockBaseFee) {
          setState({ baseFeeValid: false });
          return { text: 'Maximum' + remainBalance, color: color.grey500 };
        } else if (baseFee.eq(new BigNumber(0))) {
          setState({ baseFeeValid: false });
          return { text: 'zero warn', color: color.red };
        } else if (baseFee?.lt(blockBaseFee)) {
          setState({ baseFeeValid: true });
          return { text: 'low than network', color: color.red };
        } else if (remainBalance.dividedBy(gas).minus(tip).gt(baseFee)) {
          setState({ baseFeeValid: false });
          return { text: 'balance lack', color: color.red };
        } else {
          setState({ baseFeeValid: true });
          return { text: 'Maximum' + formatBigNumber(remainBalance.dividedBy(gas).minus(tip), tokenDto.decimals).toString(), color: color.grey500 };
        }

      case NETWORK_FEE_TYPE.EVM_LEGACY_GAS:
        if (!gas || !tip || !baseFee) {
          setState({ baseFeeValid: false });
          return { text: 'Maximum' + remainBalance, color: color.grey500 };
        } else if (baseFee.eq(new BigNumber(0))) {
          setState({ baseFeeValid: false });
          return { text: 'zero warn', color: color.red };
        } else if (remainBalance.dividedBy(gas).gt(baseFee)) {
          setState({ baseFeeValid: false });
          return { text: 'balance lack', color: color.red };
        } else {
          setState({ baseFeeValid: true });
          return { text: 'Maximum: ' + formatBigNumber(remainBalance.dividedBy(gas), tokenDto.decimals).toString(), color: color.grey500 };
        }

      case NETWORK_FEE_TYPE.TEZOS:
        setState({ baseFeeValid: true });
        return { text: 'can not change', color: color.grey500 };
    }
  }, [baseFee, gas, tip, remainBalance, blockBaseFee]);

  const tipCheck = useMemo(() => {
    switch (network.networkFeeType) {
      case NETWORK_FEE_TYPE.EIP1559:
        if (!gas || !tip || !baseFee) {
          setState({ tipValid: false });
          return { text: 'Maximum' + remainBalance, color: color.grey500 };
        } else if (tip.eq(new BigNumber(0))) {
          setState({ tipValid: false });
          return { text: 'zero warn', color: color.red };
        } else if (tip.lt(GAS_LEVEL_SETTING.LOW.tip.EIP1559)) {
          setState({ tipValid: true });
          return { text: 'low than network', color: color.red };
        } else if (remainBalance.dividedBy(gas).minus(baseFee).gt(tip)) {
          setState({ tipValid: false });
          return { text: 'balance lack', color: color.red };
        } else {
          setState({ tipValid: true });
          return {
            text: 'Maximum: ' + formatBigNumber(remainBalance.dividedBy(gas).minus(baseFee), tokenDto.decimals).toString(),
            color: color.grey500,
          };
        }

      case NETWORK_FEE_TYPE.EVM_LEGACY_GAS:
        setState({ tipValid: true });
        return null;

      case NETWORK_FEE_TYPE.TEZOS:
        if (!gas || !tip || !baseFee) {
          setState({ tipValid: false });
          return { text: 'Maximum' + remainBalance, color: color.grey500 };
        } else if (tip.eq(new BigNumber(0))) {
          setState({ tipValid: false });
          return { text: 'zero warn', color: color.red };
        } else if (remainBalance.minus(baseFee).gt(tip)) {
          setState({ tipValid: false });
          return { text: 'balance lack', color: color.red };
        } else {
          setState({ tipValid: true });
          return { text: 'Maximum: ' + formatBigNumber(remainBalance.minus(baseFee), tokenDto.decimals).toString(), color: color.grey500 };
        }
    }
  }, [baseFee, gas, tip, remainBalance]);

  const gasCheck = useMemo(() => {
    switch (network.networkFeeType) {
      case NETWORK_FEE_TYPE.EIP1559:
        if (gas?.lt(new BigNumber(21000))) {
          setState({ gasValid: false });
          return { text: 'must 20999 above', color: color.red };
        } else {
          setState({ gasValid: true });
          return null;
        }

      case NETWORK_FEE_TYPE.EVM_LEGACY_GAS:
        if (gas?.lt(new BigNumber(21000))) {
          setState({ gasValid: false });
          return { text: 'must 20999 above', color: color.red };
        } else {
          setState({ gasValid: true });
          return null;
        }

      case NETWORK_FEE_TYPE.TEZOS:
        setState({ gasValid: true });
        return null;
    }
  }, [gas, remainBalance]);

  return {
    baseFeeCheck,
    tipCheck,
    gasCheck,
  };
};

export default useSetValidCheck;
