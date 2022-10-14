import styled from 'styled-components/native';

import { width } from '@@utils/ui';

export const ChipContainer = styled.View`
  align-items: baseline;
`;

export const LabelContainer = styled.View<{ isLast: boolean }>`
  padding: ${width * 8}px;
  margin-bottom: ${({ isLast }) => (isLast ? 0 : width * 8)}px;
  border-radius: ${width * 8}px;
  background-color: ${({ theme }) => theme.color.whiteGrey800};
`;

export const LabelText = styled.Text`
  ${({ theme }) => theme.font.Paragraph.md};
  color: ${({ theme }) => theme.color.blackWhite};
`;
