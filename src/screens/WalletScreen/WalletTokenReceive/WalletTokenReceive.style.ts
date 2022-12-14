import styled from 'styled-components/native';

import { height, width } from '@@utils/ui';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.color.whiteBlack};
`;
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

export const TokenAmount = styled(TokenName)`
  text-align: right;
`;
export const TokenBaseCurrency = styled(TokenName)`
  color: ${({ theme }) => theme.color.grey500};
  text-align: right;
`;

export const Section = styled.View`
  padding: ${height * 24}px;
`;
export const QRSection = styled.View`
  align-items: center;
`;

export const QRWrapper = styled.View`
  width: ${width * 240}px;
  height: ${width * 240}px;
`;

export const QRLabel = styled.Text`
  padding: ${height * 24}px;
  color: ${({ theme }) => theme.color.blackWhite};
`;
