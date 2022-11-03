import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import TouchID from 'react-native-touch-id';

import { PIN_MODE, PIN_SETUP_STAGE, PIN_REQUIRE_LENGTH } from '@@constants/pin.constant';
import { pinStore } from '@@store/pin/pinStore';
import SecureKeychain, { SECURE_TYPES } from '@@utils/SecureKeychain';

function usePin() {
  const [input, setInput] = useState('');
  const [inputCheck, setInputCheck] = useState('');
  const { pinMode, showError, error, stage, setState, success } = pinStore();
  const { t } = useTranslation();

  useEffect(() => {
    check();
  }, [input]);

  useEffect(() => {
    if (!error) return;
    setState({ showError: true });
    setTimeout(() => {
      setState({ showError: false });
    }, 800);
  }, [error]);

  const check = async () => {
    if (input.length < 6) return;
    switch (pinMode) {
      case PIN_MODE.CONFIRM:
        const credential = await SecureKeychain.getGenericPassword();
        if (input === credential?.password) {
          success(input);
          setState({ pinMode: PIN_MODE.SUCCESS });
        } else {
          setState({ error: { message: t('password_wrong_pin') } });
        }
        break;
      case PIN_MODE.SETUP:
        if (stage === PIN_SETUP_STAGE.FIRST) {
          setState({ stage: PIN_SETUP_STAGE.SECOND });
        } else {
          if (input === inputCheck) {
            await SecureKeychain.setGenericPassword(input, SECURE_TYPES.REMEMBER_ME);
            success(input);
            setState({ pinMode: PIN_MODE.SUCCESS });
          } else {
            setState({ error: { message: t('password_pin_not_match') } });
          }
        }
        break;
      case PIN_MODE.RESET:
        break;
      default:
        break;
    }
    setInput('');
  };

  const bioAuth = () => {
    if (!TouchID) return;
    //TODO: setting 에서 바꿀때 TouchID.isSupported 묻기
    TouchID.authenticate(t('enable_touchid'))
      .then(() => {
        success(input);
        setState({ pinMode: PIN_MODE.SUCCESS });
      })
      .catch(() => {});
  };

  const setPassword = async (num: string) => {
    if (!(input.length < PIN_REQUIRE_LENGTH)) return;
    if (input.length === PIN_REQUIRE_LENGTH - 1 && stage !== PIN_SETUP_STAGE.SECOND) {
      setInputCheck(input + num);
    }
    setInput(input + num);
  };

  const backSpace = () => {
    if (input.length === 0) return;
    setInput(input.slice(0, -1));
  };

  return {
    current: input.length,
    bioAuth,
    setPassword,
    backSpace,
  };
}

export default usePin;
