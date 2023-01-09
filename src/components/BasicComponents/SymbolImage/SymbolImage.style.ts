import styled from 'styled-components/native';

import { width } from '@@utils/ui';

export const Image = styled.Image<{ size: number }>`
  resize-mode: contain;
  width: ${({ size }) => width * size}px;
  height: ${({ size }) => width * size}px;
`;
