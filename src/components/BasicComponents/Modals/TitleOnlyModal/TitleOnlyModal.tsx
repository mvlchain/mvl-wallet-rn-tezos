import React from 'react';

import { ModalLayout } from '@@components/BasicComponents/Modals/BaseModal/ModalLayout';
import globalModalStore from '@@store/globalModal/globalModalStore';

import { MODAL_TYPES } from '../GlobalModal';

function TitleOnlyModal({ title }: { title: string }) {
  const { closeModal, modalType } = globalModalStore();
  return <ModalLayout title={title} onConfirm={closeModal} isVisible={modalType === MODAL_TYPES.TITLE_ONLY} modalPosition={'center'} />;
}

export default TitleOnlyModal;
