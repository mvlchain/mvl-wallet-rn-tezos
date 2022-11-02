import { useState, useEffect } from 'react';

import { BackHandler } from 'react-native';

import { AUTH_STAGE } from '@@constants/authStage.constant';
import { useDi } from '@@hooks/common/useDi';
import authPersistStore from '@@store/auth/authPersistStore';
import { pinStore } from '@@store/pin/pinStore';
import SecureKeychain, { SECURE_TYPES } from '@@utils/SecureKeychain';

function usePincodeModal() {
  const keyClient = useDi('KeyClient');
  const { isOpen, mode, close, success, fail } = pinStore();
  const { stage, setStage } = authPersistStore();
  const [pin, setPin] = useState('');

  const initialSave = async (pin: string) => {
    try {
      await SecureKeychain.setGenericPassword(pin, SECURE_TYPES.REMEMBER_ME);
    } catch (err: any) {
      console.log('keycahin set password error' + err.message);
    }
  };

  const getStoredPin = async () => {
    try {
      const credential = await SecureKeychain.getGenericPassword();
      if (!credential) return;
      setPin(credential.password);
    } catch (err: any) {
      console.error('keycahin get password error: ' + err.message, err);
    }
  };

  const whenMatch = async (pin: string | undefined) => {
    if (!pin) return;
    /**
     * TODO: postboxkey없을 때 예외처리
     */
    const _postboxKey = keyClient?.postboxKeyHolder?.postboxKey;
    if (!_postboxKey) {
      throw new Error('postboxkey is required');
    }
    if (stage[_postboxKey] === AUTH_STAGE.PIN_SETUP_STAGE) {
      setStage(_postboxKey, AUTH_STAGE.BACKUP_SEED_PHRASE_STAGE);
    }
    success(pin);
    close();
  };

  const interruption = () => {
    fail('fail');
    close();
    return true; //for backhandler function type
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', interruption);
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    getStoredPin();
  }, [pin]);

  return {
    isOpen,
    mode,
    pin,
    interruption,
    whenMatch,
    initialSave,
  };
}

export default usePincodeModal;
