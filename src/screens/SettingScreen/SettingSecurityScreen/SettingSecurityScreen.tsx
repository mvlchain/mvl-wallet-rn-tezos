import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import ErrorBoundary from 'react-native-error-boundary';

import ErrorScreenInRootStack from '@@components/BasicComponents/ErrorBoundary/ErrorScreenInRootStack';
import { MODAL_TYPES } from '@@components/BasicComponents/Modals/GlobalModal';
import SettingMenu from '@@components/Setting/SettingMenu';
import SettingToggleMenu from '@@components/Setting/SettingToggleMenu';
import { AUTH_MODAL_NAME } from '@@constants/authModal.constant';
import { TOAST_TYPE } from '@@constants/toastConfig.constant';
import useCommonSetting from '@@hooks/useCommonSetting';
import { useDi } from '@@hooks/useDi';
import useToast from '@@hooks/useToast';
import { ROOT_STACK_ROUTE, TRootStackNavigationProps } from '@@navigation/RootStack/RootStack.type';
import { authModalStore } from '@@store/auth/authModalStore';
import globalModalStore from '@@store/globalModal/globalModalStore';
import settingPersistStore from '@@store/setting/settingPersistStore';

import * as S from './SettingSecurityScreen.style';

function SettingSecurityScreen() {
  const { t } = useTranslation();
  const { onPressSettingMenu } = useCommonSetting();
  const { openModal, closeModal } = globalModalStore();
  const { close } = authModalStore();
  const { settedBioAuth, toggleBioAuth } = settingPersistStore();
  const navigation = useNavigation<TRootStackNavigationProps<'SETTING_SECURITY'>>();
  const auth = useDi('AuthService');
  const { showToast } = useToast();

  return (
    <ErrorBoundary FallbackComponent={ErrorScreenInRootStack}>
      <S.SettingSecurityContainer bounces={false}>
        <SettingMenu
          title={t('dialog_reset_pin_lbl_title')}
          onPress={() => {
            openModal(MODAL_TYPES.TEXT_MODAL, {
              title: t('reset_pin_number'),
              label: t('dialog_reset_pin_lbl_description'),
              confirmLabel: t('btn_reset'),
              onConfirm: async () => {
                const pin = await auth.resetPin();
                if (pin) {
                  close(AUTH_MODAL_NAME.PIN);
                  showToast(TOAST_TYPE.BASIC, t('password_pin_changed'));
                } else {
                  showToast(TOAST_TYPE.ERROR, t('error'));
                }
              },
              onCancel: () => closeModal(),
            });
          }}
        />
        <SettingToggleMenu title={t('biometric_authentication')} isChecked={settedBioAuth} onPress={toggleBioAuth} />
        <SettingMenu
          title={t('private_key')}
          onPress={() => {
            /**
             * TODO:
             * if (wallet > 2) -> select wallet modal
             * open important modal
             * move private Key screen
             *  */
            openModal(MODAL_TYPES.TEXT_MODAL, {
              title: t('important_notice'),
              label: t('dialog_private_key_lbl_description'),
              onConfirm: () => onPressSettingMenu(ROOT_STACK_ROUTE.SETTING_PRIVATE_KEY),
            });
          }}
        />
        <SettingMenu
          title={t('seed_phrase_lbl_title')}
          onPress={() => {
            // TODO: open important modal -> move Seed Phrase Screen
            openModal(MODAL_TYPES.TEXT_MODAL, {
              title: t('important_notice'),
              label: t('dialog_private_key_lbl_description'),
              onConfirm: () =>
                navigation.navigate(ROOT_STACK_ROUTE.SEED_PHRASE, {
                  onlyCopy: true,
                }),
            });
          }}
        />
      </S.SettingSecurityContainer>
    </ErrorBoundary>
  );
}

export default SettingSecurityScreen;
