import React from 'react';

import { BaseButtonContainer, BaseButton, BaseButtonLabel } from './styled';
import { BaseStyle, ComponentProps } from './type';

export const styles: BaseStyle[] = [
  {
    type: 'primary',
    bg: {
      bgColor: 'cbg01',
      bgColorPressed: 'cbg06',
      bgColorDisabled: 'bg09',
    },
    tx: {
      txColor: 'cfc01',
      txColorDisabled: 'fc05',
    },
  },
  {
    type: 'secondary',
    bg: {
      bgColor: 'bg02',
      bgColorPressed: 'bg08',
      bgColorDisabled: 'bg02',
    },
    tx: {
      txColor: 'fc01',
      txColorDisabled: 'fc05',
    },
  },
  {
    type: 'outline',
    bg: {
      bgColor: 'cbg05',
      bgColorPressed: 'cbg03',
      bgColorDisabled: 'cbg05',
      lcColor: 'lc03',
    },
    tx: {
      txColor: 'cfc05',
      txColorDisabled: 'cfc04',
    },
  },
  {
    type: 'black',
    bg: {
      bgColor: 'bg05',
      bgColorPressed: 'bg06',
      bgColorDisabled: 'bg07',
    },
    tx: {
      txColor: 'fc02',
      txColorDisabled: 'fc04',
    },
  },
];

const generator = () =>
  styles.map(
    (baseStyle) =>
      function Button({ label, onPress, disabled, wrapperStyle, buttonStyle, textStyle, size }: ComponentProps) {
        return (
          <BaseButtonContainer onPress={onPress} size={size} style={wrapperStyle}>
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
