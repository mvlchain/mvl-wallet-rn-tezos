import React from 'react';

import { useTranslation } from 'react-i18next';

import { MODAL_TYPES } from '@@components/Modals/GlobalModal';
import useSettingBottomModal from '@@components/Modals/SettingBottomModal/useSettingBottomModal';
import SettingMenu from '@@components/Setting/SettingMenu';
import { LANGUAGE_NAME, THEME_NAME } from '@@constants/setting.constant';
import useCommonSetting from '@@hooks/setting/useCommonSetting';
import { ROOT_STACK_ROUTE } from '@@navigation/RootStack/RootStack.type';
import globalModalStore from '@@store/globalModal/globalModalStore';
import settingPersistStore from '@@store/setting/settingPersistStore';

import * as S from './SettingScreen.style';

function SettingScreen() {
  const { t } = useTranslation();
  const { onPressSettingMenu } = useCommonSetting();
  const { settedCurrency, settedLanguage, appTheme } = settingPersistStore();
  const { currencyMenu, languageMenu, themeMenu } = useSettingBottomModal();
  const { openModal } = globalModalStore();

  return (
    <S.SettingContainer>
      <S.SettingHeaderText>{t('setting')}</S.SettingHeaderText>
      <S.SettingScrollView bounces={false}>
        <SettingMenu
          title={t('currency')}
          subTitle={settedCurrency}
          onPress={() => {
            openModal(MODAL_TYPES.SETTING_BOTTOM, { modalTitle: t('currency'), menuList: currencyMenu });
          }}
        />
        <SettingMenu
          title={t('language')}
          subTitle={LANGUAGE_NAME[settedLanguage]}
          onPress={() => {
            openModal(MODAL_TYPES.SETTING_BOTTOM, { modalTitle: t('language'), menuList: languageMenu });
          }}
        />
        <SettingMenu
          title={t('theme')}
          subTitle={t(THEME_NAME[appTheme.value])}
          onPress={() => {
            openModal(MODAL_TYPES.SETTING_BOTTOM, { modalTitle: t('theme'), menuList: themeMenu });
          }}
        />
        <SettingMenu
          title={t('security')}
          onPress={() => {
            onPressSettingMenu(ROOT_STACK_ROUTE.SETTING_SECURITY);
          }}
        />
        <SettingMenu
          title={t('faq')}
          onPress={() => {
            onPressSettingMenu(ROOT_STACK_ROUTE.SETTING_FAQ);
          }}
        />
        <SettingMenu
          title={t('privacy_policy')}
          onPress={() => {
            onPressSettingMenu(ROOT_STACK_ROUTE.SETTING_PRIVACY_POLITY);
          }}
        />
        <SettingMenu
          title={t('terms_of_service')}
          onPress={() => {
            onPressSettingMenu(ROOT_STACK_ROUTE.SETTING_TERMS_OF_SERVICE);
          }}
        />
        <SettingMenu
          title={t('app_version')}
          subTitle='1.0'
          isThickBorder={true}
          onPress={() => {
            onPressSettingMenu(ROOT_STACK_ROUTE.SETTING_APP_VERSION);
          }}
        />
        <SettingMenu
          title={t('log_out')}
          isThickBorder={true}
          onPress={() => {
            openModal(MODAL_TYPES.SETTING_LOG_OUT, undefined);
          }}
        />
        <SettingMenu
          title={t('delete_account')}
          isLast={true}
          onPress={() => {
            onPressSettingMenu(ROOT_STACK_ROUTE.SETTING_DELETE_ACCOUNT);
          }}
        />
      </S.SettingScrollView>
    </S.SettingContainer>
  );
}

export default SettingScreen;
