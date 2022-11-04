import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import { height } from '@@utils/ui';

export const inlineStyles = StyleSheet.create({
  fullScreen: {
    margin: 0,
  },
  notFullScreen: {
    margin: 0,
  },
});

export const BackdropColor = {
  light: undefined,
  dark: 'rgba(255,255,255,0.25)',
};

export const PinLayoutWrapper = styled.View<{ isFull: boolean }>`
  flex: 1;
  justify-content: flex-end;
  padding-top: ${({ isFull }) => (isFull ? `0px` : `${height * 60}px`)};
`;
