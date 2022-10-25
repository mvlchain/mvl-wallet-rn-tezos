import React from 'react';

import { Modal } from 'react-native';

import { PrimaryButton } from '@@components/BasicComponents/Buttons/BaseButton';
import { AUTH_MODAL_NAME } from '@@constants/authModal.constant';

import useTermsOfServicesModal from './useTermsOfServicesModal';

function TermsOfServicesModal() {
  const { isOpen, open, interruption } = useTermsOfServicesModal();

  return (
    <Modal visible={isOpen.tos} onRequestClose={interruption}>
      <PrimaryButton
        onPress={() => {
          open(AUTH_MODAL_NAME.GUIDE);
        }}
        label='agree'
      />
    </Modal>
  );
}

export default TermsOfServicesModal;
