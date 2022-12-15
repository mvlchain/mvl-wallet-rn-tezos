import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import { width } from '@@utils/ui';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.color.whiteBlack};
`;

export const TopTitleBar = styled.View`
  flex-direction: row;
  align-items: flex-start;
  /* background-color: #aaa; */
`;

export const HeaderText = styled.Text`
  padding: ${width * 24}px ${width * 16}px ${width * 12}px ${width * 24}px;
  ${({ theme }) => theme.font.Title.md};
  line-height: ${width * 24}px;
  color: ${({ theme }) => theme.color.blackWhite};
`;

export const BetaTag = styled.View`
  align-self: center;
  padding: ${width * 4}px ${width * 6}px;
  background-color: ${({ theme }) => theme.color.yellow};
  border-radius: ${width * 4}px;
`;

export const BetaTagText = styled.Text`
  ${({ theme }) => theme.font.BetaTag};
  color: ${({ theme }) => theme.color.black};
  background-color: ${({ theme }) => theme.color.yellow};
`;

export const BodyContainer = styled.View`
  flex: 1;
  /* background-color: #0f0; */
`;

export const EventListLayout = styled.View`
  display: flex;
  position: absolute;
  justify-content: center;
  width: 100%;
  height: 100%;
  /* background-color: rgba(128, 128, 128, 0.6); */
`;

export const InlineStyle = StyleSheet.create({
  flashlist: {
    backgroundColor: 'transparent',
  },
});
