import React from 'react';

import { useTranslation } from 'react-i18next';
import Modal from 'react-native-modal';

import { CloseBlackIconLight, CloseBlackIconDark } from '@@assets/image';
import { PrimaryButton } from '@@components/BasicComponents/Buttons/BaseButton';
import DismissKeyboardView from '@@components/BasicComponents/DismissKeyboardView';
import { THEME } from '@@constants/setting.constant';
import { useAssetFromTheme } from '@@hooks/useTheme';
import globalModalStore from '@@store/globalModal/globalModalStore';
import settingPersistStore from '@@store/setting/settingPersistStore';

import { MODAL_TYPES } from '../GlobalModal';

import * as S from './ImageBackgroundModal.style';
import { IImageBackgroundModalProps } from './ImageBackgroundModal.type';

function ImageBackgroundModal({ title, description, onConfirm, confirmLabel }: IImageBackgroundModalProps) {
  const { t } = useTranslation();
  const { modalType, closeModal } = globalModalStore();
  const { appTheme } = settingPersistStore();
  const CloseIcon = useAssetFromTheme(CloseBlackIconLight, CloseBlackIconDark);
  return (
    <Modal
      isVisible={modalType === MODAL_TYPES.IMAGE_BACKGROUND}
      backdropOpacity={appTheme.displayName === THEME.LIGHT || appTheme.displayName === THEME.DEFAULT ? 0.25 : 1}
      backdropColor={S.BackdropColor[appTheme.value]}
      style={S.inlineStyles.modal}
      onBackButtonPress={closeModal}
      onBackdropPress={closeModal}
      avoidKeyboard={true}
    >
      <DismissKeyboardView>
        <S.ModalContentWrapper>
          <S.ModalBackDrop onPress={closeModal} />
          <S.ModalContainer>
            <S.ModalTopWrapper>
              <S.ModalTitle>{title}</S.ModalTitle>
              <CloseIcon onPress={closeModal} />
            </S.ModalTopWrapper>

            <S.ContentWrapper>
              <S.ModalTitle>{description}</S.ModalTitle>
            </S.ContentWrapper>

            <PrimaryButton label={confirmLabel ? confirmLabel : t('btn_confirm')} onPress={onConfirm} wrapperStyle={S.inlineStyles.halfbutton} />
          </S.ModalContainer>
        </S.ModalContentWrapper>
      </DismissKeyboardView>
    </Modal>
  );
}

export default ImageBackgroundModal;
