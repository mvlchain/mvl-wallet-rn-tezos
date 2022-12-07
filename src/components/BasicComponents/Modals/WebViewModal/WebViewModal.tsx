import React from 'react';

import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native';
import Modal from 'react-native-modal';
import WebView from 'react-native-webview';

import { PrimaryButton, SecondaryButton } from '@@components/BasicComponents/Buttons/BaseButton';
import { THEME } from '@@constants/setting.constant';
import settingPersistStore from '@@store/setting/settingPersistStore';

import * as S from './WebViewModal.style';
import { IWebViewModalProps } from './WebViewModal.type';

/**
 * A modal that displays Web contents
 *
 * NOTE!
 * Due to the limitation of WebView, containe of WebView should have `flex: 1` style attributes.
 * Otherwise, WebView won't be drawn.
 */
function WebViewModal({ url, isVisible, onCancel, cancelLabel, onConfirm, confirmLabel, isConfirmDisabled, onBackDropPress }: IWebViewModalProps) {
  const { t } = useTranslation();
  const { appTheme } = settingPersistStore();

  console.log(`WebViewModal> url: ${url}`);

  return (
    <Modal
      style={S.styles.modal}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      isVisible={isVisible}
      backdropOpacity={appTheme.displayName === THEME.LIGHT || appTheme.displayName === THEME.DEFAULT ? 0.25 : 1}
      backdropColor={S.BackdropColor[appTheme.value]}
      onBackdropPress={onBackDropPress}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <S.ModalContainer>
          {/* Contens group */}
          <S.ContentWrapper>
            <WebView source={{ uri: url }} />
          </S.ContentWrapper>

          {/* Button group */}
          {!!onConfirm && (
            <S.ButtonWrapper>
              {!!onCancel && (
                <SecondaryButton
                  label={cancelLabel ? cancelLabel : t('btn_cancel')}
                  onPress={onCancel}
                  disabled={false}
                  wrapperStyle={S.styles.halfbutton}
                />
              )}
              {!!onCancel && <S.Gap />}
              <PrimaryButton
                label={confirmLabel ? confirmLabel : t('btn_confirm')}
                onPress={onConfirm}
                disabled={isConfirmDisabled}
                wrapperStyle={S.styles.halfbutton}
              />
            </S.ButtonWrapper>
          )}
        </S.ModalContainer>
      </SafeAreaView>
    </Modal>
  );
}

export default WebViewModal;
