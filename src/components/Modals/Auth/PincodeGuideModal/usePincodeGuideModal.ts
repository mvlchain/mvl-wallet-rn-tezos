import { useEffect } from 'react';

import { BackHandler } from 'react-native';

import { AUTH_MODAL_NAME } from '@@constants/authModal.constant';
import { authModalStore } from '@@store/pin/pinStore';

const usePincodeGuideModal = () => {
  const { isOpen, close } = authModalStore();

  const interruption = () => {
    close(AUTH_MODAL_NAME.GUIDE);
    return true; //for backhandler function type
  };

  useEffect(() => {
    if (!isOpen.guide) {
      return;
    }
    close(AUTH_MODAL_NAME.TOS);
    const backHandler = BackHandler.addEventListener('hardwareBackPress', interruption);
    return () => backHandler.remove();
  }, [isOpen.guide]);

  return {
    isOpen,
    close,
    interruption,
  };
};

export default usePincodeGuideModal;
