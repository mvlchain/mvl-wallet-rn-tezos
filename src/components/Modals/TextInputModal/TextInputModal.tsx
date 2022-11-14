import React, { useState } from 'react';

import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';

import { BaseModal } from '@@components/BasicComponents/Modals/BaseModal';
import { BaseTextField } from '@@components/BasicComponents/TextFields/BaseTextField';
import globalModalStore from '@@store/globalModal/globalModalStore';

import { MODAL_TYPES } from '../GlobalModal';

import { ITextInputModalProps } from './TextInputModal.type';

function TextInputModal({ title, defaultValue, cancelLabel, confirmLabel, onCancel, onConfirm }: ITextInputModalProps) {
  const { modalType, closeModal } = globalModalStore();
  const [value, setValue] = useState(defaultValue ?? '');

  const onChangeInput = (e: NativeSyntheticEvent<TextInputChangeEventData> | string) => {
    if (typeof e === 'string') {
      setValue(e);
    } else {
      const value = e.nativeEvent.text;
      setValue(value);
    }
  };

  return (
    <BaseModal
      title={title}
      modalPosition='center'
      isVisible={modalType === MODAL_TYPES.TEXT_INPUT}
      onConfirm={() => {
        if (!!onConfirm) {
          onConfirm(value);
        }
        closeModal();
      }}
      onCancel={onCancel}
      cancelLabel={cancelLabel}
      confirmLabel={confirmLabel}
      isConfirmDisabled={value.length === 0}
    >
      <BaseTextField value={value} onChange={onChangeInput} type={'search'} />
    </BaseModal>
  );
}

export default TextInputModal;
