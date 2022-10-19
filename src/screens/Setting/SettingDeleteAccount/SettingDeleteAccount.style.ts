import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import { height, width } from '@@utils/ui';

export const DeleteAccountContainer = styled.View`
  flex: 1;
  justify-content: space-between;
  padding: ${width * 24}px;
`;

export const DescriptionText = styled.Text`
  ${({ theme }) => theme.font.Paragraph.md};
  color: ${({ theme }) => theme.color.blackWhite};
  line-height: ${height * 24};
`;

export const AgreeDeleteContainer = styled.View``;

export const inlineStyles = StyleSheet.create({
  marginTop: { marginTop: height * 24 },
});

export const AgreeText = styled.Text`
  flex: 1;
  ${({ theme }) => theme.font.Label.md};
  color: ${({ theme }) => theme.color.blackWhite};
`;
