import React from 'react';

import { useTranslation } from 'react-i18next';
import Modal from 'react-native-modal';

import { CloseBlackIconLight, CloseBlackIconDark } from '@@assets/image';
import { PrimaryButton, SecondaryButton } from '@@components/BasicComponents/Buttons/BaseButton';
import { THEME } from '@@constants/setting.constant';
import { useAssetFromTheme } from '@@hooks/common/useTheme';
import globalModalStore from '@@store/globalModal/globalModalStore';
import settingPersistStore from '@@store/setting/settingPersistStore';

import * as S from './Modal.style';
import * as Type from './Modal.type';

export function BaseModal({
  title,
  children,
  onCancel,
  onConfirm,
  confirmLabel,
  onClose,
  cancelLabel,
  isVisible,
  isConfirmDisabled,
  modalPosition,
}: Type.IBaseModalComponentProps) {
  const { t } = useTranslation();
  const { closeModal } = globalModalStore();
  const { appTheme } = settingPersistStore();
  const CloseIcon = useAssetFromTheme(CloseBlackIconLight, CloseBlackIconDark);
  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={appTheme.value === THEME.LIGHT || appTheme.value === THEME.DEFAULT ? 0.25 : 1}
      backdropColor={S.BackdropColor[appTheme.label]}
      style={S.inlineStyles(modalPosition).modal}
      onBackButtonPress={closeModal}
      onBackdropPress={closeModal}
    >
      <S.ModalBackDrop modalPosition={modalPosition}>
        <S.ModalContainer modalPosition={modalPosition}>
          <S.ModalTopWrapper>
            <S.ModalTitle>{title}</S.ModalTitle>
            {/* TODO: theme 스토어추가시 추가작업 */}
            {!!onClose && <CloseIcon onPress={() => onClose()} />}
          </S.ModalTopWrapper>
          <S.ContentWrapper>{children}</S.ContentWrapper>
          {!!onConfirm && (
            <S.ButtonWrapper>
              {!!onCancel && (
                <SecondaryButton
                  label={cancelLabel ? cancelLabel : t('close')}
                  onPress={onCancel}
                  disabled={false}
                  wrapperStyle={S.inlineStyles(modalPosition).halfbutton}
                />
              )}
              {!!onCancel && <S.Gap />}
              <PrimaryButton
                label={confirmLabel ? confirmLabel : t('btn_confirm')}
                onPress={onConfirm}
                disabled={isConfirmDisabled}
                wrapperStyle={S.inlineStyles(modalPosition).halfbutton}
              />
            </S.ButtonWrapper>
          )}
        </S.ModalContainer>
      </S.ModalBackDrop>
    </Modal>
  );
}
