import React from 'react';

import { useTranslation } from 'react-i18next';

import { MODAL_TYPES } from '@@components/Modals/GlobalModal';
import SettingMenu from '@@components/Setting/SettingMenu';
import SettingToggleMenu from '@@components/Setting/SettingToggleMenu';
import useCommonSetting from '@@hooks/setting/useCommonSetting';
import { ROOT_STACK_ROUTE } from '@@navigation/RootStack/RootStack.type';
import globalModalStore from '@@store/globalModal/globalModalStore';
import settingPersistStore from '@@store/setting/settingPersistStore';

import * as S from './SettingSecurity.style';

function SettingSecurity() {
  const { t } = useTranslation();
  const { onPressSettingMenu } = useCommonSetting();
  const { openModal, closeModal } = globalModalStore();
  const { settedBioAuth, toggleBioAuth } = settingPersistStore();
  return (
    <S.SettingSecurityContainer bounces={false}>
      <SettingMenu
        title={t('dialog_reset_pin_lbl_title')}
        onPress={() => {
          // TODO: Open Reset PIN number Modal -> triggerCustomAuth -> reset pin number
          openModal(MODAL_TYPES.TEXT_MODAL, {
            title: t('reset_pin_number'),
            label: t('dialog_reset_pin_lbl_description'),
            confirmLabel: t('btn_reset'),
            onConfirm: () => console.log('trigger customauth login '),
            onCancel: () => closeModal(),
          });
        }}
      />
      {/* TODO: toggle형태의 menu만들기 */}
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
            onConfirm: () => console.log('mode to seed phrase'),
          });
        }}
      />
    </S.SettingSecurityContainer>
  );
}

export default SettingSecurity;
