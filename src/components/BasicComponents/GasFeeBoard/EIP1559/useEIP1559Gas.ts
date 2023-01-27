/* eslint-disable max-lines */
import { useState, useCallback, useMemo, useEffect } from 'react';

import BigNumber from 'bignumber.js';
import { useTranslation } from 'react-i18next';

import { GAS_LEVEL, GAS_UNIT, TGasLevel } from '@@constants/gas.constant';
import gasStore from '@@store/gas/gasStore';
import { tagLogger } from '@@utils/Logger';
import { BnToEtherBn } from '@@utils/formatBigNumber';

import { IUseGasProps } from '../GasFeeBoard.type';
import { IGasInputs } from '../common/GasInputs/GasInputs.type';
import useEVMGasLimitValidation from '../common/hooks/useEVMGasLimitValidation';
import useSetGasTotalGlobal from '../common/hooks/useSetGasTotalGlobal';

import useEIP1559Estimate from './hooks/useEIP1559Estimate';
import useEIP1559GasPriceValidation from './hooks/useEIP1559GasPriceValidation';
import useEIP1559GasTipValidation from './hooks/useEIP1559GasTipValidation';
import useEIP1559Total from './hooks/useEIP1559Total';

const EIP1559_LEVEL_WEIGHT = {
  [GAS_LEVEL.LOW]: '1.1',
  [GAS_LEVEL.MID]: '1.3',
  [GAS_LEVEL.HIGH]: '1.6',
};

const useEIP1559Gas = ({ to, value, data, isValidInput, onConfirm, initialLevel }: IUseGasProps) => {
  const gasLogger = tagLogger('Gas');
  const { setTotal } = gasStore();
  const { t } = useTranslation();
  const [advanced, setAdvanced] = useState<boolean>(false);
  const [level, setLevel] = useState<TGasLevel>(initialLevel ?? GAS_LEVEL.MID);

  const [lastBaseFeePerGas, setLastBaseFeePerGas] = useState<BigNumber | null>(null);
  const [gasLimit, setGasLimit] = useState<BigNumber | null>(new BigNumber(21000));
  const [userInputMaxFeePerGas, setUserInputMaxFeePerGas] = useState<BigNumber | null>(null);
  const [userInputMaxPriorityFeePerGas, setUserInputMaxPriorityFeePerGas] = useState<BigNumber | null>(null);
  const [userInputGasLimit, setUserInputGasLimit] = useState<BigNumber | null>(new BigNumber(21000));

  const leveledMaxFeePriorityFeePerGas = useMemo(() => {
    switch (level) {
      case GAS_LEVEL.LOW:
        return new BigNumber('1').shiftedBy(9);
      case GAS_LEVEL.MID:
        return new BigNumber('1.5').shiftedBy(9);
      case GAS_LEVEL.HIGH:
        return new BigNumber('2').shiftedBy(9);
    }
  }, [level]);

  const maxFeePerGas = useMemo(() => {
    if (!lastBaseFeePerGas || !leveledMaxFeePriorityFeePerGas) return null;
    return lastBaseFeePerGas.multipliedBy(EIP1559_LEVEL_WEIGHT[level]).plus(leveledMaxFeePriorityFeePerGas);
  }, [lastBaseFeePerGas, leveledMaxFeePriorityFeePerGas]);

  //가스프라이스와 가스리밋이 설정되었을때 토탈가스비용을 계산합니다.
  const total = useEIP1559Total({
    advanced,
    maxFeePerGas,
    leveledMaxFeePriorityFeePerGas,
    gasLimit,
    userInputMaxFeePerGas,
    userInputMaxPriorityFeePerGas,
    userInputGasLimit,
  });
  //가스프라이스 조회와 가스사용량을 예측합니다.
  useEIP1559Estimate({ advanced, to, value, data, isValidInput, setGasLimit, setLastBaseFeePerGas });

  useEffect(() => {
    setUserInputMaxFeePerGas(maxFeePerGas);
  }, [advanced, maxFeePerGas]);
  useEffect(() => {
    setUserInputMaxPriorityFeePerGas(leveledMaxFeePriorityFeePerGas);
  }, [advanced, leveledMaxFeePriorityFeePerGas]);
  useEffect(() => {
    setUserInputGasLimit(gasLimit);
  }, [advanced, gasLimit]);

  //유저가 입력하는 값이 타당한 값인지 검증합니다.
  const EIP1559GasPriceInputValidation = useEIP1559GasPriceValidation({
    advanced,
    value,
    maxFeePerGas,
    leveledMaxFeePriorityFeePerGas,
    lastBaseFeePerGas,
    gasLimit,
    userInputMaxFeePerGas,
    userInputMaxPriorityFeePerGas,
    userInputGasLimit,
  });
  const EIP1559GasTipInputValidation = useEIP1559GasTipValidation({
    advanced,
    value,
    maxFeePerGas,
    leveledMaxFeePriorityFeePerGas,
    gasLimit,
    userInputMaxFeePerGas,
    userInputMaxPriorityFeePerGas,
    userInputGasLimit,
  });
  const EIP1559GasLimitInputValidation = useEVMGasLimitValidation({ advanced, gasLimit, userInputGasLimit });

  const toggleGasAdvanced = useCallback(() => {
    setAdvanced(!advanced);
  }, [advanced]);

  //advanced가 true일때 사용자가 직접 입력한 값을 사용합니다.
  //사용할 input array입니다.
  const userInputs: Array<IGasInputs> = useMemo(() => {
    return [
      {
        label: t('max_fee_per_gas'),
        hint: { text: EIP1559GasPriceInputValidation.text, color: EIP1559GasPriceInputValidation.textColor },
        unit: GAS_UNIT.GWEI,
        value: userInputMaxFeePerGas,
        setValue: setUserInputMaxFeePerGas,
      },
      {
        label: t('max_priority_fee_per_gas'),
        hint: { text: EIP1559GasTipInputValidation.text, color: EIP1559GasTipInputValidation.textColor },
        unit: GAS_UNIT.GWEI,
        value: userInputMaxPriorityFeePerGas,
        setValue: setUserInputMaxPriorityFeePerGas,
      },
      {
        label: t('gas_limit'),
        hint: { text: EIP1559GasLimitInputValidation.text, color: EIP1559GasLimitInputValidation.textColor },
        unit: undefined,
        value: userInputGasLimit,
        setValue: setUserInputGasLimit,
      },
    ];
  }, [
    EIP1559GasPriceInputValidation,
    EIP1559GasTipInputValidation,
    EIP1559GasLimitInputValidation,
    userInputMaxFeePerGas,
    userInputMaxPriorityFeePerGas,
    userInputGasLimit,
  ]);

  //버튼활성화여부를 판단합니다.
  const onConfirmValid = useMemo(() => {
    switch (advanced) {
      case false:
        return isValidInput && !!maxFeePerGas && !!leveledMaxFeePriorityFeePerGas && !!gasLimit;
      case true:
        return isValidInput && EIP1559GasPriceInputValidation.status && EIP1559GasTipInputValidation.status && EIP1559GasLimitInputValidation.status;
    }
  }, [
    maxFeePerGas,
    leveledMaxFeePriorityFeePerGas,
    gasLimit,
    EIP1559GasPriceInputValidation.status,
    EIP1559GasTipInputValidation.status,
    EIP1559GasLimitInputValidation.status,
  ]);

  //버튼을 눌렀을때 실행하는 함수입니다.
  //부모로부터 받은 트랜잭션을 실행할 함수를 감싸서 가스비를 주입해주는 함수입니다.
  const wrappedOnConfirm = () => {
    if (!onConfirm) return;
    gasLogger.log('press gas confirm: ', 'to:', to, 'value:', value?.toFixed(), 'data:', data);
    if (!onConfirmValid || !to) {
      gasLogger.error('gas is not ready or to doesn`t exist! ');
      return;
    }
    let gasFeeInfo;
    switch (advanced) {
      case false:
        gasFeeInfo = {
          maxFeePerGas: BnToEtherBn(maxFeePerGas) ?? undefined,
          maxPriorityFeePerGas: BnToEtherBn(leveledMaxFeePriorityFeePerGas) ?? undefined,
          gasLimit: BnToEtherBn(gasLimit) ?? undefined,
        };
        break;
      case true:
        gasFeeInfo = {
          maxFeePerGas: BnToEtherBn(userInputMaxFeePerGas) ?? undefined,
          maxPriorityFeePerGas: BnToEtherBn(userInputMaxPriorityFeePerGas) ?? undefined,
          gasLimit: BnToEtherBn(userInputGasLimit) ?? undefined,
        };
        break;
    }
    gasLogger.log(
      'final gas is: ',
      'maxFeePerGas:',
      gasFeeInfo.maxFeePerGas?.toString(),
      'maxPriorityFeePerGas:',
      gasFeeInfo.maxPriorityFeePerGas?.toString(),
      'gasLimit',
      gasFeeInfo.gasLimit?.toString()
    );
    onConfirm({ to, value: BnToEtherBn(value) ?? undefined, data: data ?? undefined, ...gasFeeInfo });
  };

  useSetGasTotalGlobal(total, gasLimit);

  return {
    advanced,
    level,
    setLevel,
    total,
    toggleGasAdvanced,
    wrappedOnConfirm,
    onConfirmValid,
    userInputs,
  };
};

export default useEIP1559Gas;
