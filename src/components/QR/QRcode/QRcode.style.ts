import styled from 'styled-components/native';

import { width, height } from '@@utils/ui';

export const QRcodeWrapper = styled.View`
  width: ${width * 240}px;
  height: ${height * 240}px;
  background-color: white;
  justify-content: center;
  align-items: center;
`;
