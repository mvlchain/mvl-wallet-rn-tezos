import { useState, useEffect } from 'react';

import { BackHandler } from 'react-native';

import { pinStore } from '@@store/pin/pinStore';
import SecureKeychain, { SECURE_TYPES } from '@@utils/SecureKeychain';

function usePincodeModal() {
  const { isOpen, mode, close, success, fail } = pinStore();

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
      console.log('keycahin get password error' + err.message);
    }
  };

  const whenMatch = async (pin: string | undefined) => {
    if (!pin) return;
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
