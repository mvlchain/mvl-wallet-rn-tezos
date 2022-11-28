import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import { height, width } from '@@utils/ui';

export const ModalContainer = styled.View``;

export const WebViewDummy = styled.View`
  flex: 1;
`;

export const ConfirmContainer = styled.View`
  padding: ${width * 24}px;
  background-color: ${({ theme }) => theme.color.whiteBlack};
`;

export const ConfirmLabel = styled.Text`
  ${({ theme }) => theme.font.Label.md};
  color: ${({ theme }) => theme.color.blackWhite};
`;

export const inlineStyles = StyleSheet.create({
  marginProvider: { marginBottom: height * 32 },
  boxShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.24,
    shadowRadius: 32,
  },
  safeAreaView: {
    flex: 1,
  },
});
