import styled from 'styled-components/native';

import { fontSize } from '@@utils/ui';

import { IPinInstructionStyleProps } from './PinInstruction.type';

export const PinInstructionContainer = styled.View``;

export const Instruction = styled.Text<IPinInstructionStyleProps>`
  ${({ theme }) => theme.font.Label.lg};
  line-height: ${fontSize(24)};
  color: ${({ theme, showError }) => (showError ? theme.color.red : theme.color.blackWhite)};
  flex: 1;
`;

export const ErrorMessage = styled.Text`
  position: absolute;
  color: ${({ theme }) => theme.color.red};
`;
