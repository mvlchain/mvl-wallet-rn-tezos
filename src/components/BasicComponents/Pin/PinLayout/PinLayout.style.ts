import { Platform } from 'react-native';
import styled from 'styled-components/native';

import { fontSize, height, width } from '@@utils/ui';

import { IPinLayoutStyleProps, IPinPasswordMonitorStyleProps } from './PinLayout.type';

export const PinLayoutWrapper = styled.SafeAreaView<IPinLayoutStyleProps>`
  flex: 1;
  justify-content: flex-end;
  margin-top: ${({ isFull }) => (isFull ? `0px` : `${height * 14}px`)};
`;

export const BackDrop = styled.Pressable`
  background-color: ${({ theme }) => theme.color.blackWhite};
  opacity: 0.25;
  position: absolute;
  width: 100%;
  height: 100%;
`;

export const PinContainer = styled.View<IPinLayoutStyleProps>`
  flex: 1;
  justify-content: space-between;
  border-top-left-radius: ${({ isFull }) => (isFull ? 0 : `${width * 24}px`)};
  border-top-right-radius: ${({ isFull }) => (isFull ? 0 : `${width * 24}px`)};
  background-color: ${({ theme }) => theme.color.whiteBlack};
`;

export const PinBackButtonHeaderWrapper = styled.Pressable`
  height: ${height * 56}px;
  padding: ${height * 24}px;
  justify-content: center;
`;

export const PinLayoutAssistant = styled.View`
  height: ${height * 24}px;
`;

export const PinPasswordMonitorContainer = styled.View<IPinPasswordMonitorStyleProps>`
  width: 100%;
  align-items: center;
  justify-content: space-between;
  height: ${height * 168}px;
  padding: ${height * 24}px;
  padding-bottom: ${height * 24}px;
  padding-top: ${height * 24}px;
`;

export const TextButtonWrapper = styled.View`
  height: ${fontSize(18)}px;
`;

export const PinNumpadContainer = styled.View`
  align-items: center;
  width: 100%;
  height: ${Platform.OS === 'android' ? `${height * 400}px` : `${height * 434}px`};
`;
