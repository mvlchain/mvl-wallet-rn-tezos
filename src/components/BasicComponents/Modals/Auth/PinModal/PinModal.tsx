import React from 'react';

import { Modal } from 'react-native';

import LoadingIndicator from '@@components/BasicComponents/LoadingIndicator';
import PinLayout from '@@components/BasicComponents/Pin/PinLayout/PinLayout';

import * as S from './PinModal.style';
import usePinModal from './usePinModal';

function PinModal() {
  const { isOpen, interruption } = usePinModal();

  return (
    <Modal visible={isOpen.pin} onRequestClose={interruption}>
      <S.ModalContentWrapper>
        <LoadingIndicator />
        <PinLayout back={interruption} />
      </S.ModalContentWrapper>
    </Modal>
  );
}

export default PinModal;
