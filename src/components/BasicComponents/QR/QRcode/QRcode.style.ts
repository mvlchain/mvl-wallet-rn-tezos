import styled from 'styled-components/native';

import { getWidth, width } from '@@utils/ui';

export const QRcodeWrapper = styled.View`
  justify-content: center;
  align-items: center;
  background-color: white;
`;

export const QRcodeDarkThemeWrapper = styled.View`
  justify-content: center;
  align-items: center;
  background-color: white;
  border-width: ${getWidth(3)}px;
  border-color: ${({ theme }) => theme.color.white};
  border-style: solid;
`;
