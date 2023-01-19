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

import useEVMEstimate from './hooks/useEVMEstimate';
import useEVMGasPriceValidation from './hooks/useEVMGasPriceValidation';
import useEVMTotal from './hooks/useEVMTotal';

const EVM_LEVEL_WEIGHT = {
  [GAS_LEVEL.LOW]: '1.0',
  [GAS_LEVEL.MID]: '1.3',
  [GAS_LEVEL.HIGH]: '1.7',
};
const useEVMGas = ({ to, value, data, isValidInput, tokenDto, onConfirm }: IUseGasProps) => {
  const gasLogger = tagLogger('Gas');
  const { t } = useTranslation();
  const { setTotal } = gasStore();
  const [advanced, setAdvanced] = useState<boolean>(false);
  const [level, setLevel] = useState<TGasLevel>(GAS_LEVEL.LOW);

  const [gasPrice, setGasPrice] = useState<BigNumber | null>(null);
  const [gasLimit, setGasLimit] = useState<BigNumber | null>(new BigNumber(21000));
  const [userInputGasPrice, setUserInputGasPrice] = useState<BigNumber | null>(null);
  const [userInputGasLimit, setUserInputGasLimit] = useState<BigNumber | null>(null);

  const leveledGasPrice = useMemo(() => {
    return gasPrice ? gasPrice.multipliedBy(EVM_LEVEL_WEIGHT[level]) : new BigNumber(0);
  }, [level, gasPrice]);

  //가스프라이스와 가스리밋이 설정되었을때 토탈가스비용을 계산합니다.
  const total = useEVMTotal({ advanced, leveledGasPrice, gasLimit, userInputGasPrice, userInputGasLimit });
  //가스프라이스 조회와 가스사용량을 예측합니다.
  useEVMEstimate({ advanced, to, value, data, isValidInput, setGasLimit, setGasPrice });

  useEffect(() => {
    setUserInputGasPrice(leveledGasPrice);
  }, [advanced, leveledGasPrice]);
  useEffect(() => {
    setUserInputGasLimit(gasLimit);
  }, [advanced, gasLimit]);

  //유저가 입력하는 값이 타당한 값인지 검증합니다.
  const EVMGasPriceInputValidation = useEVMGasPriceValidation({
    tokenDto,
    advanced,
    value,
    leveledGasPrice,
    userInputGasPrice,
    gasLimit,
    userInputGasLimit,
    total,
  });
  const EVMGasLimitInputValidation = useEVMGasLimitValidation({ advanced, gasLimit, userInputGasLimit });

  const toggleGasAdvanced = useCallback(() => {
    setAdvanced(!advanced);
  }, [advanced]);

  //advanced가 true일때 사용자가 직접 입력한 값을 사용합니다.
  //사용할 input array입니다.
  const userInputs: Array<IGasInputs> = useMemo(() => {
    return [
      {
        label: t('gas_price'),
        hint: { text: EVMGasPriceInputValidation.text, color: EVMGasPriceInputValidation.textColor },
        unit: GAS_UNIT.GWEI,
        value: userInputGasPrice,
        setValue: setUserInputGasPrice,
      },
      {
        label: t('gas_limit'),
        hint: { text: EVMGasLimitInputValidation.text, color: EVMGasLimitInputValidation.textColor },
        unit: undefined,
        value: userInputGasLimit,
        setValue: setUserInputGasLimit,
      },
    ];
  }, [EVMGasPriceInputValidation, EVMGasLimitInputValidation, userInputGasPrice, userInputGasLimit]);

  //버튼활성화여부를 판단합니다.
  const onConfirmValid = useMemo(() => {
    switch (advanced) {
      case true:
        return isValidInput && !!leveledGasPrice && !!gasLimit;
      case false:
        return isValidInput && EVMGasPriceInputValidation.status && EVMGasLimitInputValidation.status;
    }
  }, [leveledGasPrice, gasLimit, EVMGasPriceInputValidation.status, EVMGasLimitInputValidation.status]);

  //버튼을 눌렀을때 실행하는 함수입니다.
  //부모로부터 받은 트랜잭션을 실행할 함수를 감싸서 가스비를 주입해주는 함수입니다.
  const wrappedOnConfirm = () => {
    gasLogger.log('press gas confirm: ', 'to:', to, 'value:', value?.toString(10), 'data:', data);
    if (!onConfirmValid || !to) {
      gasLogger.error('gas is not ready or to doesn`t exist! ', 'gasPrice:');
      return;
    }
    let gasFeeInfo;
    switch (advanced) {
      case true:
        gasFeeInfo = {
          gasPrice: BnToEtherBn(leveledGasPrice) ?? undefined,
          gasLimit: BnToEtherBn(gasLimit) ?? undefined,
        };
        break;
      case false:
        gasFeeInfo = {
          gasPrice: BnToEtherBn(userInputGasPrice) ?? undefined,
          gasLimit: BnToEtherBn(userInputGasLimit) ?? undefined,
        };
        break;
    }
    gasLogger.log('final gas is: ', 'gasPrice:', gasFeeInfo.gasPrice?.toString(), 'gasLimit', gasFeeInfo.gasLimit?.toString());
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

export default useEVMGas;
