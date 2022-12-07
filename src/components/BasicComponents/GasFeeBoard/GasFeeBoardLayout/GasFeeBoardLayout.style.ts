import styled from 'styled-components/native';

import { fontSize, height, width } from '@@utils/ui';

export const Container = styled.View`
  flex: 1;
  justify-content: space-between;
`;

export const InnerContainer = styled.View`
  padding: ${height * 24}px;
`;

export const Row = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const MarginRow = styled(Row)`
  margin-top: ${height * 24}px;
`;
export const BoardLabel = styled.Text`
  margin-bottom: ${height * 16}px;
  ${({ theme }) => theme.font.Title.xs};
  font-family: ${({ theme }) => theme.fmExBold};
  line-height: ${fontSize(28)}px;
  color: ${({ theme }) => theme.color.blackWhite};
`;
export const Text = styled.Text`
  ${({ theme }) => theme.font.Label.md};
  font-family: ${({ theme }) => theme.fmRegular};
  line-height: ${fontSize(20)}px;
  color: ${({ theme }) => theme.color.blackWhite};
`;
export const Label = styled(Text)``;
export const Value = styled(Text)``;
export const BaseCurrency = styled(Text)`
  width: 100%;
  text-align: right;
  color: ${({ theme }) => theme.color.grey500};
`;

export const ToggleWrapper = styled.View`
  flex-direction: row;
  margin-bottom: ${height * 16}px;
`;
export const ConfirmWrapper = styled.View`
  padding: ${height * 24}px;
`;

export const Warning = styled.View`
  flex-direction: row;
  margin-top: ${height * 10}px;
`;

export const WarningIconWrapper = styled.View`
  margin-right: ${width * 8}px;
`;

export const WarningText = styled.Text`
  ${({ theme }) => theme.font.Label.sm}
  line-height: ${fontSize(16)}px;
  color: ${({ theme }) => theme.color.red};
`;
