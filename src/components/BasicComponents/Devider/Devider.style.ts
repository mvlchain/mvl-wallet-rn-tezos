import styled from 'styled-components/native';

import { height } from '@@utils/ui';

export const DeviderThick = styled.View`
  height: ${height * 8}px;
  background-color: ${({ theme }) => theme.color.grey100Grey900};
`;

export const DeviderThin = styled.View`
  height: ${height * 1}px;
  background-color: ${({ theme }) => theme.color.grey100Grey900};
`;
