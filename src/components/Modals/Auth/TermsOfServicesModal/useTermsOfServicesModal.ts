import { useEffect } from 'react';

import { BackHandler } from 'react-native';

import { AUTH_MODAL_NAME } from '@@constants/authModal.constant';
import { authModalStore } from '@@store/pin/pinStore';

const useTermsOfServicesModal = () => {
  const { isOpen, open, close } = authModalStore();

  const interruption = () => {
    close(AUTH_MODAL_NAME.TOS);
    return true; //for backhandler function type
  };

  useEffect(() => {
    if (!isOpen.tos) return;
    const backHandler = BackHandler.addEventListener('hardwareBackPress', interruption);
    return () => backHandler.remove();
  }, [isOpen.tos]);

  return {
    isOpen,
    open,
    interruption,
  };
};

export default useTermsOfServicesModal;
