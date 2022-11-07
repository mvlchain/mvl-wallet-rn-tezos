import styled from 'styled-components/native';

import { fontSize } from '@@utils/ui';

import { IPinInstructionStyleProps } from './PinInstruction.type';

export const PinInstructionContainer = styled.View`
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const Instruction = styled.Text<IPinInstructionStyleProps>`
  text-align: center;
  ${({ theme }) => theme.font.Label.lg};
  font-family: ${({ theme }) => theme.fmMedium};
  line-height: ${fontSize(24)}px;
  color: ${({ theme, showError }) => (showError ? theme.color.red : theme.color.blackWhite)};
`;
