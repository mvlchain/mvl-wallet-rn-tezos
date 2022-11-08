import styled from 'styled-components/native';

import { width } from '@@utils/ui';

export const Container = styled.View`
  flex-wrap: wrap;
  flex-direction: row;
  align-items: baseline;
`;

export const Wrapper = styled.View<{ pressed: boolean }>`
  flex-direction: row;
  align-items: center;
  opacity: ${({ pressed }) => (pressed ? 0.5 : 1)};
`;

export const Label = styled.Text`
  margin-right: ${width * 8}px;
  ${({ theme }) => theme.font.Title.md};
  color: ${({ theme }) => theme.color.blackWhite};
`;
