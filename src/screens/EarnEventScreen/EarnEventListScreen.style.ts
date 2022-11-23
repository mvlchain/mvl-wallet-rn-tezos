import { FlashList } from '@shopify/flash-list';
import styled from 'styled-components/native';

import { width } from '@@utils/ui';

import { IEarnEventContentProps } from './EarnEventContent';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.color.whiteBlack};
`;

export const TopTitleBar = styled.View`
  flex-direction: row;
  align-items: flex-start;
  background-color: #aaa;
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
  padding: 0px ${width * 24}px;
  background-color: #0f0;
`;

export const EventList = styled(FlashList<IEarnEventContentProps>)``;
