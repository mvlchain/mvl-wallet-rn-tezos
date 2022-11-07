import React from 'react';

import { Pressable } from 'react-native';

import { ChevronDownBlueIcon } from '@@assets/image';

import * as S from './Chip.style';
import { IChipProps } from './Chip.type';

function Chip({ onPress, isMultiple, label }: IChipProps) {
  return (
    <S.ChipContainer>
      <Pressable
        onPress={() => {
          if (!onPress) return;
          onPress();
        }}
      >
        {({ pressed }) => (
          <S.ChipWrapper pressed={pressed} isPressable={!!onPress}>
            <S.ChipText>{label}</S.ChipText>
            {isMultiple && <ChevronDownBlueIcon style={{ marginLeft: S.inlineStyles.marginProvider.marginLeft }} />}
          </S.ChipWrapper>
        )}
      </Pressable>
    </S.ChipContainer>
  );
}

export default Chip;
