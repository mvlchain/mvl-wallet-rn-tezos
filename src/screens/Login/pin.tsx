import React, { useState, useEffect } from 'react';

import PINCode from '@haskkor/react-native-pincode';
import { Modal, BackHandler } from 'react-native';

import { usePinStore } from '@@store/pin';

import SecureKeychain, { SECURE_TYPES } from '../../utils/SecureKeychain';

export default function PinModal() {
  const { isOpen, mode, close, success, fail } = usePinStore();
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

  return (
    <Modal visible={isOpen} onRequestClose={interruption}>
      <PINCode
        status={mode}
        delayBetweenAttempts={1500}
        passwordLength={6}
        storePin={initialSave}
        storedPin={pin}
        finishProcess={whenMatch}
        touchIDDisabled={false}
      />
    </Modal>
  );
}
