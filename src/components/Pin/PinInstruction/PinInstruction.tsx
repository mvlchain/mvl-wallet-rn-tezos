import { useTranslation } from 'react-i18next';

import { PIN_STEP } from '@@constants/pin.constant';
import { pinStore } from '@@store/pin/pinStore';

import * as S from './PinInstruction.style';

function PinInstruction() {
  const { t } = useTranslation();
  const { showError, error, step } = pinStore();
  const instruction = step === PIN_STEP.REENTER ? t('password_reenter_pin') : t('password_enter_pin');

  return (
    <S.PinInstructionContainer>
      <S.Instruction showError={showError}>{showError ? error?.message : instruction}</S.Instruction>
    </S.PinInstructionContainer>
  );
}

export default PinInstruction;
