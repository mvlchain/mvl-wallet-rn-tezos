import { useEffect, useRef } from 'react';

import { useTranslation } from 'react-i18next';

import { PIN_SETUP_STAGE } from '@@constants/pin.constant';
import { pinStore } from '@@store/pin/pinStore';

import * as S from './PinInstruction.style';

function PinInstruction() {
  const { t } = useTranslation();
  const { showError, error, stage } = pinStore();
  const instruction = stage === PIN_SETUP_STAGE.SECOND ? t('password_reenter_pin') : t('password_enter_pin');

  return (
    <S.PinInstructionContainer>
      <S.Instruction>{instruction}</S.Instruction>
      <S.ErrorMessage>{error?.message}</S.ErrorMessage>
    </S.PinInstructionContainer>
  );
}

export default PinInstruction;
