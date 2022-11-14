import styled from 'styled-components/native';

import { height, width } from '@@utils/ui';

export const ItemContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${height * 17}px ${width * 24}px;
  border-bottom-width: ${height * 1}px;
  border-bottom-color: ${({ theme }) => theme.color.grey100Grey900};
`;

export const TokenContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  margin: 0 ${width * 16}px;
`;

export const TokenName = styled.Text`
  margin-left: ${width * 16}px;
  ${({ theme }) => theme.font.Label.md}
  color: ${({ theme }) => theme.color.blackWhite}
`;
