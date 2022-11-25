import { useEffect } from 'react';

import { BackHandler } from 'react-native';

import { AUTH_MODAL_NAME } from '@@constants/authModal.constant';
import { AUTH_STAGE } from '@@constants/authStage.constant';
import { useDi } from '@@hooks/useDi';
import { authModalStore } from '@@store/auth/authModalStore';
import authPersistStore from '@@store/auth/authPersistStore';

const useTermsOfServicesModal = () => {
  const keyClient = useDi('KeyClient');
  const { isOpen, open, close } = authModalStore();
  const { setStage } = authPersistStore();
  const interruption = () => {
    close(AUTH_MODAL_NAME.TOS);
    return true; //for backhandler function type
  };

  useEffect(() => {
    if (!isOpen.tos) {
      return;
    }
    const backHandler = BackHandler.addEventListener('hardwareBackPress', interruption);
    return () => backHandler.remove();
  }, [isOpen.tos]);

  const onPressAgree = () => {
    /**
     * TODO: postboxkey없을 때 예외처리
     */
    const _postboxkey = keyClient.postboxKeyHolder?.postboxKey;
    if (!_postboxkey) {
      throw new Error('postboxkey is required!');
    }

    setStage(_postboxkey, AUTH_STAGE.PIN_SETUP_STAGE);
    open(AUTH_MODAL_NAME.GUIDE);
  };

  return {
    isOpen,
    onPressAgree,
    interruption,
  };
};

export default useTermsOfServicesModal;
