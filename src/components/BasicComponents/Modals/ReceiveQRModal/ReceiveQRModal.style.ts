import styled from 'styled-components/native';

import { height } from '@@utils/ui';

export const AmountText = styled.Text`
  padding: ${height * 24}px 0;
  ${({ theme }) => theme.font.Title.md}
  color: ${({ theme }) => theme.color.blackWhite}
`;
