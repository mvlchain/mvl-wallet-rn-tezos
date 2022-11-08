import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import { height, width } from '@@utils/ui';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.color.whiteBlack};
`;

export const ImageContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 ${width * 24}px;
`;

export const SuccessText = styled.Text`
  margin-top: ${height * 24}px;
  text-align: center;
  ${({ theme }) => theme.font.Title.lg};
  color: ${({ theme }) => theme.color.blackWhite};
`;

export const inlineStyles = StyleSheet.create({
  margin: { padding: width * 24 },
});
