import React from 'react';

import Toggle from '@@components/BasicComponents/Form/Toggle';

import * as S from './SettingToggleMenu.style';
import { ISettingToggleMenuProps } from './SettingToggleMenu.type';

function SettingToggleMenu({ title, subTitle, isThickBorder, isLast, isChecked, onPress }: ISettingToggleMenuProps) {
  return (
    <S.SettingToggleMenuContainer isThickBorder={isThickBorder} isLast={isLast}>
      <S.SettingToggleMenuText>{title}</S.SettingToggleMenuText>
      <S.SettingSubTextContainer>
        <S.SettingToggleMenuText isSub={true}>{subTitle && subTitle}</S.SettingToggleMenuText>
        <Toggle checked={isChecked} onPress={onPress} />
      </S.SettingSubTextContainer>
    </S.SettingToggleMenuContainer>
  );
}

export default SettingToggleMenu;
