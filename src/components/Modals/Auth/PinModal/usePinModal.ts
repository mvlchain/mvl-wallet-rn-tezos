import { useEffect } from 'react';

import { BackHandler } from 'react-native';

import { AUTH_MODAL_NAME } from '@@constants/authModal.constant';
import { authModalStore } from '@@store/auth/authModalStore';

const usePinModal = () => {
  const { isOpen, close } = authModalStore();

  const interruption = () => {
    close(AUTH_MODAL_NAME.PIN);
    return true; //for backhandler function type
  };

  useEffect(() => {
    if (!isOpen.pin) return;
    close(AUTH_MODAL_NAME.PIN);
    const backHandler = BackHandler.addEventListener('hardwareBackPress', interruption);
    return () => backHandler.remove();
  }, [isOpen.pin]);

  return {
    isOpen,
    close,
    interruption,
  };
};

export default usePinModal;
