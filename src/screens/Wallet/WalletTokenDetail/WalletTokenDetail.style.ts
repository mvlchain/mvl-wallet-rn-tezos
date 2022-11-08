import styled from 'styled-components/native';

import { height, width } from '@@utils/ui';

export const EmptyDeviderThick = styled.View`
  height: ${height * 8}px;
  background-color: ${({ theme }) => theme.color.grey100Grey900};
`;
