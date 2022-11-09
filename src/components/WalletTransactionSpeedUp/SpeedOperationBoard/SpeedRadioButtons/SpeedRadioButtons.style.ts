import styled from 'styled-components/native';

import { height, fontSize } from '@@utils/ui';

export const CustomButtonRadio = styled.Button<{ checked: boolean }>`
  flex: 1;
  border-style: solid;
  border-width: ${height * 1}px;
  border-color: ${({ theme, checked }) => (checked ? theme.color.primary : theme.color.grey300)};
  background-color: ${({ theme, checked }) => (checked ? theme.color.primary : 'transparent')};
  ${({ theme }) => theme.font.Label.md};
`;

export const ButtonWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: ${height * 8}px;
`;

export const Label = styled.Text`
  ${({ theme }) => theme.font.Label.md};
  font-family: ${({ theme }) => theme.fmRegular};
  line-height: ${fontSize(20)};
  color: ${({ theme }) => theme.color.blackWhite};
  margin-bottom: ${height * 8}px;
`;
