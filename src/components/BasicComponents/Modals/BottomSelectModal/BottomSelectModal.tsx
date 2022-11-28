import React from 'react';

import { ModalLayout } from '@@components/BasicComponents/Modals/BaseModal/ModalLayout';
import globalModalStore from '@@store/globalModal/globalModalStore';

import { MODAL_TYPES } from '../GlobalModal';

import BottomSelectMenu from './BottomSelectMenu';
import { IBottomSelectModalProps } from './BottomSelectModal.type';
function BottomSelectModal({ modalTitle, menuList }: IBottomSelectModalProps) {
  const { modalType, closeModal } = globalModalStore();

  return (
    <ModalLayout
      title={modalTitle}
      modalPosition='bottom'
      isVisible={modalType === MODAL_TYPES.BOTTOM_SELECT}
      onClose={() => {
        closeModal();
      }}
    >
      {menuList.map((props) => (
        <BottomSelectMenu
          key={props.id}
          {...props}
          onPress={() => {
            closeModal();
            props.onPress();
          }}
        />
      ))}
    </ModalLayout>
  );
}

export default BottomSelectModal;
