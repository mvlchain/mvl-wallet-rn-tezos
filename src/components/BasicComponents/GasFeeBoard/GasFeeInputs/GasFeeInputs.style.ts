import styled from 'styled-components/native';

import { fontSize, height } from '@@utils/ui';

export const Container = styled.View``;

export const Label = styled.Text`
  ${({ theme }) => theme.font.Label.md};
  font-family: ${({ theme }) => theme.fmRegular};
  line-height: ${fontSize(20)}px;
  color: ${({ theme }) => theme.color.blackWhite};
`;

export const InputWrapper = styled.View`
  margin-top: ${height * 8}px;
`;
