import styled from 'styled-components/native';

import { fontSize, height, width } from '@@utils/ui';

import { IAmountStyleProps } from './TransactionHistoryListItem.type';

export const TransactionHistoryList = styled.View``;

export const TransactionHistoryListItem = styled.View`
  border-bottom-color: ${({ theme }) => theme.color.grey100Grey900};
  border-bottom-width: ${height * 1}px;
  border-bottom-style: solid;
  padding: ${height * 16}px ${width * 24}px;
`;

export const TransactionStatusWrapper = styled.View``;

export const TransactionStatus = styled.Text`
  ${({ theme }) => theme.font.Label.md};
  font-family: ${({ theme }) => theme.fmBold};
  line-height: ${fontSize(20)}px;
  text-align: left;
  color: ${({ theme }) => theme.color.blackWhite};
`;
export const TransactionDate = styled(TransactionStatus)`
  color: ${({ theme }) => theme.color.grey500};
  font-family: ${({ theme }) => theme.fmMedium};
  margin-top: ${height * 4}px;
`;

export const HistoryItemTopContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const TransactionHistoryContentInnerWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const TransactionAmountWrapper = styled.View``;

export const TransactionAmount = styled.Text<IAmountStyleProps>`
  ${({ theme }) => theme.font.Label.md};
  font-family: ${({ theme }) => theme.fmRegular};
  line-height: ${fontSize(20)}px;
  text-align: right;
  color: ${({ theme }) => theme.color.blackWhite};
  text-decoration: ${({ isCanceled }) => (isCanceled ? 'line-through' : 'none')};
`;
export const TransactionBaseCurrency = styled(TransactionAmount)`
  color: ${({ theme }) => theme.color.grey500};
`;

export const IconWrapper = styled.View`
  margin-left: ${height * 17}px;
`;
export const HistoryItemBottomContent = styled.View`
  flex-direction: row;
  width: 100%;
  padding-top: ${height * 16}px;
`;

export const ButtonGap = styled.View`
  width: ${width * 16}px;
`;
