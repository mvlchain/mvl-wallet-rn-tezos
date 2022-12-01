import styled from 'styled-components/native';

import { fontSize, height, width } from '@@utils/ui';

export const TopContainer = styled.View`
  padding-bottom: ${height * 24}px;
  gap: ${height * 4}px;
`;

export const BlackText = styled.Text`
  ${({ theme }) => theme.font.Label.md}
  color: ${({ theme }) => theme.color.blackWhite};
  line-height: ${fontSize(20)}px;
`;

export const GreyText = styled(BlackText)`
  color: ${({ theme }) => theme.color.grey500};
`;

export const LargeBlackText = styled.Text`
  ${({ theme }) => theme.font.Label.lg}
  color: ${({ theme }) => theme.color.blackWhite};
  line-height: ${fontSize(24)}px;
`;

export const Row = styled.View`
  margin-top: ${height * 16}px;
  flex-direction: row;
  justify-content: space-between;
`;

export const MiddleContainer = styled.View`
  gap: ${height * 16}px;
`;

export const RightAlign = styled.View`
  align-items: flex-end;
`;
