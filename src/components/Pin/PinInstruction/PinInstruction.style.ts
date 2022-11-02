import styled from 'styled-components/native';

import { fontSize } from '@@utils/ui';

export const PinInstructionContainer = styled.View``;

export const Instruction = styled.Text`
  ${({ theme }) => theme.font.Label.lg};
  line-height: ${fontSize(24)};
  color: ${({ theme }) => theme.color.blackWhite};
  flex: 1;
`;

export const ErrorMessage = styled.Text`
  position: absolute;
  color: ${({ theme }) => theme.color.red};
`;
