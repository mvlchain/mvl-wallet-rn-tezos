import styled from 'styled-components/native';

import { fontSize, height } from '@@utils/ui';

export const Container = styled.View`
  flex: 1;
  justify-content: flex-end;
`;
export const Contents = styled.View`
  flex: 1;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: ${height * 24}px;
`;

export const Title = styled.Text`
  margin-top: ${height * 24}px;
  ${({ theme }) => theme.font.Label.lg}
  color: ${({ theme }) => theme.color.blackWhite};
  font-family: ${({ theme }) => theme.fmHeavey};
  font-weight: 700;
  font-size: ${fontSize(32)}px;
  line-height: ${height * 40}px;
`;
export const Text = styled.Text`
  padding: 8px ${height * 24}px;
  ${({ theme }) => theme.font.Paragraph.lg}
  color: ${({ theme }) => theme.color.blackWhite};
  font-family: ${({ theme }) => theme.fmRegular};
  font-weight: 400;
  font-size: ${fontSize(18)}px;
  line-height: ${fontSize(28)}px;
  width: 100%;
  text-align: center;
`;

export const ButtonWrapper = styled.View`
  padding: ${height * 24}px;
`;
