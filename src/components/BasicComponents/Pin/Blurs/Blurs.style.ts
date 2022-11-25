import styled from 'styled-components/native';

import { height } from '@@utils/ui';

import { IBlursStyleProps } from './Blurs.type';

export const BlursContainer = styled.View`
  justify-content: center;
  flex-direction: row;
  width: 100%;
  padding-top: ${height * 16}px;
  padding-bottom: ${height * 16}px;
`;

export const BlurCircle = styled.View<IBlursStyleProps>`
  width: ${height * 12}px;
  height: ${height * 12}px;
  border-radius: ${height * 6}px;
  margin: ${height * 4}px;
  background-color: ${({ theme, isBlue, showError }) => (showError ? theme.color.red : isBlue ? theme.color.primary : theme.color.grey200Grey800)};
`;
