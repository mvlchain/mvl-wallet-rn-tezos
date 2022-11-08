import styled from 'styled-components/native';

import { height, width } from '@@utils/ui';

export const TokenInfoContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: ${height * 72}px;
  padding-left: ${width * 26}px;
  padding-right: ${width * 24}px;
`;

export const EmptyDeviderThick = styled.View`
  height: ${height * 8}px;
  background-color: ${({ theme }) => theme.color.grey100Grey900};
`;

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
