import React from 'react';

import SettingMenu from '@@components/Setting/SettingMenu';
import useCommonSetting from '@@hooks/setting/useCommonSetting';
import { ROOT_STACK_ROUTE } from '@@navigation/RootStack/RootStack.type';

import * as S from './SettingSecurity.style';

function SettingSecurity() {
  const { onPressSettingMenu } = useCommonSetting();

  return (
    <S.SettingSecurityContainer bounces={false}>
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
          onPressSettingMenu(ROOT_STACK_ROUTE.SETTING_PRIVATE_KEY);
        }}
      />
      <SettingMenu
        title='Back Up Seed Phrase'
        onPress={() => {
          // TODO: open important modal -> move Seed Phrase Screen
        }}
      />
    </S.SettingSecurityContainer>
  );
}

export default SettingSecurity;
