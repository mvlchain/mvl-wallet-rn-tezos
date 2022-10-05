import React from 'react';

import { TextButtonContainer, TextButtonLabel } from './styled';
import { TextButtonComponentProps } from './type';

export function TextButton({ label, onPress, disabled, wrapperStyle, textStyle }: TextButtonComponentProps) {
  return (
    <TextButtonContainer onPress={onPress} style={wrapperStyle}>
      {({ pressed }) => (
        <TextButtonLabel pressed={pressed} style={textStyle} disabled={disabled}>
          {label}
        </TextButtonLabel>
      )}
    </TextButtonContainer>
  );
}
