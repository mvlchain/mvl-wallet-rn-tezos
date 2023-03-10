import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import { height, width } from '@@utils/ui';

const paddingSize = height * 24;

export const DeleteAccountContainer = styled.View`
  flex: 1;
  justify-content: space-between;
  padding: ${width * 24}px;
  background-color: ${({ theme }) => theme.color.whiteBlack};
`;

export const DescriptionText = styled.Text`
  ${({ theme }) => theme.font.Paragraph.md};
  color: ${({ theme }) => theme.color.blackWhite};
  line-height: ${paddingSize}px;
`;

export const AgreeDeleteContainer = styled.View``;

export const inlineStyles = StyleSheet.create({
  marginTop: { marginTop: paddingSize },
});

export const AgreeText = styled.Text`
  flex: 1;
  ${({ theme }) => theme.font.Label.md};
  color: ${({ theme }) => theme.color.blackWhite};
`;
