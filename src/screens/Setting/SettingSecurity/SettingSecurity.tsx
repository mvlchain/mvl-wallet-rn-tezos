import React from 'react';

import { View } from 'react-native';

import SettingMenu from '@@components/Setting/SettingMenu';
import useCommonSetting from '@@hooks/setting/useCommonSetting';
import { SETTING_STACK_ROUTE } from '@@navigation/SettingStack/SettingStack.type';

function SettingSecurity() {
  const { onPressSettingMenu } = useCommonSetting({ routeName: 'SETTING_SECURITY' });

  return (
    <View>
      <SettingMenu
        title='Reset PIN number'
        onPress={() => {
          // TODO: Open Reset PIN number Modal -> triggerCustomAuth -> reset pin number
        }}
      />
      {/* TODO: toggle형태의 menu만들기 */}
      <SettingMenu title='Biometric Authentication' onPress={() => {}} />
      <SettingMenu
        title='Private Key'
        onPress={() => {
          /**
           * TODO:
           * if (wallet > 2) -> select wallet modal
           * open important modal
           * move private Key screen
           *  */
          onPressSettingMenu(SETTING_STACK_ROUTE.SETTING_PRIVATE_KEY);
        }}
      />
      <SettingMenu
        title='Back Up Seed Phrase'
        onPress={() => {
          // TODO: open important modal -> move Seed Phrase Screen
        }}
      />
    </View>
  );
}

export default SettingSecurity;
