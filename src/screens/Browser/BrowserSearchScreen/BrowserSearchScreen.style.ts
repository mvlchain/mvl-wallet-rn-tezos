import { StyleSheet, TextInput } from 'react-native';
import styled from 'styled-components/native';

import { width } from '@@utils/ui';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.color.whiteBlack};
`;

export const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${width * 24}px;
`;

export const SearchWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  margin-right: ${width * 12}px;
  border-radius: ${width * 8}px;
  border-width: ${width * 1}px;
  border-color: ${({ theme }) => theme.color.highlight};
`;

export const SearchInput = styled.TextInput`
  flex: 1;
  padding: ${width * 14}px ${width * 16}px;
  ${({ theme }) => theme.font.Label.md};
  color: ${({ theme }) => theme.color.blackWhite};
` as unknown as typeof TextInput;

export const ContentContainer = styled.View`
  padding: 0 ${width * 24}px;
`;

export const History = styled.Text`
  ${({ theme }) => theme.font.Title.xs};
  color: ${({ theme }) => theme.color.blackWhite};
`;

export const EmptyHistoryText = styled.Text`
  ${({ theme }) => theme.font.Label.md};
  color: ${({ theme }) => theme.color.grey500};
`;

export const inlineStyles = StyleSheet.create({
  marginProvider: { marginRight: 8 },
});
