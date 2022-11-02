import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import TouchID from 'react-native-touch-id';

import { PIN_MODE, PIN_SETUP_STAGE, PIN_REQUIRE_LENGTH } from '@@constants/pin.constant';
import { pinStore } from '@@store/pin/pinStore';
import SecureKeychain, { SECURE_TYPES } from '@@utils/SecureKeychain';

function usePin() {
  const [input, setInput] = useState('');
  const [inputCheck, setInputCheck] = useState('');
  const { pinMode, stage, current, setState, success, resetStore } = pinStore();
  const { t } = useTranslation();
  const isSetupFirstStage = pinMode === PIN_MODE.SETUP && stage === PIN_SETUP_STAGE.FIRST;

  useEffect(() => {
    setInputCheck(input);
  }, [isSetupFirstStage && input.length === 6]);

  const judge = async () => {
    switch (pinMode) {
      case PIN_MODE.CONFIRM:
        const credential = await SecureKeychain.getGenericPassword();
        if (input === credential?.password) {
          success(input);
          resetStore();
        } else {
          setState({ isError: true, errorMessage: t('password_wrong_pin') });
        }
        break;
      case PIN_MODE.SETUP:
        if (stage === PIN_SETUP_STAGE.FIRST) {
          setState({ stage: PIN_SETUP_STAGE.SECOND });
        } else {
          if (input === inputCheck) {
            await SecureKeychain.setGenericPassword(input, SECURE_TYPES.REMEMBER_ME);
            success(input);
            resetStore();
          } else {
            setState({ isError: true, errorMessage: t('password_pin_not_match') });
          }
        }
        break;
      case PIN_MODE.RESET:
        break;
      default:
        break;
    }
    setInput('');
    setState({ current: 0 });
  };

  const backSpace = () => {
    if (current === 0) return;
    setInput(input.slice(0, -1));
    setState({
      current: current - 1,
    });
  };

  const bioAuth = async () => {
    if (!TouchID) return;
    try {
      const isSupported = await TouchID.isSupported();
      if (!isSupported) {
        console.log(t('biometric_not_available'));
        return;
      }
      TouchID.authenticate(t('enable_touchid')).then(success(input));
    } catch (err) {
      console.log(err);
    }
  };

  const setPassword = async (num: string) => {
    const isFinishInput = current === PIN_REQUIRE_LENGTH;
    if (isFinishInput) {
      await judge();
    } else {
      setInput(input + num);
      setState({ current: current + 1 });
    }
  };

  return {
    input,
    backSpace,
    bioAuth,
    setPassword,
  };
}

export default usePin;
