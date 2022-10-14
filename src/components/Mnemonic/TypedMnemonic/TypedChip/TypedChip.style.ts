import styled, { css } from 'styled-components/native';

import { width } from '@@utils/ui';

export const SelectChipContainer = styled.Pressable``;

export const SelectChipWrapper = styled.View<{ typed: boolean; isFocused: boolean }>`
  margin-right: 8px;
  margin-bottom: 8px;
  padding: ${width * 8}px ${width * 16}px;
  border-radius: ${width * 8}px;
  border-width: 1px;
  ${({ theme, typed, isFocused }) => {
    if (typed) {
      return css`
        border-style: solid;
        border-color: ${theme.color.primary};
      `;
    }
    if (isFocused) {
      return css`
        border-style: dashed;
        border-color: ${theme.color.primary};
      `;
    } else {
      return css`
        border-style: solid;
        border-color: ${theme.color.whiteGrey800};
      `;
    }
  }};
  background-color: ${({ theme }) => theme.color.whiteGrey800};
`;

export const ChipText = styled.Text`
  ${({ theme }) => theme.font.Label.md};
  font-family: ${({ theme }) => theme.fmMedium};
  color: ${({ theme }) => theme.color.blackWhite};
`;
