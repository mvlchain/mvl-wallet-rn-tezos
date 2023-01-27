import { useEffect, useRef, useState } from 'react';

import { useTranslation } from 'react-i18next';
import crypto from 'react-native-quick-crypto';
import TouchID from 'react-native-touch-id';

import { AUTH_STAGE } from '@@constants/authStage.constant';
import { PIN_MODE, PIN_REQUIRE_LENGTH, PIN_STEP } from '@@constants/pin.constant';
import { TOAST_TYPE } from '@@constants/toastConfig.constant';
import { useDi } from '@@hooks/useDi';
import useToast from '@@hooks/useToast';
import LegacyAuthManager from '@@store/LegacyAuthManager';
import authPersistStore from '@@store/auth/authPersistStore';
import { pinStore } from '@@store/pin/pinStore';
import SecureKeychain, { SECURE_TYPES } from '@@utils/SecureKeychain';

function usePin() {
  const keyClient = useDi('KeyClient');
  const authService = useDi('AuthService');
  const { stage, setStage } = authPersistStore();
  const [input, setInput] = useState('');
  const [inputCheck, setInputCheck] = useState('');
  const [visible, setVisible] = useState(true);
  const preSuccessCallbackRef = useRef<(input: string) => Promise<void> | undefined>();
  const { pinMode, error, step, setState, success, resetStore } = pinStore();
  const { t } = useTranslation();
  const { showToast } = useToast();

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
      case PIN_MODE.LEGACY_AUTH_MIGRATION:
        await checkLegacyAuthMigration();
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
      setTimeout(() => {
        setInput('');
      }, 500);
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
        if (preSuccessCallbackRef.current) {
          await preSuccessCallbackRef.current(input);
          showToast(TOAST_TYPE.BASIC, t('password_pin_changed'), { visibilityTime: 5500 });
        }

        success(input);
        setState({ step: PIN_STEP.FINISH });
      } else {
        setState({ error: { message: t('password_pin_not_match') } });
        setInput('');
      }
    }
  };

  const checkLegacyAuthMigration = async () => {
    const legacyPin = await LegacyAuthManager.getPIN();
    if (legacyPin.length === 6) {
      // ios, plain pinCode
      if (legacyPin !== input) {
        // should make user to re-enter pincode
        // throw new Error(`plain pincode mismatch: ${legacyPin} !== ${pinCode}}`);
        setState({ error: { message: t('password_wrong_pin') } });
        setTimeout(() => {
          setInput('');
        }, 500);
        return;
      }
    } else if (legacyPin.length > 6) {
      // android, hashed pinCode
      const hashed = crypto.createHash('sha512').update(input).digest('hex');
      if (legacyPin.toLowerCase() !== hashed.toLowerCase()) {
        // should make user to re-enter pincode
        // throw new Error(`hashed pincode mismatch: ${input}, ${legacyPin} !== ${hashed}`);
        setState({ error: { message: t('password_wrong_pin') } });
        setTimeout(() => {
          setInput('');
        }, 500);
        return;
      }
    } else {
      // throw new Error(`unexpected PIN length: ${legacyPin.length}`);
      setState({ error: { message: t('password_wrong_pin') } });
      setTimeout(() => {
        setInput('');
      }, 500);
      return;
    }

    await SecureKeychain.setGenericPassword(input, SECURE_TYPES.REMEMBER_ME);
    success(input);
    setState({ step: PIN_STEP.FINISH });
  };

  const bioAuth = () => {
    if (!TouchID) return;
    //TODO: setting 에서 바꿀때 TouchID.isSupported 묻기
    TouchID.authenticate(t('enable_touchid'))
      .then(async () => {
        const credential = await SecureKeychain.getGenericPassword();
        if (!credential?.password) {
          throw new Error('need to set up pin');
        }
        success(credential.password);
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

  const reset = async () => {
    setVisible(false);
    const callback = await authService.resetPinOnScreen();
    setVisible(true);
    if (!callback) {
      console.log('can not reset');
      return;
    }
    preSuccessCallbackRef.current = callback;
  };

  return {
    current: input.length,
    bioAuth,
    setPassword,
    backSpace,
    reset,
    visible,
  };
}

export default usePin;
