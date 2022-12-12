import styled from 'styled-components/native';

import { height } from '@@utils/ui';

export const Container = styled.View`
  align-items: center;
  justify-content: center;
`;

export const AmountText = styled.Text`
  padding-bottom: ${height * 24}px;
  ${({ theme }) => theme.font.Title.md}
  color: ${({ theme }) => theme.color.blackWhite}
`;
