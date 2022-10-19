import React from 'react';

import { TMyTheme } from 'App.type';
import Modal from 'react-native-modal';

import { CloseBlackIconLight } from '@@assets/image';
import { PrimaryButton, SecondaryButton } from '@@components/BasicComponents/Buttons/BaseButton';
import { THEME } from '@@constants/setting.constant';
import globalModalStore from '@@store/globalModal/globalModalStore';
import settingPersistStore from '@@store/setting/settingPersistStore';

import * as S from './Modal.style';
import * as Type from './Modal.type';

export function BaseModal({ title, children, onCancel, onConfirm, onClose, isVisible, modalPosition }: Type.IBaseModalComponentProps) {
  const { closeModal } = globalModalStore();
  const { settedTheme } = settingPersistStore();
  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={settedTheme === THEME.LIGHT || settedTheme === THEME.DEFAULT ? 0.25 : 1}
      backdropColor={S.BackdropColor[settedTheme as TMyTheme]}
      style={S.inlineStyles(modalPosition).modal}
      onBackButtonPress={closeModal}
      onBackdropPress={closeModal}
    >
      <S.ModalContainer modalPosition={modalPosition}>
        <S.ModalTopWrapper>
          <S.ModalTitle>{title}</S.ModalTitle>
          {/* TODO: theme 스토어추가시 추가작업 */}
          {!!onClose && <CloseBlackIconLight onPress={onClose} />}
        </S.ModalTopWrapper>
        <S.ContentWrapper>{children}</S.ContentWrapper>
        {!!onConfirm && (
          <S.ButtonWrapper>
            {!!onCancel && (
              <SecondaryButton label={'cancel'} onPress={onCancel} disabled={false} wrapperStyle={S.inlineStyles(modalPosition).halfbutton} />
            )}
            {!!onCancel && <S.Gap />}
            <PrimaryButton label={'confirm'} onPress={onConfirm} disabled={false} wrapperStyle={S.inlineStyles(modalPosition).halfbutton} />
          </S.ButtonWrapper>
        )}
      </S.ModalContainer>
    </Modal>
  );
}
