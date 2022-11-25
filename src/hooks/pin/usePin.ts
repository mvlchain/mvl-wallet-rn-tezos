import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import TouchID from 'react-native-touch-id';

import { AUTH_STAGE } from '@@constants/authStage.constant';
import { PIN_MODE, PIN_STEP, PIN_REQUIRE_LENGTH } from '@@constants/pin.constant';
import { useDi } from '@@hooks/useDi';
import authPersistStore from '@@store/auth/authPersistStore';
import { pinStore } from '@@store/pin/pinStore';
import SecureKeychain, { SECURE_TYPES } from '@@utils/SecureKeychain';

function usePin() {
  const keyClient = useDi('KeyClient');
  const { stage, setStage } = authPersistStore();
  const [input, setInput] = useState('');
  const [inputCheck, setInputCheck] = useState('');
  const { pinMode, error, step, setState, success, resetStore } = pinStore();
  const { t } = useTranslation();

  useEffect(() => {
    return () => resetStore();
  }, []);

  useEffect(() => {
    if (input.length < 6) return;
    check();
  }, [input]);

  useEffect(() => {
    const isFinish = step === PIN_STEP.FINISH;
    if (!error || isFinish) return;
    setState({ showError: true });
    setTimeout(() => {
      setState({ showError: false });
    }, 800);
  }, [error]);

  const check = async () => {
    switch (pinMode) {
      case PIN_MODE.CONFIRM:
        await checkConfirm();
        break;
      case PIN_MODE.SETUP:
        await checkSetUp();
        break;
      case PIN_MODE.RESET:
        await checkSetUp();
        break;
      default:
        break;
    }
  };

  const checkConfirm = async () => {
    const credential = await SecureKeychain.getGenericPassword();
    if (input === credential?.password) {
      success(input);
      setState({ step: PIN_STEP.FINISH });
    } else {
      setState({ error: { message: t('password_wrong_pin') } });
      setInput('');
    }
  };

  const checkSetUp = async () => {
    if (step === PIN_STEP.ENTER) {
      setState({ step: PIN_STEP.REENTER });
      setInput('');
    } else {
      if (input === inputCheck) {
        await SecureKeychain.setGenericPassword(input, SECURE_TYPES.REMEMBER_ME);
        const _postboxKey = keyClient?.postboxKeyHolder?.postboxKey;
        if (!_postboxKey) {
          throw new Error('postboxkey is required');
        }
        if (stage[_postboxKey] === AUTH_STAGE.PIN_SETUP_STAGE) {
          setStage(_postboxKey, AUTH_STAGE.BACKUP_SEED_PHRASE_STAGE);
        }
        success(input);
        setState({ step: PIN_STEP.FINISH });
      } else {
        setState({ error: { message: t('password_pin_not_match') } });
        setInput('');
      }
    }
  };

  const bioAuth = () => {
    if (!TouchID) return;
    //TODO: setting 에서 바꿀때 TouchID.isSupported 묻기
    TouchID.authenticate(t('enable_touchid'))
      .then(() => {
        success(input);
        setState({ step: PIN_STEP.FINISH });
      })
      .catch(() => {});
  };

  const setPassword = async (num: string) => {
    if (!(input.length < PIN_REQUIRE_LENGTH)) return;
    if (input.length === PIN_REQUIRE_LENGTH - 1 && step !== PIN_STEP.REENTER) {
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
