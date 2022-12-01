import React, { useEffect } from 'react';

import { Modal, BackHandler } from 'react-native';

import PinLayout from '@@components/BasicComponents/Pin/PinLayout/PinLayout';
import globalModalStore from '@@store/globalModal/globalModalStore';

import { MODAL_TYPES } from '../../GlobalModal';
function ConfirmTxPinModal() {
  const { modalType, closeModal } = globalModalStore();

  const interruption = () => {
    closeModal();
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', interruption);

    return () => backHandler.remove();
  }, []);

  return (
    <Modal visible={modalType === MODAL_TYPES.CONFIRM_TX_PIN} onRequestClose={interruption}>
      <PinLayout back={interruption} />
    </Modal>
  );
}

export default ConfirmTxPinModal;
