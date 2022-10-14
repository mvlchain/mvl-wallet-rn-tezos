import React from 'react';

import * as S from './MnemonicChip.style';
import { IMnemomicChipProps } from './MnemonicChip.type';

function MnemonicChip({ label, index }: IMnemomicChipProps) {
  return (
    <S.ChipContainer>
      <S.LabelContainer isLast={index % 12 === 0}>
        <S.LabelText>
          {index}. {label}
        </S.LabelText>
      </S.LabelContainer>
    </S.ChipContainer>
  );
}
export default MnemonicChip;
