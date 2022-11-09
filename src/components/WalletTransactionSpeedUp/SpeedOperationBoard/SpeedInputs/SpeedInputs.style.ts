import styled from 'styled-components/native';

import { fontSize } from '@@utils/ui';

export const Container = styled.View``;

export const Label = styled.Text`
  ${({ theme }) => theme.font.Label.md};
  font-family: ${({ theme }) => theme.fmRegular};
  line-height: ${fontSize(20)};
  color: ${({ theme }) => theme.color.blackWhite};
`;
