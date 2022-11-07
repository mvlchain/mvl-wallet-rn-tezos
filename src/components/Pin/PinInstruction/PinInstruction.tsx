import { useTranslation } from 'react-i18next';

import { PIN_STEP } from '@@constants/pin.constant';
import { pinStore } from '@@store/pin/pinStore';

import * as S from './PinInstruction.style';

function PinInstruction() {
  const { t } = useTranslation();
  const { pinMode, showError, error, step } = pinStore();
  const additionalLanKey = pinMode === PIN_MODE.RESET ? '_change' : null;
  const instruction = step === PIN_STEP.REENTER ? t(`password_reenter_pin${additionalLanKey}`) : t(`password_enter_pin${additionalLanKey}`);

  return (
    <S.PinInstructionContainer>
      <S.Instruction showError={showError}>{showError ? error?.message : instruction}</S.Instruction>
    </S.PinInstructionContainer>
  );
}

export default PinInstruction;
