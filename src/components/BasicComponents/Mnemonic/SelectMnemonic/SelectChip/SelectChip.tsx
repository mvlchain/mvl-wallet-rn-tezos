import React from 'react';

import * as S from './SelectChip.style';
import { ISelectChipProp } from './SelectChip.type';

function SelectChip({ mnemonic, pressed, onPress }: ISelectChipProp) {
  return (
    <S.SelectChipContainer onPress={onPress}>
      <S.SelectChipWrapper pressed={pressed}>
        <S.ChipText pressed={pressed}>{mnemonic}</S.ChipText>
      </S.SelectChipWrapper>
    </S.SelectChipContainer>
  );
}

export default SelectChip;
