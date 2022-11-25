import React from 'react';

import * as S from './TypedChip.style';
import { ITypedChipChipProp } from './TypedChip.type';

function TypedChip({ word, index, typed, isFocused, onPress }: ITypedChipChipProp) {
  return (
    <S.SelectChipContainer onPress={onPress}>
      <S.SelectChipWrapper typed={typed} isFocused={isFocused}>
        <S.ChipText>
          {index}. {word}
        </S.ChipText>
      </S.SelectChipWrapper>
    </S.SelectChipContainer>
  );
}

export default TypedChip;
