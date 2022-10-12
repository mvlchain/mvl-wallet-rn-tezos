import React from 'react';

import * as S from './styled';
import * as Type from './type';

export function TextButton({ label, onPress, disabled, wrapperStyle, textStyle }: Type.TextButtonComponentProps) {
  return (
    <S.TextButtonContainer onPress={onPress} style={wrapperStyle}>
      {({ pressed }) => (
        <S.TextButtonLabel pressed={pressed} style={textStyle} disabled={disabled}>
          {label}
        </S.TextButtonLabel>
      )}
    </S.TextButtonContainer>
  );
}
