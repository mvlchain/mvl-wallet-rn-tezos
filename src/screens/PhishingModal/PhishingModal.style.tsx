import styled from 'styled-components/native';

import { fontSize } from '@@utils/ui';

export const Label = styled.Text`
  ${({ theme }) => theme.font.Label.md};
  font-family: ${({ theme }) => theme.fmRegular};
  line-height: ${fontSize(20)}px;
  color: ${({ theme }) => theme.color.blackWhite};
`;
