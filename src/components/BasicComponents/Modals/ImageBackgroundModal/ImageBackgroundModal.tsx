import React from 'react';

import { useTranslation } from 'react-i18next';
import Modal from 'react-native-modal';

import { CloseBlackIconLight, CloseBlackIconDark } from '@@assets/image';
import { PrimaryButton, SecondaryButton } from '@@components/BasicComponents/Buttons/BaseButton';
import { THEME } from '@@constants/setting.constant';
import { useAssetFromTheme } from '@@hooks/useTheme';
import globalModalStore from '@@store/globalModal/globalModalStore';
import settingPersistStore from '@@store/setting/settingPersistStore';
import { SCREEN_WIDTH, width } from '@@utils/ui';

import * as MS from '../BaseModal/Modal.style';
import { MODAL_TYPES } from '../GlobalModal';

import * as S from './ImageBackgroundModal.style';
import { IImageBackgroundModalProps } from './ImageBackgroundModal.type';

function ImageBackgroundModal({
  title,
  description,
  Image,
  modalPosition,
  onConfirm,
  confirmLabel,
  onClose,
  onCancel,
  cancelLabel,
}: IImageBackgroundModalProps) {
  const { t } = useTranslation();
  const { modalType, closeModal } = globalModalStore();
  const { appTheme } = settingPersistStore();
  const CloseIcon = useAssetFromTheme(CloseBlackIconLight, CloseBlackIconDark);
  return (
    <Modal
      isVisible={modalType === MODAL_TYPES.IMAGE_BACKGROUND}
      backdropOpacity={appTheme.displayName === THEME.LIGHT || appTheme.displayName === THEME.DEFAULT ? 0.25 : 1}
      backdropColor={MS.BackdropColor[appTheme.value]}
      style={MS.inlineStyles(modalPosition).modal}
      onBackButtonPress={closeModal}
      onBackdropPress={closeModal}
      avoidKeyboard={true}
    >
      <MS.ModalContentWrapper modalPosition={modalPosition}>
        <MS.ModalBackDrop onPress={closeModal} />
        <S.Container modalPosition={modalPosition}>
          <S.ImageContainer>
            <Image width={'100%'} />
            <MS.ImageModalTopWrapper>
              <MS.ImageModalTitle>{title}</MS.ImageModalTitle>
              {!!onClose && <CloseBlackIconDark onPress={() => onClose()} />}
            </MS.ImageModalTopWrapper>
            <S.ContentContainer>
              <S.Description>{description}</S.Description>
            </S.ContentContainer>
          </S.ImageContainer>
          <MS.ImageModalContainer modalPosition={modalPosition}>
            {!!onConfirm && (
              <MS.ButtonWrapper>
                {!!onCancel && (
                  <SecondaryButton label={cancelLabel} onPress={onCancel} disabled={false} wrapperStyle={MS.inlineStyles(modalPosition).halfbutton} />
                )}
                {!!onCancel && <MS.Gap />}
                <PrimaryButton label={confirmLabel} onPress={onConfirm} disabled={false} wrapperStyle={MS.inlineStyles(modalPosition).halfbutton} />
              </MS.ButtonWrapper>
            )}
          </MS.ImageModalContainer>
        </S.Container>
      </MS.ModalContentWrapper>
    </Modal>
  );
}

export default ImageBackgroundModal;
