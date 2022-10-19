import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import { width } from '@@utils/ui';

const size = width * 20;

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CheckBox = styled.View<{ checked: boolean }>`
  align-items: center;
  justify-content: center;
  width: ${size}px;
  height: ${size}px;
  border-radius: ${size * 0.2}px;
  border-width: ${size * 0.075}px;
  border-color: ${({ theme, checked }) => (checked ? theme.color.yellow : theme.color.blackWhite)};
  background-color: ${({ theme, checked }) => (checked ? theme.color.yellow : theme.color.whiteBlack)};
  overflow: hidden;
  margin-right: ${width * 18}px;
`;

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
