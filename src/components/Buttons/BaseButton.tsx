import React from 'react';

import { BaseButtonContainer, BaseButton, BaseButtonLabel, baseButtonStyleObj } from './styled';
import { BaseButtonComponentProps, BaseButtonStyle } from './type';

const generator = () =>
  Object.values(baseButtonStyleObj).map(
    (baseStyle) =>
      function Button({ label, onPress, disabled, wrapperStyle, buttonStyle, textStyle, size }: BaseButtonComponentProps) {
        return (
          <BaseButtonContainer
            onPress={() => {
              if (disabled) return;
              onPress();
            }}
            size={size}
            style={wrapperStyle}
          >
            {({ pressed }) => (
              <BaseButton pressed={pressed} disabled={disabled} {...baseStyle.bg} size={size} style={buttonStyle}>
                <BaseButtonLabel {...baseStyle.tx} size={size} style={textStyle} disabled={disabled}>
                  {label}
                </BaseButtonLabel>
              </BaseButton>
            )}
          </BaseButtonContainer>
        );
      }
  );

export const [PrimaryButton, SecondaryButton, OutlineButton, BlackButton] = generator();
