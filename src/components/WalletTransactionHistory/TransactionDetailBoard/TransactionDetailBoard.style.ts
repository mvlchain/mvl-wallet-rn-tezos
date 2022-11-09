import styled from 'styled-components/native';

import { height, width } from '@@utils/ui';

export const TransactionDetailBoardContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding: ${height * 24}px;
`;
export const TransactionType = styled.Text`
  ${({ theme }) => theme.font.Label.lg};
  font-family: ${({ theme }) => theme.fmRegular};
  line-height: ${height * 24}px;
  color: ${({ theme }) => theme.color.blackWhite};
`;

export const TransactionAmount = styled.Text`
  margin: ${height * 2}px;
  ${({ theme }) => theme.font.Title.lg};
  font-family: ${({ theme }) => theme.fmBold};
  line-height: ${height * 40}px;
  color: ${({ theme }) => theme.color.blackWhite};
`;

export const TransactionBaseCurrencyAmount = styled.Text`
  ${({ theme }) => theme.font.Label.md};
  font-family: ${({ theme }) => theme.fmRegular};
  line-height: ${height * 20}px;
  color: ${({ theme }) => theme.color.grey500};
`;

export const Row = styled.View<{ isMiddle?: boolean }>`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin: ${({ isMiddle }) => (isMiddle ? `${height * 24}px` : 0)} 0;
`;

export const Label = styled(TransactionBaseCurrencyAmount)`
  margin-right: ${width * 24}px;
  color: ${({ theme }) => theme.color.blackWhite};
`;

export const Value = styled(TransactionBaseCurrencyAmount)`
  color: ${({ theme }) => theme.color.blackWhite};
  text-align: right;
`;

export const ReceiverWrapper = styled.View`
  margin-right: ${width * 80}px;
  text-align: right;
`;
