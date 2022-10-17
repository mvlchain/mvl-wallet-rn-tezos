import React from 'react';

import { useTranslation } from 'react-i18next';
import { Text, ScrollView } from 'react-native';

import SettingMenu from '@@components/Setting/SettingMenu';
import useCommonSetting from '@@hooks/setting/useCommonSetting';
import { SETTING_STACK_ROUTE } from '@@navigation/SettingStack/SettingStack.type';

import * as S from './Setting.style';

function Setting() {
  const { t } = useTranslation();
  // TODO: subtitle 데이터 연동하기 / 다국어, 디자인 추가
  const { onPressSettingMenu } = useCommonSetting({ routeName: 'SETTING_MAIN' });

  return (
    <S.SettingContainer>
      <S.SettingHeaderText>{t('setting')}</S.SettingHeaderText>
      <S.SettingScrollView>
        <SettingMenu
          title={t('currency')}
          subTitle='USD'
          onPress={() => {
            // TODO: Open Currency Setting Modal
          }}
        />
        <SettingMenu
          title={t('language')}
          subTitle='English'
          onPress={() => {
            // TODO: Open Language Setting Modal
          }}
        />
        <SettingMenu
          title={t('theme')}
          subTitle='System Default'
          onPress={() => {
            // TODO: Open Theme Setting Modal
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
          onPress={() => {
            onPressSettingMenu(SETTING_STACK_ROUTE.SETTING_APP_VERSION);
          }}
        />
        <SettingMenu
          title={t('log_out')}
          onPress={() => {
            // TODO: Open Log Out Modal
          }}
        />
        <SettingMenu
          title={t('delete_account')}
          onPress={() => {
            onPressSettingMenu(SETTING_STACK_ROUTE.SETTING_DELETE_ACCOUNT);
          }}
        />
      </S.SettingScrollView>
    </S.SettingContainer>
  );
}

export default Setting;
