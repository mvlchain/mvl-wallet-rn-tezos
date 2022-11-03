import { useEffect } from 'react';

import { BackHandler } from 'react-native';

import { AUTH_MODAL_NAME } from '@@constants/authModal.constant';
import { PIN_MODE } from '@@constants/pin.constant';
import { authModalStore } from '@@store/auth/authModalStore';
import { pinStore } from '@@store/pin/pinStore';

const usePinModal = () => {
  const { isOpen, close } = authModalStore();
  const { pinMode } = pinStore();
  const interruption = () => {
    close(AUTH_MODAL_NAME.PIN);
    return true; //for backhandler function type
  };

  useEffect(() => {
    if (!isOpen.pin) return;
    close(AUTH_MODAL_NAME.GUIDE);
    const backHandler = BackHandler.addEventListener('hardwareBackPress', interruption);
    return () => backHandler.remove();
  }, [isOpen.pin]);

  useEffect(() => {
    const isFinish = pinMode === PIN_MODE.SUCCESS || pinMode === PIN_MODE.FAIL;
    if (!isFinish) return;
    close(AUTH_MODAL_NAME.PIN);
  }, [pinMode]);

  return {
    isOpen,
    close,
    interruption,
  };
};

export default usePinModal;
