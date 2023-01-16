import { TextInput } from 'react-native';
import styled from 'styled-components/native';

import { width } from '@@utils/ui';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.color.whiteBlack};
`;

export const SearchContainer = styled.View`
  padding: ${width * 24}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const SearchInput = styled.TextInput`
  flex: 1;
  padding: ${width * 14}px ${width * 16}px;
  border-radius: ${width * 8}px;
  border-width: ${width * 1}px;
  border-color: ${({ theme }) => theme.color.highlight};
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
