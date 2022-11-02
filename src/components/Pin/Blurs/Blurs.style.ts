import styled from 'styled-components/native';

import { height } from '@@utils/ui';

import { IBlurStyleProps } from './Blurs.type';

export const BlursContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
`;

export const BlurCircle = styled.View<IBlurStyleProps>`
  width: ${height * 12}px;
  height: ${height * 12}px;
  border-radius: ${height * 6}px;
  margin: ${height * 4}px;
  background-color: ${({ theme, isBlue }) => (isBlue ? theme.color.primary : theme.color.grey200Grey800)};
`;
