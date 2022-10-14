import styled from 'styled-components/native';

import { width } from '@@utils/ui';

export const SelectChipContainer = styled.Pressable``;

export const SelectChipWrapper = styled.View<{ pressed: boolean }>`
  margin-right: 8px;
  margin-bottom: 8px;
  padding: ${width * 8}px ${width * 16}px;
  border-radius: ${width * 8}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.color.primary};
  background-color: ${({ theme, pressed }) => (pressed ? theme.color.primary : theme.color.whiteBlack)};
`;

export const ChipText = styled.Text<{ pressed: boolean }>`
  ${({ theme }) => theme.font.Label.md};
  color: ${({ theme, pressed }) => (pressed ? theme.color.white : theme.color.primary)};
  font-family: ${({ theme }) => theme.fmMedium};
`;
