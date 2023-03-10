import styled from 'styled-components/native';

import { height } from '@@utils/ui';

export const Container = styled.View`
  padding: ${height * 24}px;
  background-color: ${({ theme }) => theme.color.whiteBlack};
`;

export const Gap = styled.View`
  height: ${height * 24}px;
`;
