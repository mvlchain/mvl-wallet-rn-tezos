import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { PIN_STEP, PIN_MODE } from '@@constants/pin.constant';
import { pinStore } from '@@store/pin/pinStore';

import * as S from './PinInstruction.style';

function PinInstruction() {
  const { t } = useTranslation();
  const { pinMode, showError, error, step } = pinStore();
  const [instruction, setInstruction] = useState('');

  useEffect(() => {
    if (step === PIN_STEP.FINISH) return;
    const additionalLanKey = pinMode === PIN_MODE.RESET ? '_change' : '';
    const str = step === PIN_STEP.REENTER ? t(`password_reenter_pin${additionalLanKey}`) : t(`password_enter_pin${additionalLanKey}`);
    setInstruction(str);
  }, [step]);

  return (
    <S.PinInstructionContainer>
      <S.Instruction showError={showError}>{showError ? error?.message : instruction}</S.Instruction>
    </S.PinInstructionContainer>
  );
}

export default PinInstruction;
