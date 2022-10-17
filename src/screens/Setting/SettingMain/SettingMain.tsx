import React from 'react';

import { Text, ScrollView } from 'react-native';

import SettingMenu from '@@components/Setting/SettingMenu';
import useCommonSetting from '@@hooks/setting/useCommonSetting';
import { SETTING_STACK_ROUTE } from '@@navigation/SettingStack/SettingStack.type';

function SettingMain() {
  // TODO: title 다국어, subtitle 데이터 연동하기, 디자인 추가
  const { onPressSettingMenu } = useCommonSetting({ routeName: 'SETTING_MAIN' });
  return (
    <ScrollView bounces={false}>
      <Text style={{ fontSize: 30 }}>Setting</Text>
      <SettingMenu
        title='Currency'
        subTitle='USD'
        onPress={() => {
          // TODO: Open Currency Setting Modal
        }}
      />
      <SettingMenu
        title='Language'
        subTitle='English'
        onPress={() => {
          // TODO: Open Language Setting Modal
        }}
      />
      <SettingMenu
        title='Theme'
        subTitle='System Default'
        onPress={() => {
          // TODO: Open Theme Setting Modal
        }}
      />
      <SettingMenu
        title='Security'
        onPress={() => {
          onPressSettingMenu(SETTING_STACK_ROUTE.SETTING_SECURITY);
        }}
      />
      <SettingMenu
        title='FAQ'
        onPress={() => {
          onPressSettingMenu(SETTING_STACK_ROUTE.SETTING_FAQ);
        }}
      />
      <SettingMenu
        title='Privacy Policy'
        onPress={() => {
          onPressSettingMenu(SETTING_STACK_ROUTE.SETTING_PRIVACY_POLITY);
        }}
      />
      <SettingMenu
        title='Terms of Service'
        onPress={() => {
          onPressSettingMenu(SETTING_STACK_ROUTE.SETTING_TERMS_OF_SERVICE);
        }}
      />
      <SettingMenu
        title='App Version'
        subTitle='1.0'
        onPress={() => {
          onPressSettingMenu(SETTING_STACK_ROUTE.SETTING_APP_VERSION);
        }}
      />
      <SettingMenu
        title='Log Out'
        onPress={() => {
          // TODO: Open Log Out Modal
        }}
      />
      <SettingMenu
        title='Delete Account'
        onPress={() => {
          onPressSettingMenu(SETTING_STACK_ROUTE.SETTING_DELETE_ACCOUNT);
        }}
      />
    </ScrollView>
  );
}

export default SettingMain;
