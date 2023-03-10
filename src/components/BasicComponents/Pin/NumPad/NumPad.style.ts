import styled from 'styled-components/native';

import { fontSize, height } from '@@utils/ui';

export const NumPadCircle = styled.View<{ pressed: boolean }>`
  justify-content: center;
  align-items: center;
  width: ${height * 72}px;
  height: ${height * 72}px;
  border-color: ${({ theme }) => theme.color.grey200Grey800};
  border-radius: ${height * 36}px;
  border-width: ${height * 1}px;
  border-style: solid;
  background-color: ${({ pressed, theme }) => (pressed ? theme.color.grey100Grey900 : 'transparent')};
`;

export const NumText = styled.Text`
  ${({ theme }) => theme.font.Title.lg};
  color: ${({ theme }) => theme.color.blackWhite};
  font-family: ${({ theme }) => theme.fmBold};
  line-height: ${fontSize(40)}px;
  text-align: center;
`;
