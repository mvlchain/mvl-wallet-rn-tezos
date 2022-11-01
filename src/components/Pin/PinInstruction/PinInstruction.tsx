import { useEffect } from 'react';

import { useTranslation } from 'react-i18next';

import { PIN_MODE } from '@@constants/pin.constant';
import usePin from '@@hooks/pin/usePin';
import { pinStore } from '@@store/pin/pinStore';

import { Instruction } from './PinInstruction.style';

function PinInstruction() {
  const { t } = useTranslation();
  const { isError, errorMessage, step } = usePin();
  const { pinMode } = pinStore();
  const defaultInstruction = t('password_enter_pin');
  const whenSetupCheck = pinMode === PIN_MODE.SETUP && step === 2;

  useEffect(() => {}, [isError]);

  const showError = () => {};

  return <Instruction>{defaultInstruction}</Instruction>;
}

export default PinInstruction;
