import { useState, useCallback, useMemo, useEffect } from 'react';

import BigNumber from 'bignumber.js';
import { useTranslation } from 'react-i18next';

import { GAS_LEVEL, GAS_UNIT } from '@@constants/gas.constant';
import { TGasLevel } from '@@domain/gas/Gas.type';
import { TEZOS_TOKEN_LIST } from '@@store/token/tokenPersistStore.constant';
import { tagLogger } from '@@utils/Logger';
import { formatBigNumber } from '@@utils/formatBigNumber';

import { ITezosUseGasProps, IUseGasProps } from '../GasFeeBoard.type';
import { IGasInputs } from '../common/GasInputs/GasInputs.type';

import useTezosBaseFeeValidation from './hooks/useTezosBaseFeeValidation';
import useTezosEstimate from './hooks/useTezosEstimate';
import useTezosTipValidation from './hooks/useTezosTipValidation';
import useTezosTotal from './hooks/useTezosTotal';

const useTezosGas = ({ to, value, transferParam, isValidInput, tokenDto, onConfirm }: ITezosUseGasProps) => {
  const gasLogger = tagLogger('Gas');
  const { t } = useTranslation();
  const [advanced, setAdvanced] = useState<boolean>(false);
  const [level, setLevel] = useState<TGasLevel>(GAS_LEVEL.LOW);

  const [baseFee, setBaseFee] = useState<BigNumber | null>(null);
  const [tip, setTip] = useState<BigNumber | null>(null);
  const [storageLimit, setStorageLimit] = useState<BigNumber | null>(null);
  //테조스의 가스와 스토리지비용은 유저가 수정할 수 없다.
  const [gasLimit, setGasLimit] = useState<BigNumber | null>(null);
  const [storageFee, setStorageFee] = useState<BigNumber | null>(null);
  const [userInputBaseFee, setUserInputBaseFee] = useState<BigNumber | null>(null);
  const [userInputTip, setUserInputTip] = useState<BigNumber | null>(null);
  // const [userInputStorageLimit, setUserInputStorageLimit] = useState<BigNumber | null>(null);

  const leveledTip = useMemo(() => {
    switch (level) {
      case GAS_LEVEL.LOW:
        return new BigNumber('100');
      case GAS_LEVEL.MID:
        return new BigNumber('150');
      case GAS_LEVEL.HIGH:
        return new BigNumber('200');
    }
  }, [level]);

  //가스프라이스와 가스리밋이 설정되었을때 토탈가스비용을 계산합니다.
  const total = useTezosTotal({
    advanced,
    baseFee,
    leveledTip,
    storageLimit,
    storageFee,
    userInputBaseFee,
    userInputTip,
  });
  //가스프라이스 조회와 가스사용량을 예측합니다.
  useTezosEstimate({ advanced, to, value, transferParam, isValidInput, tokenDto, setGasLimit, setStorageFee, setStorageLimit, setBaseFee });

  const setBaseValueForUserInputs = () => {
    if (!advanced) return;
    setUserInputBaseFee(baseFee);
    // setUserInputStorageLimit(storageLimit);
    setUserInputTip(tip);
  };
  useEffect(() => {
    setBaseValueForUserInputs();
  }, [advanced, baseFee, storageLimit, tip]);

  //유저가 입력하는 값이 타당한 값인지 검증합니다.
  const baseFeeInputValidation = useTezosBaseFeeValidation({
    tokenDto,
    advanced,
    value,
    baseFee,
    leveledTip,
    storageFee,
    storageLimit,
    userInputBaseFee,
    userInputTip,
  });
  const tipInputValidation = useTezosTipValidation({
    tokenDto,
    advanced,
    value,
    baseFee,
    leveledTip,
    storageFee,
    storageLimit,
    userInputBaseFee,
    userInputTip,
  });

  const toggleGasAdvanced = useCallback(() => {
    setAdvanced(!advanced);
  }, [advanced]);

  //advanced가 true일때 사용자가 직접 입력한 값을 사용합니다.
  //사용할 input array입니다.
  const userInputs: Array<IGasInputs> = useMemo(() => {
    return [
      {
        label: t('base_fee'),
        hint: { text: baseFeeInputValidation.text, color: baseFeeInputValidation.textColor },
        unit: GAS_UNIT.MUTEZ,
        value: userInputBaseFee,
        setValue: setUserInputBaseFee,
      },
      {
        label: t('tip'),
        hint: { text: tipInputValidation.text, color: tipInputValidation.textColor },
        unit: GAS_UNIT.MUTEZ,
        value: userInputTip,
        setValue: setUserInputTip,
      },
      {
        label: t('storage_fee'),
        hint: null,
        unit: GAS_UNIT.MUTEZ,
        value: storageFee,
        setValue: () => {},
      },
      {
        //storageLimit은 어떻게 쓰이는지 받아서 밸리데이션 처리 나중에해주고 지금은 보여주기만
        label: t('storage_limit'),
        hint: null,
        unit: GAS_UNIT.MUTEZ,
        value: storageLimit,
        setValue: () => {},
      },
    ];
  }, [baseFeeInputValidation, tipInputValidation, userInputBaseFee, userInputTip, storageFee]);

  //버튼활성화여부를 판단합니다.
  const onConfirmValid = useMemo(() => {
    switch (advanced) {
      case true:
        return isValidInput && !!baseFee && !!leveledTip;
      case false:
        return isValidInput && baseFeeInputValidation.status && tipInputValidation.status;
    }
  }, [baseFee, leveledTip, baseFeeInputValidation.status, tipInputValidation.status]);

  //버튼을 눌렀을때 실행하는 함수입니다.
  //부모로부터 받은 트랜잭션을 실행할 함수를 감싸서 가스비를 주입해주는 함수입니다.
  const wrappedOnConfirm = () => {
    gasLogger.log('press gas confirm: ', 'to:', to, 'value:', value?.toString(10), 'transferParam:', transferParam);
    if (!onConfirmValid || !to) {
      gasLogger.error('gas is not ready or to doesn`t exist! ');
      return;
    }
    gasLogger.log('final gas is: ', 'fee:', total?.toString(10));
    const amount = value ? +formatBigNumber(value, TEZOS_TOKEN_LIST[0].decimals).toString(10) : null;
    const fee = total ? total.toNumber() : null;

    if (tokenDto.contractAddress) {
      onConfirm({ ...transferParam, fee });
    } else {
      onConfirm({ to, amount, fee });
    }
  };

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

export default useTezosGas;
