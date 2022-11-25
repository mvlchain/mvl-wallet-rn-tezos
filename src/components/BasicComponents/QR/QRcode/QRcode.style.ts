import styled from 'styled-components/native';

import { width, height } from '@@utils/ui';

export const QRcodeWrapper = styled.View`
  justify-content: center;
  align-items: center;
  width: ${width * 240}px;
  height: ${height * 240}px;
  background-color: white;
`;
