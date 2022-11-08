import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import { height, width } from '@@utils/ui';

export const Container = styled.View`
  padding: ${width * 24}px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Section = styled.View`
  margin-top: ${height * 16}px;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 0 ${width * -4}px;
  margin-top: ${height * 16}px;
`;

export const ButtonWrapper = StyleSheet.create({
  Button: { width: '48%' },
});
