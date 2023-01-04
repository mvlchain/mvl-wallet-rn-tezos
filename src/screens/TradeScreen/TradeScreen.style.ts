import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import { width } from '@@utils/ui';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.color.whiteBlack};
`;

export const Header = styled.View`
  padding: ${width * 24}px;
`;

export const HeaderTitle = styled.Text`
  ${({ theme }) => theme.font.Title.md};
  color: ${({ theme }) => theme.color.blackWhite};
`;

export const InputContainer = styled.View`
  margin: ${width * 24}px;
  padding: ${width * 16}px;
  border-radius: ${width * 16}px;
  background-color: ${({ theme }) => theme.color.blackWhite};
`;

export const SwapButtonContainer = styled.View`
  align-items: center;
  margin: ${width * 16}px 0;
`;

export const SwapButton = styled.Pressable``;

export const PriceImpactContainer = styled.View`
  flex-direction: row;
  margin-top: ${width * 24}px;
`;

export const PriceImpactText = styled.Text`
  ${({ theme }) => theme.font.Label.md};
  color: ${({ theme }) => theme.color.whiteBlack};
`;

export const PriceImpactHelp = styled.Text``;

export const InlineStyle = StyleSheet.create({
  button: {
    marginTop: width * 16,
  },
});
