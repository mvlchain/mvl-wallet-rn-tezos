import React from 'react';

import * as S from './styled';
import * as Type from './type';

const generator = () =>
  Object.values(S.baseButtonStyleObj).map(
    (baseStyle) =>
      function Button({ label, onPress, disabled, wrapperStyle, buttonStyle, textStyle, size }: Type.BaseButtonComponentProps) {
        return (
          <S.BaseButtonContainer onPress={onPress} size={size} style={wrapperStyle}>
            {({ pressed }) => (
              <S.BaseButton pressed={pressed} disabled={disabled} {...baseStyle.bg} size={size} style={buttonStyle}>
                <S.BaseButtonLabel {...baseStyle.tx} size={size} style={textStyle} disabled={disabled}>
                  {label}
                </S.BaseButtonLabel>
              </S.BaseButton>
            )}
          </S.BaseButtonContainer>
        );
      }
  );

export const [PrimaryButton, SecondaryButton, OutlineButton, BlackButton] = generator();
