import React from 'react';

import { BaseModal } from '@@components/BasicComponents/Modals/BaseModal';
import globalModalStore from '@@store/globalModal/globalModalStore';

import { MODAL_TYPES } from '../GlobalModal';

import BottomSelectMenu from './BottomSelectMenu';
import { IBottomSelectModalProps } from './BottomSelectModal.type';
function BottomSelectModal({ modalTitle, menuList }: IBottomSelectModalProps) {
  const { modalType, closeModal } = globalModalStore();

  return (
    <BaseModal
      title={modalTitle}
      modalPosition='bottom'
      isVisible={modalType === MODAL_TYPES.BOTTOM_SELECT}
      onClose={() => {
        closeModal();
      }}
    >
      {menuList.map((props) => (
        <BottomSelectMenu
          {...props}
          onPress={() => {
            props.onPress();
            closeModal();
          }}
        />
      ))}
    </BaseModal>
  );
}

export default BottomSelectModal;
