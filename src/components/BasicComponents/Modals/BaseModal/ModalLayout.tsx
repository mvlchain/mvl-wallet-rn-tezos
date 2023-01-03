import React from 'react';

import { useTranslation } from 'react-i18next';
import Modal from 'react-native-modal';

import { CloseBlackIconLight, CloseBlackIconDark } from '@@assets/image';
import { PrimaryButton, SecondaryButton } from '@@components/BasicComponents/Buttons/BaseButton';
import DismissKeyboardView from '@@components/BasicComponents/DismissKeyboardView';
import { THEME } from '@@constants/setting.constant';
import { useAssetFromTheme } from '@@hooks/useTheme';
import globalModalStore from '@@store/globalModal/globalModalStore';
import settingPersistStore from '@@store/setting/settingPersistStore';

import * as S from './Modal.style';
import * as Type from './Modal.type';

export function ModalLayout({
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
  maxHeight,
  isReverseBtn = false,
}: Type.IModalLayoutComponentProps) {
  const { t } = useTranslation();
  const { closeModal } = globalModalStore();
  const { appTheme } = settingPersistStore();
  const CloseIcon = useAssetFromTheme(CloseBlackIconLight, CloseBlackIconDark);
  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={appTheme.displayName === THEME.LIGHT || appTheme.displayName === THEME.DEFAULT ? 0.25 : 1}
      backdropColor={S.BackdropColor[appTheme.value]}
      style={S.inlineStyles(modalPosition).modal}
      onBackButtonPress={closeModal}
      onBackdropPress={closeModal}
      avoidKeyboard={true}
    >
      <DismissKeyboardView>
        <S.ModalContentWrapper modalPosition={modalPosition}>
          <S.ModalBackDrop onPress={closeModal} />
          <S.ModalContainer modalPosition={modalPosition} maxHeight={maxHeight}>
            <S.ModalTopWrapper>
              <S.ModalTitle>{title}</S.ModalTitle>
              {/* TODO: theme 스토어추가시 추가작업 */}
              {!!onClose && <CloseIcon onPress={() => onClose()} />}
            </S.ModalTopWrapper>

            {children && <S.ContentWrapper>{children}</S.ContentWrapper>}
            {!!onConfirm && (
              <S.ButtonWrapper isReverseBtn={isReverseBtn}>
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
        </S.ModalContentWrapper>
      </DismissKeyboardView>
    </Modal>
  );
}
