import React from 'react';

import { useTranslation } from 'react-i18next';
import { Modal, SafeAreaView } from 'react-native';
import DropShadow from 'react-native-drop-shadow';

import { PrimaryButton } from '@@components/BasicComponents/Buttons/BaseButton';
import Check from '@@components/BasicComponents/Form/Check';
import Webview from '@@components/BasicComponents/Webview';
import { useToggle } from '@@hooks/useToggle';

import * as S from './TermsOfServicesModal.style';
import useTermsOfServicesModal from './useTermsOfServicesModal';

function TermsOfServicesModal() {
  const { t } = useTranslation();
  const { isOpen, onPressAgree, interruption } = useTermsOfServicesModal();
  const [isAgree, toggle] = useToggle();
  const TOS_URL = 'https://policy.mvlclutch.io/tos';
  return (
    <Modal visible={isOpen.tos} onRequestClose={interruption}>
      <SafeAreaView style={S.inlineStyles.safeAreaView}>
        <Webview url={TOS_URL} />
        <DropShadow style={S.inlineStyles.boxShadow}>
          <S.ConfirmContainer>
            <Check checked={isAgree} onPress={toggle} style={S.inlineStyles.marginProvider}>
              {/* TODO: 다국어 키값 추가 */}
              <S.ConfirmLabel>{t('I read the contents and I agree.')}</S.ConfirmLabel>
            </Check>
            <PrimaryButton onPress={onPressAgree} disabled={!isAgree} label={t('btn_confirm')} wrapperStyle={S.inlineStyles.marginProvider} />
          </S.ConfirmContainer>
        </DropShadow>
      </SafeAreaView>
    </Modal>
  );
}

export default TermsOfServicesModal;
