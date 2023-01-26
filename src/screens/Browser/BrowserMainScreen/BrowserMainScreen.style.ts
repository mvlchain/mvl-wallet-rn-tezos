import styled, { css } from 'styled-components/native';

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

export const SearchContainer = styled.View`
  margin: ${width * 24}px;
  padding: ${width * 14}px ${width * 16}px;
  border-radius: ${width * 8}px;
  border-width: ${width * 1}px;
  border-color: ${({ theme }) => theme.color.grey100};
`;

export const SearchBtn = styled.Pressable``;

export const SearchText = styled.Text`
  ${({ theme }) => theme.font.Label.md};
  color: ${({ theme }) => theme.color.grey300};
`;

export const ContentContainer = styled.View<{ isIOS?: boolean }>`
  flex: 1;
  /* ${({ isIOS }) =>
    isIOS &&
    css`
      align-items: center;
      justify-content: center;
    `}; */
  align-items: center;
  justify-content: center;
  padding: 0 ${width * 24}px;
`;
