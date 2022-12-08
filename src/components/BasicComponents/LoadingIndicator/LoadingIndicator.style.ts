import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import { height } from '@@utils/ui';

export const IndicatorContainer = styled.View`
  flex: 1;
  justify-content: center;
  background-color: transparent;
  position: absolute;
  width: 100%;
  height: 100%;
  margin-top: ${height * 56}px;
  align-items: center;
  background-color: transparent;
  z-index: 999;
`;

export const styles = StyleSheet.create({
  lottie: {
    transform: [{ scale: 0.7 }],
  },
});
