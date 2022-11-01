import styled from 'styled-components/native';

import { fontSize, height, width } from '@@utils/ui';

export const Instruction = styled.Text`
  ${({ theme }) => theme.font.Label.lg};
  line-height: ${fontSize(24)};
  color: ${({ theme }) => theme.color.blackWhite};
  flex: 1;
`;
