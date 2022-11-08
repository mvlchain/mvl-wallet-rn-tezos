import styled from 'styled-components/native';

import { height } from '@@utils/ui';

export const TransactionHashBoardContainer = styled.View`
  width: 100%;
  padding: ${height * 24}px;
`;
export const LabelWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
export const TransactionHashLabel = styled.Text`
  ${({ theme }) => theme.font.Label.md};
  font-family: ${({ theme }) => theme.fmRegular};
  color: ${({ theme }) => theme.color.grey500};
`;
export const TransactionHash = styled.Text`
  margin-top: ${height * 8}px;
`;
