import { FlatList, StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import { width } from '@@utils/ui';

export const Container = styled.View`
  flex: 1;
  padding: 0 ${width * 24}px;
`;

export const TitleContainer = styled.View`
  padding: ${width * 24}px 0;
`;

export const Title = styled.Text`
  ${({ theme }) => theme.font.Title.xs};
  color: ${({ theme }) => theme.color.blackWhite};
`;

export const TokenFlatList = styled.FlatList`
  flex: 1;
` as unknown as typeof FlatList;

export const InlineStyle = StyleSheet.create({
  flatlist: {
    backgroundColor: 'transparent',
  },
});
