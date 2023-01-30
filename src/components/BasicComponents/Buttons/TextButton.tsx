import React from 'react';

import * as S from './Button.style';
import * as Type from './Button.type';

export function TextButton({ label, onPress, disabled, wrapperStyle, textStyle, Icon }: Type.ITextButtonComponentProps) {
  return (
    <S.TextButtonContainer
      onPress={() => {
        if (disabled) return;
        onPress();
      }}
      style={wrapperStyle}
    >
      {({ pressed }) => (
        <>
          {Icon && <Icon style={S.inlineStyle.textIcon} />}
          <S.TextButtonLabel pressed={pressed} style={textStyle} disabled={disabled}>
            {label}
          </S.TextButtonLabel>
        </>
      )}
    </S.TextButtonContainer>
  );
}
