import styled from 'styled-components/native';

import { height } from '@@utils/ui';

import { IBlursStyleProps } from './Blurs.type';

export const BlursContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
`;

export const BlursCircleWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
`;

export const BlurCircle = styled.View<IBlursStyleProps>`
  width: ${height * 12}px;
  height: ${height * 12}px;
  border-radius: ${height * 6}px;
  margin: ${height * 4}px;
  background-color: ${({ theme, isBlue }) => (isBlue ? theme.color.primary : theme.color.grey200Grey800)};
`;

export const ErrorCircleWrapper = styled(BlursCircleWrapper)`
  position: absolute;
  top: 0;
`;

export const ErrorCircle = styled(BlurCircle)`
  background-color: ${({ theme }) => theme.color.red};
`;
