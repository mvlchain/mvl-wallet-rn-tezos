import React from 'react';

import * as S from './Button.style';
import * as Type from './Button.type';

export function TextButton({ label, onPress, disabled, wrapperStyle, textStyle }: Type.TextButtonComponentProps) {
  return (
    <S.TextButtonContainer
      onPress={() => {
        if (disabled) return;
        onPress();
      }}
      style={wrapperStyle}
    >
      {({ pressed }) => (
        <S.TextButtonLabel pressed={pressed} style={textStyle} disabled={disabled}>
          {label}
        </S.TextButtonLabel>
      )}
    </S.TextButtonContainer>
  );
}
