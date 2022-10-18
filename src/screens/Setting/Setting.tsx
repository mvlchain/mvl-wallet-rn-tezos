import React from 'react';

import { useTranslation } from 'react-i18next';

import useSettingBottomModal from '@@components/Modals/SettingBottomModal/useSettingBottomModal';
import SettingMenu from '@@components/Setting/SettingMenu';
import { LANGUAGE_NAME } from '@@constants/setting.constant';
import useCommonSetting from '@@hooks/setting/useCommonSetting';
import { SETTING_STACK_ROUTE } from '@@navigation/SettingStack/SettingStack.type';
import globalModalStore from '@@store/globalModal/globalModalStore';
import settingStore from '@@store/setting/settingPersistStore';

import * as S from './Setting.style';

function Setting() {
  const { t } = useTranslation();
  // TODO: subtitle 데이터 연동하기 / 다국어, 디자인 추가
  const { onPressSettingMenu } = useCommonSetting({ routeName: 'SETTING_MAIN' });
  const { settedCurrency, settedLanguage, settedTheme } = settingStore();
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
            openModal('SETTING_BOTTOM', { menuList: currencyMenu });
          }}
        />
        <SettingMenu
          title={t('language')}
          subTitle={LANGUAGE_NAME[settedLanguage]}
          onPress={() => {
            openModal('SETTING_BOTTOM', { menuList: languageMenu });
          }}
        />
        <SettingMenu
          title={t('theme')}
          subTitle={settedTheme}
          onPress={() => {
            openModal('SETTING_BOTTOM', { menuList: themeMenu });
          }}
        />
        <SettingMenu
          title={t('security')}
          onPress={() => {
            onPressSettingMenu(SETTING_STACK_ROUTE.SETTING_SECURITY);
          }}
        />
        <SettingMenu
          title={t('faq')}
          onPress={() => {
            onPressSettingMenu(SETTING_STACK_ROUTE.SETTING_FAQ);
          }}
        />
        <SettingMenu
          title={t('privacy_policy')}
          onPress={() => {
            onPressSettingMenu(SETTING_STACK_ROUTE.SETTING_PRIVACY_POLITY);
          }}
        />
        <SettingMenu
          title={t('terms_of_service')}
          onPress={() => {
            onPressSettingMenu(SETTING_STACK_ROUTE.SETTING_TERMS_OF_SERVICE);
          }}
        />
        <SettingMenu
          title={t('app_version')}
          subTitle='1.0'
          isThickBorder={true}
          onPress={() => {
            onPressSettingMenu(SETTING_STACK_ROUTE.SETTING_APP_VERSION);
          }}
        />
        <SettingMenu
          title={t('log_out')}
          isThickBorder={true}
          onPress={() => {
            // TODO: Open Log Out Modal
          }}
        />
        <SettingMenu
          title={t('delete_account')}
          isLast={true}
          onPress={() => {
            onPressSettingMenu(SETTING_STACK_ROUTE.SETTING_DELETE_ACCOUNT);
          }}
        />
      </S.SettingScrollView>
    </S.SettingContainer>
  );
}

export default Setting;
