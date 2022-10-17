import React from 'react';

import { Text, Pressable, View } from 'react-native';

import { ISettingMenuProps } from './SettingMenu.type';

function SettingMenu({ title, subTitle, onPress }: ISettingMenuProps) {
  // TODO: 디자인 추가
  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 24,
          borderBottomWidth: 1,
        }}
      >
        <Text>{title}</Text>
        <Text>{subTitle && subTitle}</Text>
      </View>
    </Pressable>
  );
}

export default SettingMenu;
