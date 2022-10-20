import { Animated, StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import { Theme } from '@@style/theme';
import { width } from '@@utils/ui';

export const styles = (myTheme: Theme) =>
  StyleSheet.create({
    container: {
      width: width * 42,
      height: width * 26,
      padding: width * 4,
      borderRadius: width * 14,
      backgroundColor: myTheme.color.grey100Grey900,
      overflow: 'hidden',
    },
    checked: {
      backgroundColor: myTheme.color.yellow,
    },
  });

export const Inner = styled(Animated.View)`
  width: ${width * 18}px;
  height: ${width * 18}px;
  border-radius: ${(width * 18) / 2}px;
  background-color: ${({ theme }) => theme.color.white};
`;
