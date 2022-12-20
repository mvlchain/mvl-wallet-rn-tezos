import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import { height } from '@@utils/ui';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.whiteBlack};
`;

export const Text = styled.Text`
  ${({ theme }) => theme.font.Title.lg};
  color: ${({ theme }) => theme.color.blackWhite};
`;

export const styles = StyleSheet.create({
  lottie: {
    height: height * 160,
  },
});
