import styled from 'styled-components/native';

import { height, width } from '@@utils/ui';

import { IPinLayoutStyleProps } from './PinLayout.type';

export const PinLayoutWrapper = styled.View<IPinLayoutStyleProps>`
  flex: 1;
  /* justify-content: flex-end; */
  padding-top: ${({ isFull }) => (isFull ? `0px` : `${height * 60}px`)};
`;

export const PinContainer = styled.View<IPinLayoutStyleProps>`
  flex: 1;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.color.whiteBlack};
  padding-top: ${height * 44}px;
  border-top-left-radius: ${({ isFull }) => (isFull ? 0 : `${width * 24}px`)};
  border-top-right-radius: ${({ isFull }) => (isFull ? 0 : `${width * 24}px`)};
`;

export const PinBackButtonHeaderWrapper = styled.Pressable`
  height: ${height * 56}px;
  padding: ${height * 24}px;
`;

export const PinLayoutAssistant = styled.View`
  height: ${height * 24}px;
`;

export const PinPasswordMonitorContainer = styled.View`
  width: 100%;
  height: ${height * 168}px;
  padding: ${height * 24}px;
`;

export const PinNumpadContainer = styled.View`
  width: 100%;
  height: ${height * 434}px;
  align-items: center;
`;

export const PinMonitorInnerWrraper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
