import styled from 'styled-components/native';

import { fontSize, height, width } from '@@utils/ui';

export const TokenInfoContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: ${height * 72}px;
  padding-left: ${width * 26}px;
  padding-right: ${width * 24}px;
`;
export const TokenSymbolWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const TokenName = styled.Text`
  margin-left: ${width * 16}px;
  ${({ theme }) => theme.font.Label.md}
  font-family: ${({ theme }) => theme.fmMedium};
  line-height: ${height * 20}px;
  color: ${({ theme }) => theme.color.blackWhite};
`;

export const TokenAmountWrapper = styled.View``;

export const TokenAmount = styled(TokenName)``;
export const TokenBaseCurrency = styled(TokenName)`
  color: ${({ theme }) => theme.color.grey500};
`;
/////////

export const ReceiveSendContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  height: ${height * 88}px;
  padding: ${height * 24}px;
`;
export const Gap = styled.View`
  width: ${width * 8}px;
`;

////
export const EmptyDeviderThick = styled.View`
  height: ${height * 8}px;
  background-color: ${({ theme }) => theme.color.grey100Grey900};
`;

////
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

export const TransactionHistoryList = styled.View``;

export const TransactionHistoryListItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-color: ${({ theme }) => theme.color.grey100Grey900};
  border-bottom-width: ${height * 1}px;
  border-bottom-style: solid;
  padding: ${height * 16}px ${width * 24}px;
`;

export const TransactionStatusWrapper = styled.View``;

export const TransactionStatus = styled.Text`
  ${({ theme }) => theme.font.Label.md};
  font-family: ${({ theme }) => theme.fmRegular};
  line-height: ${fontSize(20)}px;
  text-align: left;
  color: ${({ theme }) => theme.color.blackWhite};
`;
export const TransactionDate = styled(TransactionStatus)`
  color: ${({ theme }) => theme.color.grey500};
`;

export const TransactionHistoryContentWrapper = styled.View`
  flex-direction: row;
  width: ${width * 303}px;
  justify-content: space-between;
  align-items: center;
`;
export const TransactionAmountWrapper = styled.View``;
export const TransactionAmount = styled.Text`
  ${({ theme }) => theme.font.Label.md};
  font-family: ${({ theme }) => theme.fmRegular};
  line-height: ${fontSize(20)}px;
  text-align: right;
  color: ${({ theme }) => theme.color.blackWhite};
`;
export const TransactionBaseCurrency = styled(TransactionAmount)`
  color: ${({ theme }) => theme.color.grey500};
`;
