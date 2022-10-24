import { Pressable } from 'react-native';

import { SelectIcon } from '@@assets/image';

import * as S from './SettingBottomMenu.style';
import { ISettingBottomMenuProps } from './SettingBottomMenu.type';

function SettingBottomMenu({ title, isSelected, onPress }: ISettingBottomMenuProps) {
  return (
    <Pressable onPress={onPress}>
      <S.MenuContainer>
        <S.MenuText>{title}</S.MenuText>
        {isSelected && <SelectIcon />}
      </S.MenuContainer>
    </Pressable>
  );
}

export default SettingBottomMenu;
