import styled from 'styled-components/native';

import { height, width } from '@@utils/ui';

export const TransactionHistoryContainer = styled.View``;
export const TransactionHistoryLabelWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: ${height * 24}px;
`;
export const TransactionHistoryLabel = styled.Text`
  ${({ theme }) => theme.font.Title.xs}
  font-family: ${({ theme }) => theme.fmExBold};
`;
