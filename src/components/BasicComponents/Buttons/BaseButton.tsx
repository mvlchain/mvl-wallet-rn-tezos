import React from 'react';

import * as S from './Button.style';
import * as Type from './Button.type';

const generator = () =>
  Object.values(S.baseButtonStyleObj).map(
    (baseStyle) =>
      function Button({ label, onPress, disabled, wrapperStyle, buttonStyle, textStyle, size, Icon }: Type.IBaseButtonComponentProps) {
        return (
          <S.BaseButtonContainer
            onPress={() => {
              if (disabled) return;
              onPress();
            }}
            size={size}
            style={wrapperStyle}
            disabled={disabled}
          >
            {({ pressed }) => (
              <S.BaseButton pressed={pressed} disabled={disabled} {...baseStyle.bg} size={size} style={buttonStyle}>
                {Icon && (
                  <S.BaseButtonIconWrapper>
                    <Icon />
                  </S.BaseButtonIconWrapper>
                )}
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
